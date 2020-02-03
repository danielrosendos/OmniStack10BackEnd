import Dev from '../models/Dev';
import parseStringAsArray from '../utils/parseStringAsArray';

export default {
  async index(req, res) {
    // Buscar Todos os devs num raio de 10km
    // Filtrar Por tech
    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return res.json({ devs });
  },
};
