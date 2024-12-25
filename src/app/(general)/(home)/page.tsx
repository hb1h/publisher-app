'use client'
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Insights from "@/components/Tables/Insights";
import Landing from "@/components/Landing";
import Auth from "@/components/Auth";

// export const metadata: Metadata = {
//   title:
//     "JHPPI ADMIN | | Dashboard",
//   description: "JHPPI ADMIN",
// };

const Home = () =>  {
  return (
    <>
      {/* <DefaultLayout> */}
        <div className="h-screen">
          {/* <Insights /> */}
          <Landing/>
        </div>
      {/* </DefaultLayout> */}
    </>
  );
}
export default Auth(Home)