import axios from "axios";
import { useState } from "react";

function App() {
  const [extractedDetails, setExtractedDetails] = useState("");
  const [file, setFile] = useState("");

  // Handle Upload
  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };
  
  // POST Request
  const postData = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/upload", data);
      setExtractedDetails(response.data);
    } catch (error) {
      console.log("eror", error.message);
    }
  };
  
  // Hanlde Submit
  const handleSubmit = () => {
    if (file.length <= 0) alert("please upload file");
    else {
      const formData = new FormData();
      formData.append("file", file);
      postData(formData);
    }
  };
  return (
    <>
      <div className="p-20 border border-black flex gap-5 ">
        <div className="w-1/3 border border-black">
          <input type="file" onChange={handleUpload} />
          <button
            className="border bg-blue-500 px-2 py-1 rounded-md"
            onClick={handleSubmit}
          >
            submit
          </button>
        </div>
        {extractedDetails ? (
          <div className="w-2/3">
            <p>
             {extractedDetails}
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
