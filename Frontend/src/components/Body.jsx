import image from "../media/mainpageimage.png";

const Body = () => {

  return (
    <div className="w-full flex justify-between items-center">
      <div className=" w-1/2 mt-30">
        <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="text-3xl font-bold px-8">
            Welcome to MAHA-SETU. Your Gateway to Unified State Services.
          </h1>
          <p className="px-8">
            Access welfare schemes, business licenses, and certificates
            seamlessly. Authenticated by MeriPehchan & DigiLocker.
          </p>
          <div className="border-blue-400 w-[80%] h-[50%] border-2 m-8 rounded-xl bg-blue-100 ">
            <div className="my-2 pb-2">
              <ol className="mt-4 px-4 space-y-2.5 text-sm text-slate-700 list-decimal list-inside marker:font-bold marker:text-blue-900">
                <li className="leading-relaxed">
                  <strong className="text-slate-900 font-semibold">
                    Choose Profile:
                  </strong>{" "}
                  Click your designated category (User or Admin).
                </li>
                <li className="leading-relaxed">
                  <strong className="text-slate-900 font-semibold">
                    Enter Details:
                  </strong>{" "}
                  Provide your registered Email / Mobile and Password.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-slate-900 font-semibold">
                    Authenticate:
                  </strong>{" "}
                  Complete OTP verification if prompted via DigiLocker /
                  MeriPehchan.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-slate-900 font-semibold">
                    First Time User:
                  </strong>{" "}
                  Switch to Sign Up to complete one-time registration.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex justify-end items-center">
        <img src={image} alt="" className="h-[90vh]" />
      </div>
    </div>
  );
};

export default Body;
