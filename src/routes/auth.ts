import {Router} from 'express';
const router: Router = Router();
import { signUp, signIn, profile } from '../controllers/auth.controller';

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', profile);

export default router;