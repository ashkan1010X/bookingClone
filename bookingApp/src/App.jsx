import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import UserContextProvider from "./UserContext";
import AccountPage from "./pages/AccountPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import AccountPlacesPage from "./pages/AccountPlacesPage";
import BookingsPage from "./pages/BookingsPage";
import AccountBookingsPage from "./pages/AccountBookingsPage";
import NotFound from "./NotFound";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

if (window.location.hostname === "localhost") {
  axios.defaults.baseURL = "http://localhost:5000";
} else {
  axios.defaults.baseURL = "https://bookingclone-backend-5pei.onrender.com";
}

axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<IndexPage />} />
          <Route path="/search" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Privacy Policy Route */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

          {/* Account Routes */}
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/places" element={<AccountPlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/account/bookings" element={<AccountBookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingsPage />} />

          {/* Place Details */}
          <Route path="/place/:id" element={<PlacePage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
