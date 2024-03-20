import { useEffect, useState } from "react";

import { getFiles } from "../api/fetchData";
import FileFolder from "../components/FileFolder";

export const FileHomePage = () => {
  const [currentFiles, setCurrentFiles] = useState(null);

  const fetchFiles = async () => {
    try {
      const files = await getFiles();

      if (files) {
        setCurrentFiles(files);
      }
    } catch (err) {
      console.log("ERROR: ", err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [currentFiles]);

  return (
    <>
      <div className="App">
        <h1>File Portal</h1>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {currentFiles &&
          currentFiles.map((file) => {
            return <FileFolder props={file} />;
          })}
      </div>
    </>
  );
};

export default FileHomePage;
