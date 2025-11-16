import { defaultUserAvatar, ErrorMessages, serverAPI } from "@/lib/config";
import {} from "@/lib/enums/mesage.enum";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";
import type { AgentData } from "@/lib/type/agent";
import type { MessageInput } from "@/lib/type/message";
import React, { useCallback, useState } from "react";
import MemberService from "../services/MemberService";
import { useGlobals } from "../hooks/useGlobals";

// ----------------------------------------- COMMON CLASSES ----------------------------------
const articleClass = "w-full flex flex-col space-y-1";
const textClasses =
  "text-xs text-blue-500 font-semibold font-jostFont capitalize tracking-wide leading-none";
const inputClasses =
  "border-2  rounded-sm  py-3 px-3 bg-sky-50 text-slate-600 font-jostFont text-xs font-semibold ring-blue-500 outline-blue-500";
// ------------------------------------------------ COMPONENT ------------------------------------------------
interface AgentContactProp {
  agentData: AgentData;
}
const initialState = {
  content: "",
  email: "",
  phone: "",
  subject: "",
};
const AgentContact: React.FC<AgentContactProp> = React.memo(({ agentData }) => {
  const { authmember } = useGlobals();
  const [messageInput, setMessageInput] = useState<MessageInput>(initialState);

  const { avatar, nickname, fullName, phone } = agentData;
  const imgUrl = avatar ? `${serverAPI}/${avatar}` : defaultUserAvatar;
  // ------------------------------------------ HANDLERS ---------------------------------------------------
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const isValid = Object.values(messageInput).every(
          (value: string) => value.trim() !== ""
        );
        if (!isValid) {
          throw new Error(ErrorMessages.error3);
        }

        const input: MessageInput = {
          content: messageInput.content.trim(),
          subject: messageInput.subject.trim(),
          phone: messageInput.phone.trim(),
          email: messageInput.email.trim(),
          receiverId: agentData?._id,
          receiverType: agentData?.role,
          senderType: authmember?.role,
        };

        const member = new MemberService();
        await member.writeMessageMember(input);
        await sweetTopSmallSuccessAlert("Sent succussfully");
        setMessageInput(initialState);
      } catch (error) {
        console.log("Error in AgentContact: ", error);
        await sweetErrorHandling(error!);
      }
    },
    [authmember?.role, messageInput, agentData]
  );

  const handleEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value;
    setMessageInput((prev) => ({ ...prev, email: emailInput }));
  }, []);

  const handlePhone = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneInput = e.target.value;
    setMessageInput((prev) => ({ ...prev, phone: phoneInput }));
  }, []);

  const handleContent = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const contentInput = e.target.value;
      setMessageInput((prev) => ({ ...prev, content: contentInput }));
    },
    []
  );

  const handleSubject = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const subjectInput = e.target.value;
      setMessageInput((prev) => ({ ...prev, subject: subjectInput }));
    },
    []
  );

  // ------------------------------------------ RENDER ---------------------------------------------------
  return (
    <div className="flex flex-col mb-7">
      <div className="rounded-tl-md rounded-tr-md bg-blue-800 py-6 px-5 flex flex-row items-center">
        <div className="h-16 w-16">
          <img
            src={imgUrl}
            alt={nickname || "agent image"}
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col items-start justify-center ps-5">
          <h4 className="font-bold font-jostFont text-xl text-white capitalize  leading-tight">
            {fullName || nickname}
          </h4>

          <p className="text-slate-300 text-base font-light ms-1 font-jostFont">
            {phone || "N/A"}
          </p>
        </div>
      </div>
      <form
        className="py-6 px-5 bg-white flex flex-col items-stretch gap-y-4 rounded-bl-md rounded-br-md"
        onSubmit={handleSubmit}
      >
        {/* // EMAIL */}
        <article className={articleClass}>
          <label htmlFor="email" className={textClasses}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={inputClasses}
            placeholder="Your Email..."
            onChange={handleEmail}
            value={messageInput.email}
          />
        </article>
        {/* // Phone number */}
        <article className={articleClass}>
          <label htmlFor="phone" className={textClasses}>
            Phone No.
          </label>
          <input
            type="tel"
            id="phone"
            className={inputClasses}
            placeholder="Your Phone..."
            value={messageInput.phone}
            onChange={handlePhone}
          />
        </article>
        {/* subject*/}
        <article className={articleClass}>
          <label htmlFor="subject" className={textClasses}>
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className={inputClasses}
            placeholder="Subject name...."
            value={messageInput.subject}
            onChange={handleSubject}
          />
        </article>
        {/* // Description */}
        <article className={articleClass}>
          <label htmlFor="description" className={textClasses}>
            Description
          </label>
          <textarea
            placeholder="I'm interested in this property..."
            rows={7}
            className="focus:ring-blue-500 focus:outline-blue-500 font-jostFont  bg-sky-50 text-slate-600 tracking-wider  text-sm py-2 p-3 border-2 rounded-sm font-semibold"
            id="description"
            value={messageInput.content}
            onChange={handleContent}
          />
        </article>

        <button className="w-full py-2.5 px-5 rounded-sm border-2 border-blue-300 text-blue-700 text-sm capitalize bg-blue-100 hover:bg-blue-800 transition-all duration-200 ease-linear hover:text-white hover:border-transparent font-semibold actice:scale-95">
          Send Message
        </button>
      </form>
    </div>
  );
});

export default AgentContact;
