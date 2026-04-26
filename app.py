from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from train_model import extract_features

app = Flask(__name__)
CORS(app)

model = joblib.load("model.pkl")


# ==============================
# EXPLAIN FUNCTION
# ==============================
def explain_url(url):
    reasons = []

    if url.count('-') > 2:
        reasons.append("too many hyphens")

    if url.count('@') > 0:
        reasons.append("contains @ symbol")

    if "bit.ly" in url or "tinyurl" in url:
        reasons.append("uses URL shortener")

    if sum(c.isdigit() for c in url) > 5:
        reasons.append("too many numbers")

    if len(url) > 75:
        reasons.append("very long URL")

    return ", ".join(reasons) if reasons else "no strong indicators"


# ==============================
# PREDICT API
# ==============================
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    url = data.get("url")

    features = [extract_features(url)]
    probs = model.predict_proba(features)[0]

    prediction = int(probs.argmax())   # get index of highest probability
    confidence = float(probs.max())    # highest probability

    reason = explain_url(url)   # ✅ ADDED

    return jsonify({
        "prediction": int(prediction),
        "confidence": float(confidence),
        "reason": reason   # ✅ ADDED
    })


# ==============================
# RUN SERVER
# ==============================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)