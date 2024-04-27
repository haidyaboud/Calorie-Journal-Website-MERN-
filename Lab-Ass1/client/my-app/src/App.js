import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./Components/Navbar";
import DisplayFoodList from "./Components/DisplayFoodList";
import EditFood from "./Components/EditFood";
import AddFood from "./Components/AddFood";
import AddUser from "./Components/AddUser";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <br />
      <Routes>
          <Route path="/" exact element={<DisplayFoodList/>} />
          <Route path="/edit/:id" element={<EditFood/>} />
        +  <Route path="/create" element={<AddFood/>} />
          <Route path="/user" element={<AddUser/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;