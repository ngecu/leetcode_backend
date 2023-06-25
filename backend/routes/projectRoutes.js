import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByUser
} from '../controllers/projectControllers.js';

const router = express.Router();

router.route('/').get(getProjects).post(createProject);
router.route('/:id').get(getProjectById).put(updateProject).delete(deleteProject);
router.route('/user/:userId').get(getProjectsByUser);
export default router;
