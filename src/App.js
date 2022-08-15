import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import Nav from "./components/Nav";
import AddList from "./pages/AddList";
import Profile from "./pages/Profile";
import Reservations from "./pages/Reservations";
import ListPage from "./pages/ListPage";
import AddListItem from "./pages/AddListItem";
import Pinned from "./pages/Pinned";
import LijstBewaren from "./pages/LijstBewaren";
import ItemDetail from "./pages/ItemDetail";
import LoginRedirect from './pages/LoginRedirect';


function App() {
  if (!process.env.REACT_APP_BACKEND_URL) {
    return <p>
      Please specify your backend url with the <a href="https://create-react-app.dev/docs/adding-custom-environment-variables/" target="_blank" rel="noopener noreferrer">environment variable</a>:<br />
      <b>REACT_APP_BACKEND_URL</b>.<br />
      <br />
      For example launch this app with:<br />
      <b>REACT_APP_BACKEND_URL=http://localhost:1337 yarn start</b>
    </p>;
  }


  return (
    <div className="App">
      <Routes>
        <Route exact path="/connect/:providerName/redirect" element={<LoginRedirect />} />
        <Route exact path="/" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="/List" element={<List />} />
        <Route path="/AddList" element={<AddList />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Reservations" element={<Reservations />} />
        <Route path="/ListPage" element={<ListPage />} />
        <Route path="/ListDetail/:id" element={<ListPage />} />
        <Route path="/ItemDetail/:id" element={<ItemDetail />} />
        <Route path="/AddListItem" element={<AddListItem />} />
        <Route path="/Pinned" element={<Pinned />} />
        <Route path="/LijstBewaren" element={<LijstBewaren />} />
       
        

      </Routes>
      <Nav />

    </div>
  );
}

export default App;
