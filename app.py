from flask import Flask, jsonify, render_template

app = Flask(__name__)

# Example list of jokes with setup and punchline
jokes = [
    {"setup": "Why don't skeletons fight each other?", "punchline": "They don't have the guts."},
    {"setup": "What do you call fake spaghetti?", "punchline": "An impasta!"},
    {"setup": "How do you organize a space party?", "punchline": "You planet."},
    {"setup": "Why don’t some couples go to the gym?", "punchline": "Because some relationships don’t work out."},
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/jokes')
def get_jokes():
    return jsonify(jokes)

if __name__ == '__main__':
    app.run(debug=True)
