import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# ==============================
# STEP 1: LOAD DATA
# ==============================
df1 = pd.read_parquet("Training.parquet")
df2 = pd.read_parquet("Testing.parquet")

# Combine datasets
df = pd.concat([df1, df2], ignore_index=True)

# ==============================
# STEP 2: SELECT FEATURES
# ==============================
df = df[[
    "length_url",
    "nb_dots",
    "nb_hyphens",
    "nb_at",
    "nb_www",
    "nb_com",
    "nb_slash",
    "ratio_digits_url",
    "prefix_suffix",
    "shortening_service",
    "https_token",
    "status"
]]

# Remove missing values
df = df.dropna()

# ==============================
# STEP 3: SPLIT FEATURES & LABEL
# ==============================
X = df.drop("status", axis=1)
y = df["status"]

# ==============================
# STEP 4: TRAIN-TEST SPLIT
# ==============================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ==============================
# STEP 5: TRAIN MODEL
# ==============================
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    random_state=42
)

model.fit(X_train, y_train)

# ==============================
# STEP 6: EVALUATE
# ==============================
accuracy = model.score(X_test, y_test)
print("Model Accuracy:", accuracy)

# ==============================
# STEP 7: SAVE MODEL
# ==============================
joblib.dump(model, "model.pkl")


# ==============================
# STEP 8: FEATURE FUNCTION
# ==============================
def extract_features(url):
    digit_count = sum(c.isdigit() for c in url)

    # Check for prefix-suffix (- in domain)
    prefix_suffix = 1 if '-' in url else 0

    # Detect URL shorteners
    shorteners = ["bit.ly", "tinyurl", "goo.gl", "t.co"]
    shortening_service = 1 if any(s in url for s in shorteners) else 0

    return [
        len(url),                      # length_url
        url.count('.'),                # nb_dots
        url.count('-'),                # nb_hyphens
        url.count('@'),                # nb_at
        url.count('www'),              # nb_www
        url.count('com'),              # nb_com
        url.count('/'),                # nb_slash
        digit_count / len(url) if len(url) > 0 else 0,  # ratio_digits_url
        prefix_suffix,                 # prefix_suffix
        shortening_service,            # shortening_service
        1 if url.startswith("https") else 0             # https_token
    ]