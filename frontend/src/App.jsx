import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import "./App.css";
import ConnexionRegister from "./pages/ConnexionRegister";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<ConnexionRegister />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
