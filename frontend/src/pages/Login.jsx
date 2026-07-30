import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    async function handleLogin() {
    try {
        const res = await login({
        email,
        password,
        });

        localStorage.setItem(
        "token",
        res.data.access_token
        );

        alert("Login Successful!");

        navigate("/dashboard");
    } catch (err) {
        console.log(err);

        alert("Invalid Email or Password");
    }
}

    return (

        <div
            className="gradient center"
            style={{
                height: "100vh"
            }}
        >

            <div
                className="card"
                style={{
                    width: "400px"
                }}
            >

                <h1
                    style={{
                        marginBottom: "20px"
                    }}
                >
                    Login
                </h1>

                <input
                    placeholder="Email"

                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input

                    type="password"

                    placeholder="Password"

                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button

                    className="btn"

                    style={{
                        width: "100%",
                        marginTop: "15px"
                    }}

                    onClick={handleLogin}

                >

                    Login

                </button>

            </div>

        </div>

    );

}

export default Login;