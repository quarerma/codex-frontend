import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { signupSchema, SignUpSchema } from '../../schemas/signup.schema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignUpSchema) => {
    console.log(data);
    reset();
  };

  const inputClassName =
    'rounded-[10px] w-full px-2 py-1 bg-[#3B3B3B] text-white placeholder:opacity-20 text-2xl border-none focus:outline-none focus:ring-2 focus:ring-[#BD9000] focus:ring-opacity-50';
  return (
    <div className="w-screen h-screen">
      <div className="w-screen text-white bg-[#f7d770] h-[15vh] shadow-inner-custom">
        <h1
          style={{ textShadow: '0px 11px 8.3px rgba(0, 0, 0, 0.25)' }}
          className="lg:text-[100px] h-full md:text-[70px] text-[50px] tracking-[0.3em] font-semibold flex items-center italic justify-center"
        >
          CODEX
        </h1>
      </div>
      <div className="min-h-[85vh] w-screen text-white bg-[#272727] flex  justify-center items-center">
        <div className="bg-[#2C2C2C] relative rounded-[30px] xl:w-[22%] lg:w-[32%] md:w-2/5  sm:w-1/2 w-3/4 m-4 flex flex-col  items-center ">
          <h1 className=" -top-5 absolute  w-full text-center md:text-4xl text-3xl">SIGN-UP</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-4 w-full flex flex-col space-y-12 mt-16 mb-5  items-center"
          >
            <div className="w-full">
              <input type="text" className={`${inputClassName}`} placeholder="Username" {...register('username')} />
              <label className="text-red-500 text-sm">{errors.username?.message}</label>
            </div>
            <div className="w-full">
              <input type="text" className={`${inputClassName}`} placeholder="Email" {...register('email')} />
              <label className="text-red-500 text-sm">{errors.email?.message}</label>
            </div>
            <div className="w-full">
              <input type="text" className={`${inputClassName}`} placeholder="Password" {...register('password')} />
              <label className="text-red-500 text-sm">{errors.password?.message}</label>
            </div>
            <div className="w-full">
              <input
                type="text"
                className={`${inputClassName}`}
                placeholder="Confirm Password"
                {...register('confirmPassword')}
              />
              <label className="text-red-500 text-sm">{errors.confirmPassword?.message}</label>
            </div>

            <button
              type="submit"
              className="bg-[#bd9d33] hover:bg-[#bd91007d] duration-200 transition-colors text-center font-semibold  text-2xl px-2 py-1 rounded-[10px]"
            >
              Create Account
            </button>
          </form>
          <div className="w-11/12 h-[1px] bg-[#3B3B3B] mb-5"></div>
          <div className=" mt-5 mb-10 text-2xl ">
            Already have an account?{' '}
            <Link to={'/login'} className="hover:text-[1.7rem] text-blue-300 duration-200">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
