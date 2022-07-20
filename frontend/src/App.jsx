import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserContextProvider from "./contexts/UserContext";
import "./App.css";
import ConnexionRegister from "./pages/ConnexionRegister";
import UserProfile from "./pages/UserProfile";
import CriticMovie from "./pages/CriticMovie";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ConnexionRegister />} />
            <Route path="/home" element={<Home />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/criticmovie" element={<CriticMovie />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
