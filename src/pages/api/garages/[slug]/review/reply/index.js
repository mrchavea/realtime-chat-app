import { getAdminByEmail } from "@/../../src/repositories/admin";
import { GarageCreateCommentReply } from "@/../../src/repositories/garage";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../auth/[...nextauth]";

export default async function POST(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401).json({ message: "You must be logged in." });
      return;
    }

    const replyData = req.body;
    const garageSlug = req.query.slug;

    const admin = await getAdminByEmail(session.user.email);
    const newReply = await GarageCreateCommentReply(
      garageSlug,
      replyData,
      admin
    );

    if (!newReply)
      throw new Error("Lo sentimos, no se ha podido guardar la respuesta");

    res.status(200).json({
      newReply
    });
  } catch (error) {
    console.log("ERR", error);
    res
      .status(500)
      .json({ message: "Ha habido un problema al crear la respuesta" });
  }
}
