import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import UserContextProvider from "./UserContext";
import { useEffect } from "react";
import AccountPage from "./pages/AccountPage";
import PlacesPage from "./pages/AccountPlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import AccountPlacesPage from "./pages/AccountPlacesPage";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/account" element={<AccountPage />}></Route>
          <Route path="/account/places" element={<AccountPlacesPage />}></Route>
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route
            path="/account/places/:id"
            element={<PlacesFormPage />}
          ></Route>
          <Route path="/place/:id" element={<PlacePage />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
