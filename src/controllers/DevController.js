import axios from 'axios';
import Dev from '../models/Dev';
import parseStringAsArray from '../utils/parseStringAsArray';

export default {
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },
  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    if (await Dev.findOne({ github_username }))
      return response.json({ message: 'Usuário Já Cadastrado' }).status(401);

    const res = await axios.get(
      `https://api.github.com/users/${github_username}`
    );

    const { name = login, avatar_url, bio } = res.data;

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location,
    });

    return response.json(dev);
  },

  // Criar o updtade e destroy
};
