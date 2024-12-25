import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Insights from "@/components/Tables/Insights";

// export const metadata: Metadata = {
//   title:
//     "JHPPI ADMIN | | Dashboard",
//   description: "JHPPI ADMIN",
// };

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <div className="h-screen">
          <Insights />
        </div>
      </DefaultLayout>
    </>
  );
}
