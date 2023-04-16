import Login from "app/pages/Auth/Login";
import SignUp from "app/pages/Auth/SignUp";
import BasicInformation from "app/pages/BasicInformation";
import Home from "app/pages/Home";
import Welcome from "app/pages/welcome";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Upload from "app/pages/upload";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          {" "}
        </Route>
        <Route path="/login" element={<Login />}>
          {" "}
        </Route>
        <Route path="/signup" element={<SignUp />}>
          {" "}
        </Route>
        <Route path="/welcome" element={<Welcome />}>
          {" "}
        </Route>
        <Route path="/basicinfo" element={<BasicInformation />}>
          {" "}
        </Route>
        <Route path="/upload" element={<Upload />}>
          {" "}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
