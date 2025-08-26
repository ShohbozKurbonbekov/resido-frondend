import { Link } from "react-router-dom";

interface AgentContactProp {
  agentName: string;
  agentPhone: string;
  agentImage: string;
}

export default function AgentContact({
  agentName,
  agentPhone,
  agentImage,
}: AgentContactProp) {
  return (
    <div className="flex flex-col mb-[30px]">
      <div className="rounded-tl-md rounded-tr-md bg-blue-800 py-6 px-5 flex flex-row items-center">
        <div className="h-[60px] w-[15px">
          <img
            src={agentImage}
            alt={agentName}
            className="rounded-full w-ful h-full object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col items-start justify-center ps-5">
          <Link to="#">
            <h4 className="font-bold font-jostFont text-xl text-white capitalize  leading-tight">
              {agentName}
            </h4>
          </Link>
          <p className="text-slate-300 text-base font-light ms-1 font-jostFont">
            {agentPhone}
          </p>
        </div>
      </div>
      <form
        action="#"
        className="py-6 px-5 bg-white flex flex-col items-stretch gap-y-4 rounded-bl-md rounded-br-md"
      >
        {/* // Email */}
        <article className="w-full flex flex-col space-y-1">
          <label
            htmlFor="email"
            className="text-xs text-blue-500 font-semibold font-jostFont capitalize tracking-wide leading-none "
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border-2  rounded-sm  py-3 px-3 bg-sky-50 text-slate-400 font-jostFont text-xs font-semibold ring-blue-500 outline-blue-500"
            placeholder="Your Email"
          />
        </article>
        {/* // Phone number */}
        <article className="w-full flex flex-col space-y-1">
          <label
            htmlFor="phone"
            className="text-xs text-blue-500 font-semibold font-jostFont capitalize tracking-wide leading-none "
          >
            Phone No.
          </label>
          <input
            type="number"
            id="phone"
            className="border-2  rounded-sm  py-3 px-3 bg-sky-50 text-slate-400 font-jostFont text-xs font-semibold ring-blue-500 outline-blue-500"
            placeholder="Your Phone"
          />
        </article>
        {/* // Description */}
        <article className="w-full flex flex-col space-y-1">
          <label
            htmlFor="description"
            className="text-xs text-blue-500 font-semibold font-jostFont capitalize tracking-wide leading-none "
          >
            Description
          </label>
          <textarea
            placeholder="I'm interested in this property."
            rows={7}
            className="focus:ring-blue-500 focus:outline-blue-500 placeholder:font-jostFont placeholder:text-xs bg-sky-50 text-slate-400 tracking-wider focus:text-xs text-xs py-2 p-3 border-2 rounded-sm font-semibold"
            id="description"
          />
        </article>

        <button className="w-full py-[10px] px-[20px] rounded-sm border-2 border-blue-300 text-blue-700 text-sm capitalize bg-blue-100 hover:bg-blue-800 transition-colors duration-200 ease-linear hover:text-white hover:border-transparent font-semibold">
          {" "}
          Send Message
        </button>
      </form>
    </div>
  );
}
