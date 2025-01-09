import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const [passVisible, setPassVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const processedEmail = email.toLowerCase();
      const { data } = await axios.post("/login", {
        email: processedEmail,
        pass,
      });
      setUser(data);
      console.log(data);
      setRedirect(true);
    } catch (err) {
      console.log(err);
      if (err.response.data === "Account does not exist") {
        setErrorMessage(err.response.data);
      } else {
        setErrorMessage(err.response.data);
      }
    }
  }

  const togglePassVisibility = () => {
    setPassVisible(!passVisible);
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-20 grow flex items-center justify-around">
      <div className="mt-20 w-full bg-white ">
        <h1 className="mb-4 text-4xl text-center">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={passVisible ? "text" : "password"}
              placeholder="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full pr-10"
              required
            />
            <button
              type="button"
              onClick={togglePassVisibility}
              className="absolute right-3 top-1/2 bg-transparent transform -translate-y-1/2 text-lg"
              title={passVisible ? "hide" : "show"}
            >
              {passVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            title="show"
            className="bg-gradient-to-r from-pink-500 to-pink-700 p-2 text-white rounded-3xl w-full hover:from-pink-700 hover:to-pink-800"
          >
            Login
          </button>
          <div className="flex justify-between py-2 text-gray-500 ">
            {" "}
            Dont have an account?
            <Link
              className="underline font-bold  hover:text-gray-600"
              to={"/register"}
            >
              Sign Up Now!{" "}
            </Link>
          </div>
        </form>
        {errorMessage && (
          <div className="mt-4 font-bold text-center text-red-600">
            {errorMessage === "Account does not exist" ? (
              <>
                {errorMessage} {""}
                <Link
                  className="underline text-blue-500 hover:text-gray-500 "
                  to="/register"
                >
                  Click here
                </Link>
              </>
            ) : (
              errorMessage
            )}
          </div>
        )}
      </div>
    </div>
  );
}
