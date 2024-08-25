import { Link, useNavigate } from 'react-router-dom';
import { loginschema, LoginSchema } from '../../schemas/login.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import LoginSignup from '../../components/global/login-signup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { login } from '../../api/auth/authorization';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';

export default function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const jwt = Cookies.get('jwt');
    if (jwt) {
      navigate('/');
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginschema),
  });

  const [loading, setLoading] = useState(false);
  const [loginError, setError] = useState('');
  const [cookie, setCookie] = useCookies(['jwt']);

  const onSubmit = async (data: LoginSchema) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await login(data);
      // 4 seconds delay
      setCookie('jwt', response.data, {
        path: '/',
        secure: true,
      });
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError('Invalid username or password');
          console.log(loginError);
        }
      }
    }
    reset();
    cookie.jwt;
    setLoading(false);
    navigate('/');
  };

  return (
    <LoginSignup>
      <h1 className=" -top-5 absolute font-bold w-full text-center md:text-4xl text-3xl">LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="px-4 w-full flex flex-col space-y-10 mt-16 mb-5  items-center">
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

        {loading ? (
          <div className="w-full h-10 flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#3B3B3B]"></div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-y-4">
            <Button
              type="submit"
              className="font-semibold w-[40%] text-2xl px-2 py-1 rounded-[10px]"
              variant={'default'}
            >
              Log In
            </Button>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
          </div>
        )}
      </form>
      <div className="w-11/12 h-[1px] bg-border mb-5"></div>
      <Link
        to={'/signup'}
        className=" hover:scale-110 duration-200 transition-transform  mb-5 text-center font-semibold w-[40%] text-2xl px-2 py-1 rounded-[10px]"
      >
        Sign Up
      </Link>
    </LoginSignup>
  );
}
