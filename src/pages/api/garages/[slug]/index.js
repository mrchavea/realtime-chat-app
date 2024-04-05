import { GarageFindBySlug } from "../../../../repositories/garage";

export default async function GET(req, res, context) {
  try {
    const slug = req.query.slug;
    const garage = await GarageFindBySlug(slug);
    if (!garage) {
      return res.status(404).json({
        error: "No se han podido recuperar el taller"
      });
    }

    res.status(200).json(garage);
  } catch (error) {
    res
      .status(500)
      .json({
        message: error.message ?? "Ha habido un problema al recuperar el taller"
      });
  }
}
