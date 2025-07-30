from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/")
def home():
    return "AI Health Assistant Backend is running!"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message")
    print(f"Received message from user: {user_input}")  # Debug print

    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful AI Health Assistant."},
                {"role": "user", "content": user_input}
            ]
        )
        reply = response['choices'][0]['message']['content']
        print(f"OpenAI API returned reply: {reply}")  # Debug print
        return jsonify({"reply": reply})

    except Exception as e:
        print(f"Error calling OpenAI API: {e}")  # Debug print
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
