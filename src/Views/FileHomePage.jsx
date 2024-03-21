import { useEffect, useState } from "react";

import { getFiles } from "../api/fetchData";

import File from "../components/File";
import Folder from "../components/Folder";


export const FileHomePage = () => {
  const [currentFiles, setCurrentFiles] = useState(null);
  const [sortBy, setSortBy] = useState(undefined);
  const [filterBy, setFilterBy] = useState(undefined);

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
  }, []);

  const sortFiles = (sortBy) => {
    if (currentFiles){
    const sortedFiles = [...currentFiles];
    sortedFiles.sort((a, b)=> {
        if (sortBy === "name"){
            return a.name.localeCompare(b.name);
        } else if (sortBy === "size") {
            return a.size - b.size;
        } else if (sortBy === "date") { 
            const dateA = new Date(a.added);
            const dateB = new Date(b.added);
                return dateA - dateB;
        }
    })
    return sortedFiles;
};
  };

  const handleSort = () => {
    if (sortBy){
    const sortedFiles = sortFiles(sortBy);
    console.log(sortedFiles);
        setCurrentFiles(sortedFiles);
    }
  };

  const filterByName = (searchTerm) => {
    setFilterBy(searchTerm);
    if (currentFiles){
  
        let filteredFiles = [...currentFiles];

        filteredFiles = filteredFiles.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setCurrentFiles(filteredFiles);
    };
  };

  const clearSearch = () => {
    setFilterBy("");
    fetchFiles();
  };

  return (
    <>
      <div className="fileHomePage">
        <h1>File Portal</h1>
      </div>
      <div>
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} defaultValue="" data-testid="sortByInput">
            <option value="" disabled selected>Sort by...</option>
            <option value="date" key="date">Date Added</option>
            <option value="size" key="size">File size</option>
            <option value="name" key="name">Name</option>
        </select>
        <button onClick={handleSort} data-testid="sortButton">Sort</button>
        <br/>
        <input placeholder="Search by name..." type="search" value={filterBy} onChange={(e) => filterByName(e.target.value)} data-testid="filterInput"/>
        <button onClick={clearSearch} data-testid="clearButton">Clear Search</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {currentFiles &&
          currentFiles.map((file) => {
            if (file.type === "folder"){
            return <Folder props={file} />}
            else return <File props={file} />
          })}
      </div>
    </>
  );
};

export default FileHomePage;
