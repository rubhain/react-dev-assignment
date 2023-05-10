import express from 'express';
import MessageResponse from '../interfaces/MessageResponse';
import companies from './companies/companies.route'

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/companies', companies)

export default router;
