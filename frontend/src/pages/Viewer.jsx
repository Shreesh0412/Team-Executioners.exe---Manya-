import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Viewer() {

  const { id } = useParams();

  return (

    <div className="flex">

      <Sidebar />

      <div className="main">

        <h1>PDF Viewer</h1>

        <br />

        <div
          className="card"
          style={{
            height: "700px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px"
          }}
        >
          PDF Viewer for Document #{id}
        </div>

        <br />

        <div className="grid">

          <div className="card">
            <h3>📑 Summary</h3>
            <button className="btn">Generate</button>
          </div>

          <div className="card">
            <h3>📝 Flashcards</h3>
            <button className="btn">Generate</button>
          </div>

          <div className="card">
            <h3>❓ Quiz</h3>
            <button className="btn">Generate</button>
          </div>

        </div>

      </div>

    </div>

  );

}

export default Viewer;