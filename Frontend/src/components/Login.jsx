import { useState } from "react";

const Login = () => {
  const [role, setRole] = useState("user");
  const [mode, setMode] = useState("login");
  //   const [] = useState()

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <div className="w-full text-cente ">
        <button
          type="button"
          onClick={() => setRole("user")}
          className={`w-1/2 border-2 text-2xl rounded-tl-2xl border-gray-500 ${role === "user" ? "bg-blue-900 text-white " : "text-black bg-gray-100 hover:bg-gray-200 "}`}
        >
          User / Citizen
        </button>
        <button
          type="button"
          onClick={() => setRole("admin")}
          className={`w-1/2 border-2 text-2xl rounded-tr-2xl border-gray-500 ${role === "admin" ? "bg-blue-900 text-white " : "text-black bg-gray-100 hover:bg-gray-200 "}`}
        >
          Admin
        </button>
      </div>
      <div className="w-full text-center flex justify-center items-center ">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`w-1/2 border-2 border-gray-500 text-[20px] ${mode === "login" ? (role === "user" ? "bg-blue-900 text-white " : "text-black bg-gray-100 hover:bg-gray-200 ") : "text-black bg-gray-100 hover:bg-gray-200 "}`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`w-1/2 border-2 border-gray-500 text-[20px] ${mode === "signup" ? (role === "user" ? "bg-blue-900 text-white " : "text-black bg-gray-100 hover:bg-gray-200 ") : "text-black bg-gray-100 hover:bg-gray-200 "}`}
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`w-1/2 border-2 border-gray-500 text-[20px] ${mode === "login" ? (role === "admin" ? "bg-blue-900 text-white " : "text-black bg-gray-100 hover:bg-gray-200 ") : "text-black bg-gray-100 hover:bg-gray-200 "}`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`w-1/2 border-2 border-gray-500 text-[20px] ${mode === "signup" ? (role === "admin" ? "bg-blue-900 text-white " : "text-black bg-gray-100 hover:bg-gray-200 ") : "text-black bg-gray-100 hover:bg-gray-200 "}`}
        >
          Sign Up
        </button>
      </div>
      <div className="w-full ">
        <form action="" onSubmit={handleSubmit}>
          {/* user login */}

          {role === "user" && mode === "login" && (
            <>
              <div className="border-2 border-gray-500 w-full py-2 px-4 space-y-2 text-[18px] rounded-b-2xl bg-gray-200">
                <br />
                <label htmlFor="">Email :</label>
                <input
                  type="email"
                  name=""
                  id=""
                  required
                  className="border-2 border-blue-900 rounded-[4px] absolute right-5"
                />
                <br />
                <br />
                <label htmlFor="">Password :</label>
                <input
                  type="password"
                  name=""
                  id=""
                  required
                  className="border-2 border-blue-900 rounded-[4px] absolute right-5"
                />
                <br />
                <br />
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-2xl p-2">
                  Login
                </button>
              </div>
            </>
          )}

          {/* user signup */}
          {role === "user" && mode === "signup" && (
            <>
              <div className="border-2 border-gray-500 w-full py-2 px-4 space-y-2 text-[18px] rounded-b-2xl bg-gray-200">
                <label htmlFor="">Name :</label>
                <input
                  type="text"
                  name=""
                  id=""
                  required
                  className="border-2 border-blue-900 rounded-[4px] absolute right-5"
                />
                <br /> <br />
                <label htmlFor="">Phone number :</label>
                <input
                  type="tel"
                  name=""
                  id=""
                  maxLength="10"
                  required
                  className="border-2 border-blue-900 rounded-[4px] absolute right-5"
                />
                <br />
                <br />
                <label htmlFor="">OTP :</label>
                <input
                  type="text"
                  className="border-2 border-blue-900 rounded-[4px] absolute right-5"
                  name="otp"
                  id=""
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="6"
                  minLength="6"
                  required
                />
                <br />
                <br />
                <label htmlFor="">Age :</label>
                <input
                  type="number"
                  name="age"
                  id=""
                  required
                  className="border-2 border-blue-900 rounded-[4px] absolute right-5"
                />
                <br />
                <br />
                <label htmlFor="" className="mr-34">
                  Gender :
                </label>
                <input type="radio" name="gender" id="" />
                <label htmlFor="" className="mr-3">
                  Male
                </label>
                <input type="radio" name="gender" id="" />
                <label htmlFor="" className="mr-3">
                  female
                </label>
                <input type="radio" name="gender" id="" />
                <label htmlFor="">Other</label>
                <br />
                <br />
                <label htmlFor="">Email :</label>
                <input
                  type="email"
                  name=""
                  id=""
                  required
                  className="border-2 border-blue-900 rounded-[4px] absolute right-5"
                />
                <br />
                <br />
                <label htmlFor="">Password :</label>
                <input
                  type="password"
                  name=""
                  id=""
                  required
                  className="border-2 border-blue-900 rounded-[4px] absolute right-5"
                />
                <br />
                <br />
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-2xl p-2">
                  Sign UP
                </button>
              </div>
            </>
          )}

          {/* admin login */}
          {role === "admin" && mode === "login" && (
            <>
              <div className="border-2 border-gray-500 w-full py-2 px-4 space-y-2 text-[18px] rounded-b-2xl bg-gray-200">
                <br />
                <label htmlFor="">Employee ID</label>
                <input
                  type="text"
                  name=""
                  id=""
                  className="border-2 border-blue-900 rounded-[4px] absolute right-5"
                />
                <br />
                <br />
                <label htmlFor="">Email :</label>
                <input
                  type="email"
                  name=""
                  id=""
                  required
                  className="border-2 border-blue-900 rounded-[4px] absolute right-5"
                />
                <br />
                <br />
                <label htmlFor="" className="">
                  Password :
                </label>
                <input
                  type="password"
                  name=""
                  id=""
                  required
                  className="border-2 border-blue-900 rounded-[4px] absolute right-5 "
                />
                <br />
                <br />
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-2xl p-2">
                  Login
                </button>
              </div>
            </>
          )}

          {/* admin signup */}
          {role === "admin" && mode === "signup" && (
            <>
              <div className="border-2 border-gray-500 w-full py-2 px-4 space-y-2 text-[18px] rounded-b-2xl bg-gray-200">
                <label htmlFor="">Department Name :</label>
                <select
                  name=""
                  id=""
                  className=" mx-2 text-[14px] border-2 rounded-[4px] border-blue-900"
                >
                  <option value="">Agriculture Department</option>
                  <option value="">
                    Food, Civil Supplies and Consumer Protection Department
                  </option>
                  <option value="">
                    Industries, Energy, and Labour Department
                  </option>
                  <option value="">
                    Public Health and Family Welfare Department
                  </option>
                  <option value="">Revenue and Forest Department</option>
                  <option value="">
                    Rural Development and Panchayat Raj Department
                  </option>
                  <option value="">
                    Social Justice and Special Assistance Department
                  </option>
                  <option value="">Transport and Ports Department (RTO)</option>
                  <option value="">Urban Development Department</option>
                  <option value="">
                    Women and Child Development Department
                  </option>
                </select>
                <br />
                <label htmlFor="">Employee ID</label>
                <input
                  type="text"
                  name=""
                  id=""
                  className="border-2 border-blue-900 rounded-[4px] absolute right-5"
                />
                <br />
                <br />
                <label htmlFor="">Name :</label>
                <input
                  type="text"
                  name=""
                  id=""
                  required
                  className="border-2 border-blue-900 rounded-[4px] absolute right-5"
                />
                <br /> <br />
                <label htmlFor="">Phone number :</label>
                <input
                  type="tel"
                  name=""
                  id=""
                  maxLength="10"
                  required
                  className="border-2 border-blue-900 rounded-[4px] absolute right-5"
                />
                <br /> <br />
                <label htmlFor="">OTP :</label>
                <input
                  type="text"
                  className="border-2 border-blue-900 rounded-[4px] absolute right-5"
                  name="otp"
                  id=""
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="6"
                  minLength="6"
                  required
                />
                <br />
                <br />
                <label htmlFor="">Email :</label>
                <input
                  type="email"
                  name=""
                  id=""
                  required
                  className="border-2 border-blue-900 rounded-[4px] absolute right-5"
                />
                <br />
                <br />
                <label htmlFor="" className="">
                  Password :
                </label>
                <input
                  type="password"
                  name=""
                  id=""
                  required
                  className="border-2 border-blue-900 rounded-[4px] absolute right-5 "
                />
                <br />
                <br />
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-2xl p-2">
                  Sign Up
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
