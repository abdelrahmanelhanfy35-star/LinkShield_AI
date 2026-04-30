from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os
import re

from model.feature_extractor import extract_features, get_reasons

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load model on startup
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models', 'rf_model.pkl')
model = None
feature_columns = None

def load_model():
    global model, feature_columns
    if os.path.exists(MODEL_PATH):
        with open(MODEL_PATH, 'rb') as f:
            data = pickle.load(f)
            model = data['model']
            feature_columns = data['feature_columns']
        print("Model loaded successfully")
        print(f"Feature columns: {feature_columns}")
    else:
        print("Warning: Model file not found. Using rule-based fallback.")
        feature_columns = list(extract_features("http://example.com").keys())

def rule_based_predict(url: str, features: dict):
    """Fallback rule-based prediction when model is not available."""
    score = 0
    max_score = 100
    
    # URL length
    if features['url_length'] > 75:
        score += 15
    elif features['url_length'] > 50:
        score += 8
    
    # IP address
    if features['has_ip_address']:
        score += 25
    
    # No HTTPS
    if not features['has_https']:
        score += 10
    
    # @ symbol
    if features['has_at_symbol']:
        score += 20
    
    # Suspicious words
    if features['has_suspicious_words']:
        score += 15
    
    # Shortening service
    if features['has_shortening_service']:
        score += 10
    
    # Too many dots
    if features['num_dots'] > 3:
        score += 5
    
    # Too many hyphens
    if features['num_hyphens'] > 3:
        score += 5
    
    # Subdomain
    if features['has_subdomain']:
        score += 5
    
    # Domain length
    if features['domain_length'] > 30:
        score += 5
    
    # Normalize
    risk_score = min(score, max_score)
    
    if risk_score < 25:
        prediction = 'Safe'
        confidence = 90 + (25 - risk_score)
    elif risk_score < 60:
        prediction = 'Suspicious'
        confidence = 60 + (risk_score - 25)
    else:
        prediction = 'Dangerous'
        confidence = 70 + (risk_score - 60)
    
    confidence = min(confidence, 99)
    
    return prediction, confidence, risk_score

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    url = data.get('url', '').strip()
    
    if not url:
        return jsonify({"error": "URL is required"}), 400
    
    # Validate URL format
    if not re.match(r'^https?://', url, re.IGNORECASE):
        url = 'http://' + url
    
    try:
        # Extract features
        features = extract_features(url)
        
        if model and feature_columns:
            # Use ML model - pass as DataFrame to avoid feature name warning
            feature_values = [features[col] for col in feature_columns]
            import pandas as pd
            feature_df = pd.DataFrame([feature_values], columns=feature_columns)
            prediction_idx = model.predict(feature_df)[0]
            probabilities = model.predict_proba(feature_df)[0]
            confidence = int(probabilities[prediction_idx] * 100)
            
            # Risk score: weighted probability sum
            risk_weights = [0, 50, 100]
            risk_score = int(sum(p * w for p, w in zip(probabilities, risk_weights)))
            
            labels = ['Safe', 'Suspicious', 'Dangerous']
            prediction = labels[prediction_idx]
        else:
            # Fallback to rule-based
            prediction, confidence, risk_score = rule_based_predict(url, features)
        
        # Generate reasons
        reasons = get_reasons(features, prediction)
        
        return jsonify({
            "prediction": prediction,
            "confidence": confidence,
            "risk_score": risk_score,
            "reasons": reasons,
            "features": features
        })
        
    except Exception as e:
        return jsonify({"error": f"Analysis failed: {str(e)}"}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None,
        "version": "1.0.0"
    })

@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    subject = data.get('subject', '').strip()
    message = data.get('message', '').strip()
    
    if not all([name, email, subject, message]):
        return jsonify({"error": "All fields are required"}), 400
    
    # In a real app, you'd send an email or save to database
    print(f"Contact form submission from {name} ({email}): [{subject}] {message}")
    
    return jsonify({"success": True, "message": "Message received successfully"})

if __name__ == '__main__':
    load_model()
    app.run(host='0.0.0.0', port=5000, debug=True)
