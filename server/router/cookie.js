import { Router } from 'express';

const router = Router();

router.get('/set-cookie', (req, res) => {
  res.cookie('login_token', 'sample_token', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  res.send('Cookie set');
});

export default router;