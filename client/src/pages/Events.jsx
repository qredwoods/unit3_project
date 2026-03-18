import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import sortEvents from '../utils/sortEvents'
import '../css/LocationEvents.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])
    const [filterLocation, setFilterLocation] = useState('')
    const [filterDate, setFilterDate] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const eventsData = await EventsAPI.getAllEvents()
                setEvents(eventsData)
                const locationsData = await LocationsAPI.getAllLocations()
                setLocations(locationsData)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])

    const dates = [...new Set(events.map(e => e.date))].sort()

    const filteredEvents = sortEvents(
        events
            .filter(e => filterLocation ? e.location_id === parseInt(filterLocation) : true)
            .filter(e => filterDate ? e.date === filterDate : true)
    )

    return (
        <div className='location-events'>
            <header>
                <div className='location-info'>
                    <h2>All Events</h2>
                    <div className='filters'>
                        <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}>
                            <option value=''>All Locations</option>
                            {locations.map(loc => (
                                <option key={loc.id} value={loc.id}>{loc.name}</option>
                            ))}
                        </select>
                        <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
                            <option value=''>All Days</option>
                            {dates.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </header>

            <main>
                {
                    filteredEvents && filteredEvents.length > 0 ? filteredEvents.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> No events found!</h2>
                }
            </main>
        </div>
    )
}

export default Events
