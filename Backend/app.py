from flask import Flask
from flask_cors import CORS

from routes.score import score_bp
from routes.conversation import conversation_bp

app = Flask(__name__)

CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                "https://salesbot-front.onrender.com"
            ]
        }
    }
)

app.register_blueprint(conversation_bp, url_prefix="/api")
app.register_blueprint(score_bp, url_prefix="/api")

@app.route("/")
def home():
    return {"status": "Backend is running"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)