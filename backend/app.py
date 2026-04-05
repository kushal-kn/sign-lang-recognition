from flask import Flask, request, jsonify
from flask_cors import CORS
from collections import deque
import base64
import numpy as np
import cv2
import os
import time

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "src", "best.pt")

# ── Lazy load — model loads on first request, not at startup ──
_model = None

def get_model():
    global _model
    if _model is None:
        from ultralytics import YOLO
        _model = YOLO(MODEL_PATH)
    return _model

sign_buffer = deque(maxlen=5)
last_sign = None
last_sign_time = 0
MIN_SIGN_HOLD_SECONDS = 1.0

LABEL_MAP = {}

def decode_base64_image(b64_string):
    try:
        img_bytes = base64.b64decode(b64_string)
        np_arr = np.frombuffer(img_bytes, np.uint8)
        return cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    except Exception as e:
        print(f"[ERROR] Image decode failed: {e}")
        return None

def run_inference(img):
    model = get_model()
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

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

@app.route("/predict", methods=["POST"])
def predict():
    global last_sign, last_sign_time

    data = request.get_json()
    if not data or "image" not in data:
        return jsonify({"status": "error", "message": "Missing 'image' field"}), 400

    img = decode_base64_image(data["image"])
    if img is None:
        return jsonify({"status": "error", "message": "Could not decode image"}), 400

    label, confidence = run_inference(img)

    confirmed = False
    if label:
        sign_buffer.append(label)
        dominant = max(set(sign_buffer), key=sign_buffer.count)
        dominant_count = sign_buffer.count(dominant)
        if dominant_count >= 3:
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
    data = request.get_json()
    signs = data.get("signs", [])
    return jsonify({"status": "success", "translation": " ".join(signs)})

@app.route("/vocabulary", methods=["GET"])
def vocabulary():
    model = get_model()
    return jsonify({"status": "success", "vocabulary": list(model.names.values())})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)