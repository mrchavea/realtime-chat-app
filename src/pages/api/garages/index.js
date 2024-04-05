import { GarageFindAll } from "../../../repositories/garage";

export default async function GET(req, res) {
  const filter = req.query?.filter ?? null;
  const query = req.query?.query ?? null;
  const limit = req.query?.limit;

  console.log("QUERIES", query, filter);

  try {
    const garages = await GarageFindAll(query, filter);

    if (!garages) {
      return res.status(404).json({
        error: "No se han podido recuperar los talleres"
      });
    }

    res.status(200).json({
      garages: garages
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message ?? "Ha habido un problema al recuperar los talleres"
    });
  }
}
