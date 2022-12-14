import { List } from './list.model'

export const getOne = (model) => async (req, res) => {
  try {
    const doc = await model
      .findOne({
        createdBy: req.user.id,
        _id: req.params.id,
      })
      .populate('tasks')
      .lean()
      .exec()
    if (!doc) {
      return res.status(400).end()
    }

    res.status(200).json(doc)
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
}

export const getMany = (model) => async (req, res) => {
  try {
    const docs = await model
      .find({
        createdBy: req.user.id,
      }).populate('tasks')
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
  try {
    const doc = await model.create({ ...req.body, createdBy })
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
    try{
        const removed = await model.findOneAndRemove({
            createdBy: req.user._id,
            _id: req.params.id
        })
        if(!removed){
            return res.status(400).end()
        }
        return res.status(200).json({data: removed})
    } catch(e){
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

export default crudControllers(List)
