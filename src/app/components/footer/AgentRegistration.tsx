import SignUp from "../Signup";

export default function AgentRegistration() {
  return (
    <section className="py-[50px] bg-blue-500 flex flex-row justify-center">
      <div className="container flex flex-row justify-between items-center">
        <div className="flex  flex-col font-jostFont text-slate-50">
          <h3 className="text-2xl leading-[1.2] capitalize font-bold">
            Want to become a real estate agent
          </h3>
          <p className="text-slate-200 font-jostFont text-sm">
            We'll help you to grow your career and growth
          </p>
        </div>

        <div>
          <SignUp
            btnTitle={"Signup Today"}
            btnClasses={
              "py-3 px-7 text-darkBlue font-jostFont text-xs font-bold bg-slate-50 rounded-3xl shadow-[0_0_0.1rem_0.2rem_#fff3] cursor-pointer hover:scale-95 transition-all duration-200 ease-in-out hover:no-underline"
            }
          />
        </div>
      </div>
    </section>
  );
}
