import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import FileHomePage from "./Views/FileHomePage";
import Folder from "./Views/Folder";

function App() {
  return (
    <>
      <FileHomePage/>
    </>
  );
}

export default App;
