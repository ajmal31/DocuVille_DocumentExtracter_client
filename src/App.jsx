import axios from "axios";
import { BASE_URL } from "./utils/const";
import { useState } from "react";

function App() {
  const [extractedDetails, setExtractedDetails] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Handle Upload
  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  // POST Request
  const postData = async (data) => {
    try {
      setExtractedDetails("");
      setLoading(true);
      const response = await axios.post(`${BASE_URL}upload`, data);
      setLoading(false);
      setExtractedDetails(response.data);
    } catch (error) {
      console.log("eror", error.message);
      setError(true);
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
      <div className="p-20 border border-black flex gap-5 h-screen bg-green-600  text-white">
        <div className="w-1/3 ">
          <label htmlFor="" className="text-xl mb-5">
            Upload you driving License
          </label>
          <input type="file" onChange={handleUpload} />
          <button
            className="border bg-blue-500 px-2 py-1 rounded-md"
            onClick={handleSubmit}
          >
            submit
          </button>
        </div>
        {error ? (
          <h1>Error in loading data.. Refresh🌀🌀</h1>
        ) : extractedDetails ? (
          <div className="w-2/3 ">
            <p>{extractedDetails}</p>
          </div>
        ) : loading ? (
          <h1>Loading....</h1>
        ) : (
          ""
        )}

        {}
      </div>
    </>
  );
}

export default App;
