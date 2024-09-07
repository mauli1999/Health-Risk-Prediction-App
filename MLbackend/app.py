from flask import Flask, request, jsonify
import pickle
import numpy as np
import joblib



app = Flask(__name__)

# Load the model

model = joblib.load('model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print(f"Received data: {data}")
    
    if not all(key in data for key in ['pregnancies', 'glucose', 'bloodPressure', 'skinThickness', 'insulin', 'bmi', 'diabetesPedigreeFunction', 'age']):
        return jsonify({'error': 'Invalid input format, expected JSON dictionary'}), 400
    
    input_data = [data['pregnancies'], data['glucose'], data['bloodPressure'], data['skinThickness'], data['insulin'], data['bmi'], data['diabetesPedigreeFunction'], data['age']]
    input_array = np.array(input_data).reshape(1, -1)
    
    # Make prediction
    prediction = model.predict(input_array)
    prediction_result = int(prediction[0])
    return jsonify({'prediction': prediction_result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)


