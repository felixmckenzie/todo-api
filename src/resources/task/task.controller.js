import { Task } from './task.model'
import { List } from '../list/list.model'

export const getOne = (model) => async (req, res) => {
  try {
    const doc = await model
      .findOne({ createdBy: req.user._id, _id: req.params.task_id })
      .lean()
      .exec()
    if (!doc) {
      return res.status(400).end()
    }
    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const getMany = (model) => async (req, res) => {
  try {
    const docs = await model
      .find({
        createdBy: req.user._id,
      })
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
}

export const createOne = (model) => async (req, res) => {
  const createdBy = req.user._id
  const listId = req.params.listId
  try {
    const doc = await model.create({ ...req.body, createdBy, listId })
    await List.findByIdAndUpdate(listId, { $push: { tasks: doc } }, {new:true})
    res.status(201).json({ data: doc })
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
}

export const updateOne = (model) => async (req, res) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          createdBy: req.user._id,
          _id: req.params.id,
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec()
    if (!updatedDoc) {
      return res.status(400).end()
    }
    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
}

export const removeOne = (model) => async (req, res) => {
  try {
    const removed = await model.findOneAndRemove({
      createdBy: req.user._id,
      _id: req.params.task_id,
    })
    if (!removed) {
      return res.status(400).end()
    }

    const listToUpdate = await List.findById(req.params.list_id)
    await listToUpdate.tasks.id(req.params.task_id).remove()
    await listToUpdate.save()
    return res.status(200).json({ data: removed })
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
}

export const crudControllers = (model) => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
})

export default crudControllers(Task)
