import fileImg from "../assets/fileImg.png";

export const File = ({ props }) => {
  const { name } = props;

  return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}} key={name} >
        <img
          style={{ width: "50px" }}
          src={fileImg}
          alt={"file"}
        />
        <p>{name}</p>
      </div>    
  );
};

export default File;
