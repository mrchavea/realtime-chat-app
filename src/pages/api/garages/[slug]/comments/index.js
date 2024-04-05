import {
  GarageGetCommentsIfAny,
  organizeCommentsAndReplies
} from "../../../../../repositories/garage";
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function GET(req, res, context) {
  try {
    const slug = req.query.slug;
    console.log("slug", slug, req.query);

    let comments = await GarageGetCommentsIfAny(slug);
    if (!comments) {
      return res.status(404).json({
        error: "No se han podido recuperar los comentarios"
      });
    }

    comments = organizeCommentsAndReplies(comments);

    // revalidatePath("/admin/[garageSlug]/comments");
    // revalidateTag("comments");

    res.status(200).json({
      comments: comments
    });
  } catch (error) {
    console.log("REVAL ERR", error);
    res.status(500).json({
      message:
        error.message ?? "Ha habido un problema al recuperar los comentarios"
    });
  }
}
