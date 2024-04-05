import { NextResponse } from "next/server";
import {getUserByEmail} from "@/../../src/repositories/user"
import {GarageCreateReview} from "@/../../src/repositories/garage"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../auth/[...nextauth]";

export default async function POST(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      res.status(401).json({ message: "You must be logged in." });
      return;
    }    

    const reviewData = req.body
    const garageSlug = req.query.slug

    const user = await getUserByEmail(session.user.email)
    const newReview = await GarageCreateReview(garageSlug, reviewData, user)

    if(!newReview) throw new Error("Lo sentimos, no se ha podido guardar la opinión")

    res.status(200).json({
      newReview
    },)

  } catch (error) {
    console.log("ERR", error)
    res.status(500).json({message:"Ha habido un problema al crear la opinión"})
  }
}
