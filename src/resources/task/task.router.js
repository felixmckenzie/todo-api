import { Router } from 'express'
import controllers from './task.controller'
const router = Router()

// /api/list/:id
router.route('/').get(controllers.getMany).post(controllers.createOne)

// /api/list/:id/task/:id
router
  .route('task/:id')
  .get(controllers.getOne)
  .delete(controllers.removeOne)
  .put(controllers.updateOne)

export default router
