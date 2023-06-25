import express from 'express';
import {
  getGenderData,
  getGenderDistribution
} from '../controllers/dataControllers.js';


const router = express.Router();

router.route('/gender').get(getGenderData);
router.route('/genderDistribution').get(getGenderDistribution);

export default router;
