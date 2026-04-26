# 🛡️ AI-Powered Phishing Detection Browser Extension

A production-style browser extension that detects phishing websites in real-time using Machine Learning and provides explainable security insights to users.

---

## 📌 Overview

Phishing attacks are one of the most common cybersecurity threats. This project solves that problem by building an **AI-based browser extension** that analyzes URLs instantly and warns users before they interact with malicious websites.

Unlike basic blacklist systems, this solution uses **Machine Learning** to detect previously unseen phishing patterns.

---

## ✨ Key Features

- ⚡ **Real-time Detection** – Automatically scans every visited website
- 🧠 **Machine Learning Model** – Trained on phishing datasets
- 📊 **Trust Score** – Displays confidence percentage for predictions
- 💡 **Explainable AI** – Shows *why* a website is flagged
- 🎨 **Modern UI/UX** – Animated, non-intrusive warning banner
- 🔒 **Privacy-Friendly** – Only URL is analyzed (no personal data)

---

## 🧠 How It Works

1. User visits any website  
2. Extension captures the current URL  
3. URL is sent to a Flask backend API  
4. ML model extracts features and predicts:
   - Phishing (1) or Safe (0)
   - Confidence Score  
5. If risky → a warning banner is displayed with explanation  

---

## 🏗️ Architecture
Browser Extension (Frontend)
↓
Content Script (JS)
↓
Background Script (API Handler)
↓
Flask Backend (Python)
↓
Machine Learning Model (Random Forest)

---

## 🧰 Tech Stack

### 🔹 Frontend (Extension)
- JavaScript (ES6)
- Chrome/Edge Extension APIs

### 🔹 Backend
- Python
- Flask
- Flask-CORS

### 🔹 Machine Learning
- Scikit-learn
- Random Forest Classifier
- Pandas, NumPy

---

## 📊 Model Details

- Dataset: Phishing URL dataset (Kaggle)
- Feature Engineering:
  - URL length
  - Number of special characters
  - Presence of IP address
  - Subdomains, symbols, patterns
- Model: **Random Forest Classifier**
- Accuracy Achieved: **~86%**

---

## 📁 Project Structure
phishing-detector/
│
├── app.py # Flask API (prediction endpoint)
├── train_model.py # Model training pipeline
├── model.pkl # Trained ML model
├── requirements.txt # Dependencies
│
└── extension/
├── content.js # UI + detection trigger
├── background.js # API communication layer
├── manifest.json # Extension config

---


---

## ⚙️ Setup Instructions
🔹 1. Clone Repository
git clone https://github.com/your-username/phishing-detector.git
cd phishing-detector
🔹 2. Backend Setup
pip install -r requirements.txt
python app.py
🔹 3. Load Extension
A=>Open Edge/Chrome
B=>Go to edge://extensions/
C=>Enable Developer Mode
D=>Click Load unpacked
E=>Select extension/ folder
🌐 Deployment
~Backend deployed on cloud (Render)
~Extension communicates via REST API
~Designed for scalability and real-time usage
🧪 Example Output
  ⚠️ paypal-secure-login.com is risky  
  Trust Score: 86%  
  Reason: too many hyphens, long URL
🚀 Future Enhancements
  🔍 Deep Learning (LSTM for URL sequences)
  🌐 Website content-based analysis
  📊 User dashboard & history tracking
  ⚡ Faster inference with optimized model
  🔗 Integration with threat intelligence APIs
  💼 Resume Value

This project demonstrates:

>Full-stack development (Frontend + Backend)
>Machine Learning model building & deployment
>Real-world problem solving (Cybersecurity)
>API integration & browser extension development
>Clean UI/UX design principles
👨‍💻 **Author**

  VEDANT OJHA
⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
