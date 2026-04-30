"""WSGI entry point for production deployment."""

from app import app, load_model

# Load model at startup
load_model()

if __name__ == '__main__':
    app.run()
