import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EmbedCode from "@/components/Embeded/EmbedCode";

// export const metadata: Metadata = {
//   title:
//     "JHPPI ADMIN | | Generate Code",
//   description: "JHPPI ADMIN",
// };

export default function Home() {
  return (
    <>
      <DefaultLayout><EmbedCode /></DefaultLayout>
    </>
  );
}
