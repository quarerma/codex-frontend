import { Link } from 'react-router-dom';
import { loginschema, LoginSchema } from '../../schemas/login.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginschema),
  });

  const inputClassName =
    'rounded-[10px] w-full px-2 py-1 bg-[#3B3B3B] text-white placeholder:opacity-20 text-2xl border-none focus:outline-none focus:ring-2 focus:ring-[#BD9000] focus:ring-opacity-50';

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
    reset();
  };
  return (
    <div className="w-screen h-screen">
      <div className="w-screen text-white   text-center flex items-center justify-center bg-[#BD9000] h-[15vh] shadow-inner-custom ">
        <h1
          style={{ textShadow: '0px 11px 8.3px rgba(0, 0, 0, 0.25)' }}
          className="lg:text-[100px] md:text-[70px] text-[50px] tracking-[0.5em] italic font-semibold"
        >
          CODEX
        </h1>
      </div>
      <div className="min-h-[85vh] w-screen text-white bg-[#2C2C2C] flex  justify-center items-center">
        <div className="bg-[#272727] relative rounded-[30px] xl:w-3/12 lg:w-1/4 md:w-2/5  sm:w-1/2 w-3/4 m-4 flex flex-col  items-center ">
          <h1 className=" -top-5 absolute  w-full text-center md:text-4xl text-3xl">LOGIN</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-4 w-full flex flex-col space-y-12 mt-16 mb-10  items-center"
          >
            <div className="w-full">
              <input type="text" className={`${inputClassName}`} placeholder="Username" {...register('username')} />
              <label className="text-red-500 text-sm">{errors.username?.message}</label>
            </div>
            <div className="w-full">
              <input type="text" className={`${inputClassName}`} placeholder="Email" {...register('password')} />
              <label className="text-red-500 text-sm">{errors.password?.message}</label>
            </div>

            <button
              type="submit"
              className="bg-[#BD9000] hover:bg-[#bd91007d] duration-200 transition-colors text-center font-semibold w-[40%] text-2xl px-2 py-1 rounded-[10px]"
            >
              Log In
            </button>
          </form>
          <div className="w-11/12 h-[1px] bg-[#3B3B3B] mb-5"></div>
          <Link
            to={'/signup'}
            className=" hover:scale-110 duration-200 transition-transform  mb-5 text-center font-semibold w-[40%] text-2xl px-2 py-1 rounded-[10px]"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
