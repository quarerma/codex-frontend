import { Link } from 'react-router-dom';
import { loginschema, LoginSchema } from '../../schemas/login.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginschema),
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
    reset();
  };
  return (
    <div className="w-screen h-screen">
      <div className="w-screen text-primary-foreground  bg-primary h-[15vh] shadow-inner-custom">
        <h1
          style={{ textShadow: '0px 11px 8.3px rgba(0, 0, 0, 0.25)' }}
          className="lg:text-[90px] h-full  text-[70px] tracking-[0.3em] font-semibold flex items-center italic justify-center"
        >
          CODEX
        </h1>
      </div>
      <div className="min-h-[85vh] font-inter w-screen text-foreground bg-[#09090B] flex   justify-center items-center">
        <div className="bg-[#0C0A09] border-2 border-border  relative rounded-[30px] xl:w-3/12 lg:w-1/4 md:w-2/5  sm:w-1/2 w-full m-5  flex flex-col  items-center ">
          <h1 className=" -top-5 absolute  w-full text-center md:text-4xl text-3xl">LOGIN</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-4 w-full flex flex-col space-y-10 mt-16 mb-5  items-center"
          >
            <div className="w-full">
              <Input
                autoComplete="false"
                className="rounded-[15px]"
                type="text"
                placeholder="Username"
                {...register('username')}
              />
              <label className="text-red-500 text-sm">{errors.username?.message}</label>
            </div>
            <div className="w-full">
              <Input type="password" className="rounded-[15px]" placeholder="Email" {...register('password')} />
              <label className="text-red-500 text-sm">{errors.password?.message}</label>
            </div>

            <Button
              type="submit"
              className="font-semibold w-[40%] text-2xl px-2 py-1 rounded-[10px]"
              variant={'default'}
            >
              Log In
            </Button>
          </form>
          <div className="w-11/12 h-[1px] bg-border mb-5"></div>
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
