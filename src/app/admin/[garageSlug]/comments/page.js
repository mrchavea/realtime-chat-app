import { getGarageComments } from "@/services/garage";
import CommentsSection from "@/components/CommentsSection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getAdminByEmail } from "@/repositories/admin";
import { redirect } from "next/navigation";

export default async function AdminGarageCommentsPage({ params }) {
  const { garageSlug } = params;
  const session = await getServerSession(authOptions);
  const admin = await getAdminByEmail(session.user.email);
  if (!admin || admin?.garageId != garageSlug) redirect("/not-authorized");
  const comments = await getGarageComments(garageSlug);
  return (
    <>
      <main className="mt-5">
        <CommentsSection comments={comments} admin={session.user} />
      </main>
    </>
  );
}
