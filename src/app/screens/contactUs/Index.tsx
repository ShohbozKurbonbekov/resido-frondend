import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import MainContent from "./MainContent";
import type { Dispatch } from "@reduxjs/toolkit";
import { setAdminData } from "./slice";
import type { User } from "@/lib/type/dashboard/user";
import { createSelector } from "reselect";
import { retrieveContactUsPage } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DetailPageLoading from "@/app/components/loading/DetailPageLoading";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import MemberService from "@/app/services/MemberService";
// ---------------------------------------------- REDUX INTEGRATION ---------------------------------------
const contactUsPageDispatch = (dispatch: Dispatch) => ({
  setContactUsPage: (data: User) => dispatch(setAdminData(data)),
});

const contactUsPageRetriever = createSelector(
  retrieveContactUsPage,
  (contactUsPage) => ({ contactUsPage })
);

// ---------------------------------------------- COMPONENT ---------------------------------------

export default function ContactUsPage() {
  const { setContactUsPage } = contactUsPageDispatch(useDispatch());
  const { contactUsPage } = useSelector(contactUsPageRetriever);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const member = new MemberService();
      try {
        const result = await member.getAdmin();
        setContactUsPage(result);
      } catch (error) {
        console.log("Error in getting admin data: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ---------------------------------------------- RENDER ---------------------------------------
  return loading || !contactUsPage.adminData ? (
    <DetailPageLoading />
  ) : (
    <>
      <SectionIntroNoBackground
        title={"Contact us"}
        subtitle={"Leave a message for us, we will try to reach then"}
      />
      <MainContent adminData={contactUsPage.adminData} />
    </>
  );
}
