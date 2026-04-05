from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
from collections import deque
import base64
import numpy as np
import cv2
import os
import time

app = Flask(__name__)
CORS(app)

# ─── Model Loading ────────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "src", "best.pt")
model = YOLO(MODEL_PATH)

# ─── In-memory sign buffer (per session smoothing) ────────────────────────────
# Stores the last N detected signs to smooth out noisy detections
sign_buffer = deque(maxlen=5)
last_sign = None
last_sign_time = 0
MIN_SIGN_HOLD_SECONDS = 1.0  # Sign must be stable for 1s to be "confirmed"

# ─── ASL label → readable word (customize to match your model's class names) ──
LABEL_MAP = {
    # Add overrides here if your model uses shorthand labels
    # e.g. "A": "A", "thumbs_up": "Good", etc.
}

def decode_base64_image(b64_string: str) -> np.ndarray | None:
    """Decode a base64 JPEG/PNG string to an OpenCV image."""
    try:
        img_bytes = base64.b64decode(b64_string)
        np_arr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        return img
    except Exception as e:
        print(f"[ERROR] Image decode failed: {e}")
        return None

def run_inference(img: np.ndarray) -> tuple[str | None, float]:
    """
    Run YOLO inference on an OpenCV image.
    Returns (label, confidence) of the highest-confidence detection.
    """
    results = model(img, verbose=False)
    best_label = None
    best_conf = 0.0

    for result in results:
        if result.boxes is None:
            continue
        for box in result.boxes:
            conf = float(box.conf[0])
            cls_id = int(box.cls[0])
            label = model.names[cls_id]
            if conf > best_conf:
                best_conf = conf
                best_label = LABEL_MAP.get(label, label)

    return best_label, best_conf


# ─── Routes ───────────────────────────────────────────────────────────────────

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model": MODEL_PATH})


@app.route("/predict", methods=["POST"])
def predict():
    """
    Accepts a base64-encoded image frame from the frontend.
    Returns the detected ASL sign with confidence.

    Request body (JSON):
        { "image": "<base64 string>" }

    Response:
        {
            "status": "success",
            "sign": "A",           # detected label or null
            "confidence": 0.91,    # YOLO confidence
            "confirmed": true      # true if sign held stable for MIN_SIGN_HOLD_SECONDS
        }
    """
    global last_sign, last_sign_time

    data = request.get_json()
    if not data or "image" not in data:
        return jsonify({"status": "error", "message": "Missing 'image' field"}), 400

    img = decode_base64_image(data["image"])
    if img is None:
        return jsonify({"status": "error", "message": "Could not decode image"}), 400

    label, confidence = run_inference(img)

    # ── Smoothing: only confirm a sign if it's stable across frames ──
    confirmed = False
    if label:
        sign_buffer.append(label)
        # Check if the buffer is dominated by one sign (majority vote)
        dominant = max(set(sign_buffer), key=sign_buffer.count)
        dominant_count = sign_buffer.count(dominant)

        if dominant_count >= 3:  # 3 out of last 5 frames agree
            now = time.time()
            if dominant == last_sign:
                if now - last_sign_time >= MIN_SIGN_HOLD_SECONDS:
                    confirmed = True
            else:
                last_sign = dominant
                last_sign_time = now
    else:
        sign_buffer.clear()
        last_sign = None

    return jsonify({
        "status": "success",
        "sign": label,
        "confidence": round(confidence, 3),
        "confirmed": confirmed,
    })


@app.route("/translate", methods=["POST"])
def translate():
    """
    Accepts a list of confirmed signs and builds a readable sentence.

    Request body (JSON):
        { "signs": ["H", "E", "L", "L", "O"] }

    Response:
        { "status": "success", "translation": "HELLO" }
    """
    data = request.get_json()
    signs = data.get("signs", [])
    if not signs:
        return jsonify({"status": "error", "message": "No signs provided"}), 400

    # Basic join — extend this with an NLP model if needed
    translation = " ".join(signs)
    return jsonify({"status": "success", "translation": translation})


@app.route("/vocabulary", methods=["GET"])
def vocabulary():
    """Returns all signs the model can recognize."""
    signs = list(model.names.values())
    return jsonify({"status": "success", "vocabulary": signs})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)