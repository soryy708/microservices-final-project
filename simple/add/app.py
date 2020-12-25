import json
import pytest
from flask import Flask, request

def getConfig():
    file= open('../../config.json', 'r')
    data = file.read()
    return json.loads(data)

app = Flask(__name__)

@app.route('/')
def add():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    return str(a + b)

@pytest.fixture
def testClient():
    with app.test_client() as client:
        yield client

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=getConfig()['microservices']['add']['port'])
