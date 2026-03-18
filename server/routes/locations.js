import express from 'express'
import LocationsController from '../controllers/locations.js'

const router = express.Router()

router.get('/locations', LocationsController.getLocations)
router.get('/locations/:id', LocationsController.getLocationById)

export default router
