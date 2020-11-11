from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return 'Servicio desplegado!'

@app.route('/transactions')
def transactions():
    transactions = """{
        "transactions": [
            {
                "id":"01",
                "receiver": "user1",
                "sender": "user3",
                "amount": 78
            },
            {
                "id":"02",
                "receiver": "user1",
                "sender": "user2",
                "amount": 1000
            }
        ]
    }"""
    return transactions

@app.errorhandler(404)
def error_route(e):
    return app.config['PRIVATEDATA']

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080)