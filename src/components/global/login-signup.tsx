export default function LoginSignup({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-screen min-h-screen ">
      <div className="max-w-screen text-primary-foreground  bg-primary h-[15vh] shadow-inner-custom">
        <h1
          style={{ textShadow: '0px 11px 8.3px rgba(0, 0, 0, 0.25)' }}
          className="lg:text-[90px] h-full  text-[70px] tracking-[0.3em] font-semibold flex items-center italic justify-center"
        >
          CODEX
        </h1>
      </div>
      <div className="min-h-[85vh] py-10 max-w-screen  font-oswald text-white bg-dark-bg flex  justify-center items-center">
        <div className="bg-dark-bg-secondary border-4 border-border  relative rounded-[30px] xl:w-[27%] lg:w-[32%] md:w-2/5  sm:w-1/2 w-full m-4 flex flex-col  items-center ">
          {children}
        </div>
      </div>
    </div>
  );
}
