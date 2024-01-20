import React from "react";
import Navbar from "../components/Navbar";

const ErrorPage: React.FC = () => {
  let msg = "Resource was not found";
  return (
    <div>
      <Navbar />
      <div className='mt-80 text-2xl font-bold w-full flex justify-center items-center'>
        <h1>{msg}</h1>
      </div>
    </div>
  );
};

export default ErrorPage;
