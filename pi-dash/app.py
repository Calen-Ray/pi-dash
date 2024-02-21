
from flask import Flask, redirect, url_for, request, render_template, send_from_directory
import random


app = Flask(__name__, static_url_path='/static')


@app.route('/')
def render_homepage():
    return render_template('index.html')

@app.route('/test_info')
def return_data():
    return str(random.randint(250, 8900))

@app.route('/speed')
def return_speed():
    return str(random.randint(0, 99))

@app.route('/oil_temp')
def return_oil_temp():
    return str(random.randint(32, 280))

@app.route('/coolant_temp')
def return_coolant_temp():
    return str(random.randint(32, 280))


if __name__ == '__main__':

    app.run()