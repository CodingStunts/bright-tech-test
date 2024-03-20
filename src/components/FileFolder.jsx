import fileImg from "../assets/fileImg.png";
import folderImg from "../assets/folderImg.png";

export const FileFolder = ({ props }) => {
  const { name, type } = props;

  const isFolder = type === "folder";

  return (
    <a href={`./${name}`}>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}} key={name}>
        <img
          style={{ width: "50px" }}
          src={isFolder ? folderImg : fileImg}
          alt={isFolder ? "folder image" : "file image"}
        />
        <p>{name}</p>
      </div>
    </a>
  );
};

export default FileFolder;
