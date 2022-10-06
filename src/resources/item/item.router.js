import { Router } from 'express'
import { controllers } from './item.controller'
const router = Router()

// /api/item
router.route('/').get(controllers.getMany).post(controllers.createOne)

// /api/item/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .delete(controllers.removeOne)
  .put(controllers.updateOne)

export default router
