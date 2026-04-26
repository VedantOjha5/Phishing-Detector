import joblib
from train_model import extract_features

model = joblib.load("model.pkl")

url = input("Enter URL: ")

features = [extract_features(url)]
prediction = model.predict(features)

if prediction[0] == 1:
    print("⚠️ Phishing Website!")
else:
    print("✅ Safe Website")