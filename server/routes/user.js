import express from 'éxpress';

import { dignin, signup } from '../controllers/user.js'

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

export default router;

