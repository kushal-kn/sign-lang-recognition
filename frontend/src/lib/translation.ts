const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface PredictResult {
  sign: string | null;       // e.g. "A", "Hello", null if nothing detected
  confidence: number;        // 0.0 – 1.0
  confirmed: boolean;        // true when sign is held stable across frames
}

export async function translateSignLanguage(
  base64Image: string
): Promise<string> {
  try {
    const response = await fetch(`${API_BASE}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64Image }),
    });

    if (!response.ok) {
      console.error("[translation] Backend error:", response.status);
      return "Error in translation";
    }

    const data: { status: string } & PredictResult = await response.json();

    if (data.status !== "success" || !data.sign) {
      return "Waiting for input...";
    }

    // Only surface a sign to the UI when it's confirmed stable
    if (!data.confirmed) {
      return "Waiting for input...";
    }

    return data.sign;
  } catch (err) {
    console.error("[translation] Fetch failed:", err);
    return "Error in translation";
  }
}

/**
 * Send a list of confirmed signs to get a joined translation/sentence.
 * Useful if you want to build a sentence from accumulated signs.
 */
export async function buildSentenceFromSigns(signs: string[]): Promise<string> {
  try {
    const response = await fetch(`${API_BASE}/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ signs }),
    });

    const data = await response.json();
    return data.translation ?? signs.join(" ");
  } catch {
    return signs.join(" ");
  }
}

/**
 * Fetch all signs the model can recognize (for the /learn page).
 */
export async function fetchVocabulary(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE}/vocabulary`);
    const data = await response.json();
    return data.vocabulary ?? [];
  } catch {
    return [];
  }
}