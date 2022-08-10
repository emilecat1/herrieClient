import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import Nav from "./components/Nav";
import AddList from "./pages/AddList";
import Profile from "./pages/Profile";
import Reservations from "./pages/Reservations";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/List" element={<List />} />
        <Route path="/AddList" element={<AddList />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Reservations" element={<Reservations />} />
      </Routes>
      <Nav />

    </div>
  );
}

export default App;
