import { Router } from 'express';
import { obtenerZonasRadar } from '../controllers/zonaController';

const router: Router = Router();

router.get('/zonas/radar', obtenerZonasRadar);

export default router;