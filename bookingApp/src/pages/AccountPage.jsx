import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function AccountPage() {
  const [redirect, setRedirect] = useState(false);
  const { user, setUser, ready } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect(true);
    setUser(null);
  }

  if (!user && ready && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (!ready) {
    return "Loading";
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <AccountNav />

      {/* Profile section styling */}
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto rounded-lg shadow-md bg-white p-6 mt-4">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Welcome, {user.name}
          </h2>
          <p className="text-gray-600 mb-5">Email: {user.email}</p>
          <button
            onClick={logout}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-full transition-transform duration-200 hover:scale-105 hover:bg-blue-500"
          >
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
