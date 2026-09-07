import { Link } from "react-router-dom";
import { IoIosLock } from "react-icons/io";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import Login from "./Login";

const NavBar = () => {
  const [userLogin, setUserLogin] = useState(false);

  return (
    <>
      <nav className="bg-white border-b-2 border-gray-200 w-full z-1000 fixed top-0">
        <div className="flex justify-between items-center">
          <div>
            <div className="leading-none hover:border-blue-900 hover:border-2 hover:rounded-sm px-2 hover:box-border cursor-pointer ">
              <Link to="/">
                <h1 className="font-bold pt-2 px-3 pb-1 text-[24px]">
                  MAHA-SETU
                </h1>
                <p className="text-[12px]">Unified Citizen & Business Portal</p>
              </Link>
            </div>
          </div>
          <div className="flex justify-between items-center gap-6">
            <li className="list-none cursor-pointer hover:text-blue-800 ">
              <Link to="/about/setu">About Setu</Link>
            </li>
            <li className="list-none cursor-pointer hover:text-blue-800">
              <Link to="/help-support">Help & Support</Link>
            </li>
            <Link to={"/signup-login"}>
              <button
                type="button"
                className="bg-blue-900 text-white rounded-[15px] inline-flex justify-center items-center gap-2 px-2 py-2 mr-2 hover:bg-blue-800 cursor-pointer"
                onClick={() => setUserLogin(true)}
              >
                <IoIosLock className="text-base shrink-0" />
                <span className="text-[18px] ">Login | Register</span>
              </button>
            </Link>
          </div>
        </div>
      </nav>
      {userLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[8px] mt-12">
          <div className="relative w-full max-w-md bg-white rounded-2xl ">
            <button
              className="text-red-600 text-4xl absolute top-[-14px] right-[-14px] z-10"
              onClick={() => setUserLogin(false)}
            >
              <MdCancel />
            </button>
            <Login />
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
