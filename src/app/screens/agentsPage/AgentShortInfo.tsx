import type { Agent } from "@/lib/type/agent";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

interface AgentShortInfoProp {
  agent: Agent;
}

export default function AgentShortInfo({ agent }: AgentShortInfoProp) {
  return (
    <section className="agent-shortInfo bg-sky-100 pt-0 pb-14">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-[min(19.3vw,288.500px)_1fr] lg:gap-x-[40px] grid-cols-1 box-border bg-white rounded-md -mt-10  relative z-10">
          <div className="p-4">
            <img
              src={agent?.agentImage}
              alt={agent?.agentName}
              className="w-full h-full rounded-md object-cover"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-y-2 py-5 px-10 lg:p-[30px_20px_20px_0]">
            {/* Agent name */}
            <div className="flex flex-col items-start space-y-1">
              <h4 className="font-bold text-darkBlue font-jostFont capitalize text-lg">
                {agent?.agentName}
              </h4>
              <span className="text-size_15 text-slate-400 font-light font-jostFont ps-1">
                {agent?.agentLocation}
              </span>
            </div>

            {/* Agent Description */}
            <p className="leading-7 text-slate-400 text-size_15 font-jostFont">
              {agent?.agentDescription}
            </p>

            {/* Agent Property Amount */}
            <div className="py-1 px-4 bg-green-600 text-white text-size_10 font-jostFont rounded-sm">
              {agent?.agentProperties} Properties
            </div>

            {/* Social contacts */}
            <ul className="list-none flex flex-row gap-x-[10px] items-center justify-start my-2">
              <li>
                <a href={agent?.agentContacts?.facebook}>
                  <Facebook className="w-[15px] h-[15px] fill-black stroke-transparent box-content p-2 bg-sky-100 rounded-full hover:fill-blue-600 transition-colors duration-200 ease-linear border " />
                </a>
              </li>
              <li>
                <a href={agent?.agentContacts?.twitter}>
                  <Twitter className="w-[15px] h-[15px] fill-black stroke-transparent box-content p-2 bg-sky-100 rounded-full hover:fill-blue-600 transition-colors duration-200 ease-linear border " />
                </a>
              </li>
              <li>
                <a href={agent?.agentContacts?.instagram}>
                  <Instagram className="w-[15px] h-[15px] fill-black stroke-white box-content p-2 bg-sky-100 rounded-full hover:fill-blue-600 transition-colors duration-200 ease-linear border " />
                </a>
              </li>
              <li>
                <a href={agent?.agentContacts?.linkedin}>
                  <Linkedin className="w-[15px] h-[15px] fill-black stroke-white box-content p-2 bg-sky-100 rounded-full hover:fill-blue-600 transition-colors duration-200 ease-linear border " />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
