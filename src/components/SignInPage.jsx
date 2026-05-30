import React from "react";
import { useSelector } from "react-redux";
import BingeCatButton from "../ReUsables/BingeCatButton";
import LogoTextTheme1 from "../svgs/LogoTextSVG";
import { Link } from "react-router-dom";

import { useState } from "react";

const SignInPage = () => {
  const [signIn, setSignIn] = useState(true);
  function toggleSignIn() {
    setSignIn(!signIn);
  }
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center mt-24 sm:mt-40">
      <div className="relative bg-white dark:bg-black border border-purple-700 rounded-2xl w-[90%] sm:w-[500px] min-h-[400px]  pt-20 px-6 sm:px-10 pb-10 shadow-2xl flex flex-col items-center">
        <img
          src={`${import.meta.env.BASE_URL}applogo.png`}
          alt="App Logo"
          className="
          w-[150px] sm:w-[190px]
          absolute
          -top-20 sm:-top-24
          left-1/2
          -translate-x-1/2
          z-30
        "
        />

        <Link to="/BingeCat/movies">
          <LogoTextTheme1 />
        </Link>
        {signIn ? (
          <>
            <h1 className="text-xl text-purple-700 font-bold mb-4">
              Welcome Back buddy
            </h1>

            <form className="w-full flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label className="text-black dark:text-white font-semibold">
                  Username
                </label>

                <input
                  type="text"
                  placeholder="Enter username"
                  className="border border-purple-700 rounded-xl px-4 py-3 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-black dark:text-white font-semibold">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter password"
                  className="border border-purple-700 rounded-xl px-4 py-3 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <BingeCatButton className="w-full mt-4 h-[60px]">
                Login
              </BingeCatButton>
            </form>
            <p className="text-zinc-900 text flex items-center gap-2 p-4 dark:text-zinc-300 ">
              Don't have an account?
              <span
                className="text-purple-700 hover:font-bold "
                onClick={() => toggleSignIn()}
              >
                SignUp
              </span>
            </p>
            <Link to="/BingeCat/movies">
              <p className="text-sm text-gray-500   hover:border-b flex items-center">
                or continue a guest
              </p>
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-xl text-purple-700 font-bold mb-2">
              Create your account
            </h1>

            <form className="w-full flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-black dark:text-white font-semibold">
                  name
                </label>

                <input
                  type="text"
                  placeholder="Enter username"
                  className="border border-purple-700 rounded-xl px-4 py-3 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-black dark:text-white font-semibold">
                  Email address
                </label>

                <input
                  type="text"
                  placeholder="Enter username"
                  className="border border-purple-700 rounded-xl px-4 py-3 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-black dark:text-white font-semibold">
                  Password
                </label>

                <input
                  type="password"
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
                  placeholder="Enter password"
                  className="border border-purple-700 rounded-xl px-4 py-3 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <BingeCatButton className="w-full mt-4 h-[60px]">
                Create account
              </BingeCatButton>
            </form>
            <p className="text-zinc-900 dark:text-zinc-300 text flex items-center gap-2 p-4">
              Already have an account?
              <span
                className="text-purple-700 hover:font-bold "
                onClick={() => toggleSignIn()}
              >
                {" "}
                SignIn{" "}
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
