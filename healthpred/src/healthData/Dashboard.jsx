import { useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [formdata, setFormdata] = useState({
        pregnancies : "",
        glucose : "",
        bloodPressure : "",
        skinThickness : "",
        insulin : "",
        bmi : "",
        diabetesPedigreeFunction : "",
        age :"",
    });

    const handleChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }

    const [prediction, setPrediction] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const { pregnancies, glucose, bloodPressure, skinThickness, insulin, bmi, diabetesPedigreeFunction, age } = formdata;
            if (!(pregnancies && glucose && bloodPressure && skinThickness && insulin && bmi && diabetesPedigreeFunction && age)) {
                alert("All input is required");
            }

            console.log(`Bearer ${localStorage.getItem('token')}`);
            const addResponse = await axios.post("http://localhost:3000/health/add", formdata, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            

            if (addResponse.status === 200) {
                alert("Health data added successfully");
            }

            const predictResponse = await axios.get("http://localhost:3000/health/predict", {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            console.log(predictResponse);

            const prediction = predictResponse.data;
            const result = prediction.split("Prediction successful: ")[1];
            console.log(prediction);
            setPrediction(result);


        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        try {
            localStorage.removeItem('token');
            window.location.href = "/";
        }
        catch (error) {
            console.log(error);
        }
    }


return (
    <>
    <div className="header-container flex justify-between items-center p-3 bg-blue-600">
    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
    <button onClick={handleLogout} className="logout-button text-white bg-blue-700 p-2 rounded">Logout</button>
    </div>
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold text-blue-600 mb-2">Health Data</h2>
        <input
            type="number"
            name="pregnancies"
            placeholder="Pregnancies"
            className="border-2 border-blue-600 p-2 rounded mb-2"
            onChange={handleChange}
            value={formdata.pregnancies}
        />
        <input
            type="number"
            name="glucose"
            placeholder="Glucose"
            className="border-2 border-blue-600 p-2 rounded mb-2"
            onChange={handleChange}
            value={formdata.glucose}
        />
        <input
            type="number"
            name="bloodPressure"
            placeholder="Blood Pressure"
            className="border-2 border-blue-600 p-2 rounded mb-2"
            onChange={handleChange}
            value={formdata.bloodPressure}
        />
        <input
            type="number"
            name="skinThickness"
            placeholder="Skin Thickness"
            className="border-2 border-blue-600 p-2 rounded mb-2"
            onChange={handleChange}
            value={formdata.skinThickness}
        />
        <input
            type="number"
            name="insulin"
            placeholder="Insulin"
            className="border-2 border-blue-600 p-2 rounded mb-2"
            onChange={handleChange}
            value={formdata.insulin}
        />
        <input
            type="number"
            name="bmi"
            placeholder="BMI"
            className="border-2 border-blue-600 p-2 rounded mb-2"
            onChange={handleChange}
            value={formdata.bmi}
        />
        <input
            type="number"
            name="diabetesPedigreeFunction"
            placeholder="Diabetes Pedigree Function"
            className="border-2 border-blue-600 p-2 rounded mb-2"
            onChange={handleChange}
            value={formdata.diabetesPedigreeFunction}
        />
        <input
            type="number"
            name="age"
            placeholder="Age"
            className="border-2 border-blue-600 p-2 rounded mb-2"
            onChange={handleChange}
            value={formdata.age}
        />
        <button
            type="submit"
            className="mb-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-lg transition duration-300"
        >
            Predict
        </button>
        <p className="bg-blue-600 text-white font-semibold py-2 px-6 rounded shadow-lg">{`Prediction Result: ${prediction}`}</p>
    </form>    
    
    </>
);
};

export default Dashboard;