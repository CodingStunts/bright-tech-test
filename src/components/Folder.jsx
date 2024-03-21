import { useState } from "react";
import folderImg from "../assets/folderImg.png";
import File from "./File";

export const Folder = ({ props }) => {
  const { name, files } = props;

  const [folderOpen, setFolderOpen] = useState(false);

  const openFolder = () => {
    setFolderOpen((folderOpen) => !folderOpen);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
        key={name}
        onClick={openFolder}
        data-testid="folderfile"    
        >
        <img style={{ width: "50px" }} src={folderImg} alt={"folder"} />
        <p>{name}</p>
      </div>
      {folderOpen && (
        <div style={{ marginLeft: "100px", padding: "20px" }}>
          {files.map((file) => {
            if (file.type === "folder"){
                return <Folder props={file}/>
            } else return <File props={file} />;
          })}
        </div>
      )}
    </>
  );
};

export default Folder;
