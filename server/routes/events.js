import express from 'express'
import EventsController from '../controllers/events.js'

const router = express.Router()

router.get('/events', EventsController.getEvents)
router.get('/events/:id', EventsController.getEventById)
router.get('/events/location/:location_id', EventsController.getEventsByLocation)

export default router
