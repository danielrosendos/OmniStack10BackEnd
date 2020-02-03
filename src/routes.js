import { Router } from 'express';
import DevController from './controllers/DevController';
import SearchController from './controllers/SearchController';

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs', DevController.updateUser);
routes.delete('/devs', DevController.deleteUser);

routes.get('/search', SearchController.index);

export default routes;
