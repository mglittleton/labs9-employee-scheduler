const express = require('express')
const router = express.Router()
const {
  getOrgs,
  addOrg,
  updateOrg,
  deleteOrg
} = require('../../database/helpers')

router.get('/', (req, res) => {
  getOrgs()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json(err))
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  getOrgs(id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json(err))
})

router.post('/', async (req, res) => {
  const { name } = req.body

  if (!name) {
    res.status(400).json({ error: 'Missing required field "name"' })
  }

  try {
    const success = await addOrg(req.body)
    res.status(201).json(success)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params

  if (!Object.keys(req.body)) {
    res.status(400).json({ error: 'No fields provided to update' })
  }

  try {
    const success = await updateOrg(id, req.body)
    res.status(200).json(success)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const success = await deleteOrg(id)
    res.status(200).json(success)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router