import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { signupSchema, SignUpSchema } from '../../schemas/signup.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import LoginSignup from '../../components/login-signup';

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

  return (
    <LoginSignup>
      <h1 className=" -top-5 absolute font-bold  w-full text-center md:text-4xl text-3xl">SIGN-UP</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="px-4 w-full flex flex-col space-y-12 mt-16 mb-5  items-center">
        <div className="w-full">
          <Input type="text" placeholder="Username" className="rounded-[15px]" {...register('username')} />
          <label className="text-red-500 text-sm">{errors.username?.message}</label>
        </div>
        <div className="w-full">
          <Input type="email" placeholder="Email" {...register('email')} className="rounded-[15px]" />
          <label className="text-red-500 text-sm">{errors.email?.message}</label>
        </div>
        <div className="w-full">
          <Input type="text" placeholder="Password" className="rounded-[15px]" {...register('password')} />
          <label className="text-red-500 text-sm">{errors.password?.message}</label>
        </div>
        <div className="w-full">
          <Input
            type="text"
            placeholder="Confirm Password"
            className="rounded-[15px]"
            {...register('confirmPassword')}
          />
          <label className="text-red-500 text-sm">{errors.confirmPassword?.message}</label>
        </div>

        <Button type="submit" className="font-semibold  text-2xl px-2 py-1 rounded-[10px]">
          Create Account
        </Button>
      </form>
      <div className="w-11/12 h-[1px] bg-[#3B3B3B] mb-5"></div>
      <div className=" mt-5 mb-10 text-lg md:text-xl ">
        Already have an account?{' '}
        <Link to={'/login'} className="hover:text-[1.2rem] md:hover:text-[1.5rem]  text-blue-300 duration-200">
          Login
        </Link>
      </div>
    </LoginSignup>
  );
}
