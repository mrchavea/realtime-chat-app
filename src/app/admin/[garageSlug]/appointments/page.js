import { getGarage } from "@/services/garage";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getAdminByEmail } from "@/repositories/admin";
import { redirect } from "next/navigation";
import WIPAnimation from "../WIPAnimation";

export default async function AdminGaragePage({ params }) {
  const { garageSlug } = params;
  const session = await getServerSession(authOptions);
  const admin = await getAdminByEmail(session.user.email);
  if (!admin || admin?.garageId != garageSlug) redirect("/not-authorized");
  const garage = await getGarage(garageSlug);
  if (!garage) notFound();
  return (
    <>
      <main className="h-[50vh] flex justify-center items-center">
        <WIPAnimation />
      </main>
    </>
  );
}
