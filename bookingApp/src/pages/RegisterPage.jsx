import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("/register", { name, email, pass });
      const firstName = name.split(" ")[0];

      setSuccessMessage(
        `🎉 You're all set, ${firstName}! Your account is now ready.`
      );
      setRedirect(true);
    } catch (error) {
      console.log(error);
      console.log("Registration Error", error);
      setSuccessMessage("Oops! Something went wrong. Please try again."); // Handle registration failure
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64 ">
        <h1 className="mb-4 text-4xl text-center">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button className="primary">Create</button>
          <div className="flex justify-between py-2 text-gray-600 ">
            Already a Member?
            <Link className="underline font-bold" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
        {successMessage && (
          <div className="mt-4 text-center text-green-600">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
}
