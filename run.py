#!/usr/bin/env python3
"""Development entry point for LinkShield AI backend."""

from app import app, load_model

if __name__ == '__main__':
    load_model()
    print("Starting LinkShield AI backend server...")
    print("API available at: http://localhost:5000")
    print("Health check: GET http://localhost:5000/health")
    print("Predict: POST http://localhost:5000/predict")
    app.run(host='0.0.0.0', port=5000, debug=True)
