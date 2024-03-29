import React from "react";
import User from "../../models/User";

import defaultProfileImage from "../../assets/default-profile-img.png";
import { Link } from "react-router-dom";

const AdminNavbar: React.FC<{ userData?: User }> = ({ userData }) => {
  return (
    <div className='flex justify-between items-center px-10 sm:px-32 lg:px-48 py-5 sm:py-10 mb-20'>
      <Link to='/admin' className='text-2xl font-bold md:text-4xl'>
        EASY <span className='text-primary_orange'>FEAST</span>
      </Link>
      <div className='flex items-center'>
        <div className='text-sm md:text-xl mr-3'>
          <p>{userData?.username}</p>
        </div>
        <img
          className='w-10 h-full border-2 border-typography_color rounded-full'
          src={defaultProfileImage}
          alt='admin'
        />
      </div>
    </div>
  );
};

export default AdminNavbar;
