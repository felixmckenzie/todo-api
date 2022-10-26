import { Router } from 'express'
import controllers from './task.controller'
const router = Router()

// /api/list/:id
router.route('/:listId').get(controllers.getMany).post(controllers.createOne)

// /api/list/:list_id/task/:task_id
router
  .route('/:listId/task/:taskId')
  .get(controllers.getOne)
  .delete(controllers.removeOne)
  .put(controllers.updateOne)

export default router
