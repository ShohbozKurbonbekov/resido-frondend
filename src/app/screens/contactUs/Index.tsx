import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import type { contactDataType } from "@/lib/type/contact-us";
import MainContent from "./MainContent";
import type { Dispatch } from "@reduxjs/toolkit";
import { setAdminData } from "../pricing/slice";
import type { User } from "@/lib/type/dashboard/user";
import { createSelector } from "reselect";
import { retrieveContactUsPage } from "../pricing/selector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// ---------------------------------------------- REDUX INTEGRATION ---------------------------------------
const contactUsPageDispatch = (dispatch: Dispatch) => ({
  setContactUsPage: (data: User) => dispatch(setAdminData(data)),
});

const contactUsPageRetriever = createSelector(
  retrieveContactUsPage,
  (contactUsPage) => ({ contactUsPage })
);

export const contactData: contactDataType = {
  phone1: "+82-10-1234-5678",
  phone2: "+82-10-1234-5678",
  email: "support@realestate.com",
  address: "123 Gangnam-daero, Seoul, South Korea",
};

export default function ContactUsPage() {
  const { setContactUsPage } = contactUsPageDispatch(useDispatch());
  const { contactUsPage } = useSelector(contactUsPageRetriever);

  return (
    <>
      <SectionIntroNoBackground
        title={"Contact us"}
        subtitle={"Leave a message for us, we will try to reach then"}
      />
      <MainContent contactData={contactData} />
    </>
  );
}
