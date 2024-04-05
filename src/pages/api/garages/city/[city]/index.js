import { GaragesFindByCitySlug } from "../../../../../repositories/garage";

export default async function GET(req, res, context) {
  try {
    const city = req.query.city;
    const filter = req.query.filter;
    const offsetPagination = req.query.offsetPagination;
    const garages = await GaragesFindByCitySlug(city, filter, offsetPagination);
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
