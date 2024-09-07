import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () =>{
    const [formdata, setFormdata] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { email, password } = formdata;
            if (!(email && password)) {
                alert("All input is required");
            }

            const response = await axios.post("http://localhost:3000/users/login", formdata);
            console.log(response);
            localStorage.setItem('token', response.data.token);


            if (response.status === 200) {
                navigate("/Dashboard");
            }

        } catch (error) {
            console.log(error);
        }
    }

    

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-4xl font-bold text-blue-600 mb-6">Login</h2>
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="border-2 border-blue-600 p-2 rounded mb-3"
                onChange={handleChange}
                value={formdata.email}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                className="border-2 border-blue-600 p-2 rounded mb-3"
                onChange={handleChange}
                value={formdata.password}
            />
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-lg transition duration-300"
            >
                Login
            </button>
        </form>
    );
};

export default Login;
