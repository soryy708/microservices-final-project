import json
from os import path
import urllib.request
import urllib.parse

def getUrl(serviceName):
    def getConfig():
        file= open(path.join(path.dirname(__file__), '..', 'config.json'), 'r')
        data = file.read()
        return json.loads(data)
    serviceConfig = getConfig()['microservices'][serviceName]
    protocol = serviceConfig['protocol']
    host = serviceConfig['host']
    port = serviceConfig['port']
    return f'{protocol}://{host}:{port}'

def apiCall(serviceName, a, b):
    url = f'{getUrl(serviceName)}/?a={a}&b={b}'
    f = urllib.request.urlopen(url)
    return f.read().decode('utf-8')

def addApi(a, b):
    return apiCall('add', a, b)

def subApi(a, b):
    return apiCall('sub', a, b)

def mulApi(a, b):
    return apiCall('mul', a, b)

def divApi(a, b):
    return apiCall('div', a, b)

def powApi(a, b):
    return apiCall('pow', a, b)

def modApi(a, b):
    return apiCall('mod', a, b)

operator = None
a = None
b = None
while operator == None:
    operator = input('What operation would you like to do? (+,-,*,/,^,%)\n')
    if operator not in ['+', '-', '*', '/', '^', '%']:
        print('Invalid input, try again')
        operator = None

while a == None:
    try:
        a = int(input('Please input an integer (left of operator)\n'))
    except ValueError:
        print('Invalid input, try again')
        a = None

while b == None:
    try:
        b = int(input('Please input an integer (right of operator)\n'))
    except ValueError:
        print('Invalid input, try again')
        b = None

result = None
if operator == '+':
    result = addApi(a, b)
elif operator == '-':
    result = subApi(a, b)
elif operator == '*':
    result = mulApi(a, b)
elif operator == '/':
    result = divApi(a, b)
elif operator == '^':
    result = powApi(a, b)
elif operator == '%':
    result = modApi(a, b)

print(f'{a} {operator} {b} = {result}')
