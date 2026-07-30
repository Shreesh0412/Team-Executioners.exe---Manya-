import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  getFolders,
  createFolder,
  deleteFolder,
  getDocuments,
  uploadPDF,
} from "../api";

function Organizer() {
  const [folders, setFolders] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");

  async function loadData() {
    try {
      const folderRes = await getFolders();
      setFolders(folderRes.data);

      const docRes = await getDocuments();
      setDocuments(docRes.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function addFolder() {
    if (!folderName) return;

    await createFolder({
      name: folderName,
    });

    setFolderName("");
    loadData();
  }

  async function removeFolder(id) {
    await deleteFolder(id);
    loadData();
  }

  async function handleUpload(e) {
    if (!selectedFolder) {
      alert("Select a folder first");
      return;
    }

    const formData = new FormData();

    formData.append("file", e.target.files[0]);
    formData.append("folder_id", selectedFolder);

    await uploadPDF(formData);

    loadData();
  }

  return (
    <div className="flex">

      <Sidebar />

      <div className="main">

        <h1>Organizer</h1>

        <br />

        <input
          placeholder="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />

        <button
          className="btn"
          onClick={addFolder}
        >
          Create Folder
        </button>

        <br /><br />

        <select
          onChange={(e) => setSelectedFolder(e.target.value)}
        >
          <option>Select Folder</option>

          {folders.map((folder) => (
            <option
              key={folder.id}
              value={folder.id}
            >
              {folder.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept=".pdf"
          onChange={handleUpload}
        />

        <br /><br />

        <div className="grid">

          {folders.map((folder) => (

            <div
              className="card"
              key={folder.id}
            >

              <h2>{folder.name}</h2>

              <button
                className="btn"
                onClick={() => removeFolder(folder.id)}
              >
                Delete
              </button>

            </div>

          ))}

        </div>

        <br /><br />

        <h2>Documents</h2>

        <div className="grid">

          {documents.map((doc) => (

            <div
              key={doc.id}
              className="card"
            >

              <h3>{doc.file_name}</h3>

              <p>{doc.page_count} Pages</p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Organizer;