from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

#Load model
model = joblib.load('model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    prediction = model.predict([np.array(data['fetures'])])
    return jsonify({'prediction': int(prediction[0])})

if __name__ == '__main__':
    app.run(port=5001, debug=True) 
