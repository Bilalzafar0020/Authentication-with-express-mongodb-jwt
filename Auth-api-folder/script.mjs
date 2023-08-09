
import express from 'express';

const router = express.Router();

import mainrouter from './Routes/auth.mjs';

router.use('/', mainrouter);

export default router;