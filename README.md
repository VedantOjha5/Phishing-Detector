🛡️ AI-Powered Phishing Detection Browser Extension
A production-ready browser extension that detects phishing websites in real time using Machine Learning and provides explainable security insights to users.

📌 Overview
Phishing attacks are among the most common cybersecurity threats. This project addresses the problem by building an AI-powered browser extension that analyzes URLs instantly and warns users before they interact with malicious websites.

Unlike basic blacklist systems, this solution leverages Machine Learning to detect previously unseen phishing patterns.

✨ Key Features
⚡ Real-time Detection – Automatically scans every visited website

🧠 Machine Learning Model – Trained on phishing datasets

📊 Trust Score – Displays confidence percentage for predictions

💡 Explainable AI – Shows why a website is flagged

🎨 Modern UI/UX – Animated, non-intrusive warning banner

🔒 Privacy-Friendly – Only the URL is analyzed (no personal data collected)

🧠 How It Works
User visits any website

Extension captures the current URL

URL is sent to a Flask backend API

ML model extracts features and predicts:

Phishing (1) or Safe (0)

Confidence Score

If risky → a warning banner is displayed with explanation

🏗️ Architecture
Code
Browser Extension (Frontend)
        ↓
Content Script (JavaScript)
        ↓
Background Script (API Handler)
        ↓
Flask Backend (Python)
        ↓
Machine Learning Model (Random Forest)
🧰 Tech Stack
Frontend (Extension)

JavaScript (ES6)

Chrome/Edge Extension APIs

Backend

Python

Flask

Flask-CORS

Machine Learning

Scikit-learn

Random Forest Classifier

Pandas, NumPy

📊 Model Details
Dataset: Phishing URL dataset (Kaggle)

Feature Engineering:

URL length

Number of special characters

Presence of IP address

Subdomains, symbols, patterns

Model: Random Forest Classifier

Accuracy Achieved: ~86%

📁 Project Structure
Code
phishing-detector/
│── app.py              # Flask API (prediction endpoint)
│── train_model.py      # Model training pipeline
│── model.pkl           # Trained ML model
│── requirements.txt    # Dependencies
│
└── extension/
    ├── content.js      # UI + detection trigger
    ├── background.js   # API communication layer
    └── manifest.json   # Extension config
⚙️ Setup Instructions
1. Clone Repository

bash
git clone https://github.com/your-username/phishing-detector.git
cd phishing-detector
2. Backend Setup

bash
pip install -r requirements.txt
python app.py
3. Load Extension

Open Edge/Chrome

Go to edge://extensions/ or chrome://extensions/

Enable Developer Mode

Click Load unpacked

Select the extension/ folder

🌐 Deployment
Backend deployed on Render

Extension communicates via REST API

Designed for scalability and real-time usage

🧪 Example Output
Code
⚠️ paypal-secure-login.com is risky
Trust Score: 86%
Reason: Too many hyphens, long URL
🚀 Future Enhancements
🔍 Deep Learning (LSTM for URL sequences)

🌐 Website content-based analysis

📊 User dashboard & history tracking

⚡ Faster inference with optimized model

🔗 Integration with threat intelligence APIs

💼 Resume Value
This project demonstrates:

Full-stack development (Frontend + Backend)

Machine Learning model building & deployment

Real-world problem solving (Cybersecurity)

API integration & browser extension development

Clean UI/UX design principles

👨‍💻 Author
Vedant Ojha

⭐ Support
If you found this project useful, consider giving it a ⭐ on GitHub!
