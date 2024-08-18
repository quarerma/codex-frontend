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
          <h1 className=" -top-5 absolute  w-full text-center md:text-4xl text-3xl">SIGN-UP</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-4 w-full flex flex-col space-y-12 mt-16 mb-10  items-center"
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
              className="bg-[#BD9000] hover:bg-[#bd91007d] duration-200 transition-colors text-center font-semibold  text-2xl px-2 py-1 rounded-[10px]"
            >
              Create Account
            </button>
          </form>
          <Link to={'/login'} className="mb-5 -mt-5 text-xl hover:scale-110 duration-200">
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}
