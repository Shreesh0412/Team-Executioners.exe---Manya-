import Sidebar from "../components/Sidebar";
import Card from "../components/Card";

function Dashboard(){

    return(

        <div className="flex">

            <Sidebar/>

            <div className="main">

                <h1
                style={{
                    marginBottom:"30px"
                }}
                >
                    Welcome Back 👋
                </h1>

                <div className="grid">

                    <Card
                        title="Documents"
                        value="12"
                    />

                    <Card
                        title="Folders"
                        value="5"
                    />

                    <Card
                        title="Study Hours"
                        value="18"
                    />

                </div>

                <div
                className="card"
                style={{
                    marginTop:"40px"
                }}
                >

                    <h2
                    style={{
                        marginBottom:"20px"
                    }}
                    >
                        Today's AI Plan
                    </h2>

                    <ul
                    style={{
                        lineHeight:"35px"
                    }}
                    >

                        <li>📘 Operating Systems - 2 hrs</li>

                        <li>📄 DBMS Notes - 1 hr</li>

                        <li>📝 Take Flashcard Quiz</li>

                        <li>✅ Revise Yesterday's Notes</li>

                    </ul>

                </div>

            </div>

        </div>

    )

}

export default Dashboard;