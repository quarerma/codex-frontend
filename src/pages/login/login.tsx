import { Link } from 'react-router-dom';

export default function LoginPage() {
  const inputClassName =
    'rounded-[10px] w-full px-2 py-1 bg-[#3B3B3B] text-white placeholder:opacity-20 text-2xl border-none focus:outline-none focus:ring-2 focus:ring-[#7E7C44] focus:ring-opacity-50';
  return (
    <div className="w-screen h-screen">
      <div className="w-screen text-white   text-center flex items-center justify-center bg-[#7E7C44] h-[15vh] shadow-inner-custom ">
        <h1 className="lg:text-[100px] md:text-[70px] text-[50px] tracking-[0.5em] italic font-semibold">
          CODEX
        </h1>
      </div>
      <div className="min-h-[85vh] w-screen text-white bg-[#2C2C2C] flex  justify-center items-center">
        <div className="bg-[#272727] relative rounded-[30px] xl:w-3/12 lg:w-1/4 md:w-2/5  sm:w-1/2 w-3/4 m-4 flex flex-col  items-center ">
          <h1 className=" -top-5 absolute  w-full text-center md:text-4xl text-3xl">
            LOGIN
          </h1>
          <form className="px-4 w-full flex flex-col space-y-12 mt-16 mb-10  items-center">
            <input
              type="text"
              className={`${inputClassName}`}
              placeholder="Username"
            />
            <input
              type="text"
              className={`${inputClassName}`}
              placeholder="Password"
            />
            <button className="bg-[#7E7C44] hover:bg-[#3f3f1c] duration-200 transition-colors text-center font-semibold w-[40%] text-2xl px-2 py-1 rounded-[10px]">
              Log In
            </button>
          </form>
          <div className="w-11/12 h-[1px] bg-[#3B3B3B] mb-5"></div>
          <Link
            to={'signup'}
            className=" hover:scale-110 duration-200 transition-transform  mb-5 text-center font-semibold w-[40%] text-2xl px-2 py-1 rounded-[10px]"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
