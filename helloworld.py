from flask import Flask
app = Flask(__name__)

# using Flask microframework for Python
@app.route('/')
def hello_world():
    return 'Hello world!'

@app.route('/hello/<name>')
def say_hi(name):
    # in here, we would lookup the user's profile from the DB
    return 'Hello %s!' % escape(username)