import { Link } from "react-router-dom";

import {
    FaFolder,
    FaHome,
    FaFilePdf
} from "react-icons/fa";

function Sidebar(){

    return(

        <div className="sidebar">

            <h2
            style={{
                color:"#4F8EF7",
                marginBottom:"40px"
            }}
            >
                CourseMate
            </h2>

            <div
            style={{
                display:"flex",
                flexDirection:"column",
                gap:"25px"
            }}
            >

                <Link to="/dashboard">

                    <FaHome/> Dashboard

                </Link>

                <Link to="/organizer">

                    <FaFolder/> Organizer

                </Link>

                <Link to="/viewer/1">

                    <FaFilePdf/> Viewer

                </Link>

            </div>

        </div>

    );

}

export default Sidebar;