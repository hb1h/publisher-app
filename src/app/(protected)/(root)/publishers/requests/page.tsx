import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

// export const metadata: Metadata = {
//   title: "JHPPI ADMIN | Publishers",
//   description:
//     "JHPPI ADMIN",
// };

const Publishers = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Publishers" />

      <div className="flex h-screen w-full flex-col gap-10">
        {/* <TableOne /> */}
        {/* <TableTwo /> */}
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default Publishers;
