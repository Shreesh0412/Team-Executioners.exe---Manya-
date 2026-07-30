import { Link } from "react-router-dom";

function Navbar() {

    return (

        <div className="container">

            <div className="nav">

                <div className="logo">

                    CourseMate

                </div>

                <div style={{
                    display:"flex",
                    gap:"20px",
                    alignItems:"center"
                }}>

                    <Link to="/">Home</Link>

                    <Link to="/login">Login</Link>

                    <Link to="/dashboard">

                        <button className="btn">

                            Dashboard

                        </button>

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Navbar;