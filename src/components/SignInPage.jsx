import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import BingeCatButton from "../ReUsables/BingeCatButton";
import LogoTextTheme1 from "../svgs/LogoTextSVG";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { setUser } from "../store/slices/userSlice";

const SignInPage = () => {
  const [signIn, setSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function toggleSignIn() {
    setSignIn(!signIn);
    setError("");
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
      navigate("/BingeCat/movies");
    } catch (err) {
      const formattedError = err.message
        .replace("Firebase: ", "")
        .replace(/auth\/(invalid-credential|user-not-found|wrong-password)/g, "Invalid email or password")
        .replace(/auth\/(invalid-email)/g, "Invalid email address");
      setError(formattedError);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
      });
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: name,
        })
      );
      navigate("/BingeCat/movies");
    } catch (err) {
      const formattedError = err.message
        .replace("Firebase: ", "")
        .replace(/auth\/(email-already-in-use)/g, "Email address is already in use")
        .replace(/auth\/(weak-password)/g, "Password should be at least 6 characters")
        .replace(/auth\/(invalid-email)/g, "Invalid email address");
      setError(formattedError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center mt-24 sm:mt-40">
      <div className="relative bg-white dark:bg-black border border-purple-700 rounded-2xl w-[90%] sm:w-[500px] min-h-[400px] pt-20 px-6 sm:px-10 pb-10 shadow-2xl flex flex-col items-center">
        <img
          src={`${import.meta.env.BASE_URL}applogo.png`}
          alt="App Logo"
          className="w-[150px] sm:w-[190px] absolute -top-20 sm:-top-24 left-1/2 -translate-x-1/2 z-30"
        />

        <Link to="/BingeCat/movies">
          <LogoTextTheme1 />
        </Link>

        {error && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2.5 rounded-xl text-sm font-semibold text-center mt-4">
            {error}
          </div>
        )}

        {signIn ? (
          <>
            <h1 className="text-xl text-purple-700 font-bold mb-4 mt-2">
              Welcome Back buddy
            </h1>

            <form onSubmit={handleLogin} className="w-full flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label className="text-black dark:text-white font-semibold">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="border border-purple-700 rounded-xl px-4 py-3 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-black dark:text-white font-semibold">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="border border-purple-700 rounded-xl px-4 py-3 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <BingeCatButton
                type="submit"
                disabled={loading}
                className="w-full mt-4 h-[60px]"
              >
                {loading ? "Loading..." : "Login"}
              </BingeCatButton>
            </form>
            <p className="text-zinc-900 text flex items-center gap-2 p-4 dark:text-zinc-300 ">
              Don't have an account?
              <span
                className="text-purple-700 hover:font-bold cursor-pointer"
                onClick={toggleSignIn}
              >
                SignUp
              </span>
            </p>
            <Link to="/BingeCat/movies">
              <p className="text-sm text-gray-500 hover:border-b flex items-center">
                or continue a guest
              </p>
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-xl text-purple-700 font-bold mb-2 mt-2">
              Create your account
            </h1>

            <form onSubmit={handleSignUp} className="w-full flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-black dark:text-white font-semibold">
                  Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="border border-purple-700 rounded-xl px-4 py-3 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-black dark:text-white font-semibold">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="border border-purple-700 rounded-xl px-4 py-3 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-black dark:text-white font-semibold">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="border border-purple-700 rounded-xl px-4 py-3 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-black dark:text-white font-semibold">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="border border-purple-700 rounded-xl px-4 py-3 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <BingeCatButton
                type="submit"
                disabled={loading}
                className="w-full mt-4 h-[60px]"
              >
                {loading ? "Loading..." : "Create account"}
              </BingeCatButton>
            </form>
            <p className="text-zinc-900 dark:text-zinc-300 text flex items-center gap-2 p-4">
              Already have an account?
              <span
                className="text-purple-700 hover:font-bold cursor-pointer"
                onClick={toggleSignIn}
              >
                SignIn
              </span>
            </p>
            <Link to="/BingeCat/movies">
              <p className="text-sm text-gray-500 hover:border-b">
                or continue a guest
              </p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default SignInPage;
