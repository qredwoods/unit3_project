import React, { useState, useEffect } from 'react'
import '../css/Event.css'

const Event = ({ id, title, date, time, image }) => {
    const [remaining, setRemaining] = useState('')
    const [isPast, setIsPast] = useState(false)

    useEffect(() => {
        const calculateRemaining = () => {
            const eventDate = new Date(`${date} ${time}`)
            const now = new Date()
            const diff = eventDate - now

            if (diff <= 0) {
                setIsPast(true)
                setRemaining('Event has passed')
                return
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24))
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((diff % (1000 * 60)) / 1000)

            setRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`)
        }

        calculateRemaining()
        const interval = setInterval(calculateRemaining, 1000)
        return () => clearInterval(interval)
    }, [date, time])

    return (
        <article className={`event-information ${isPast ? 'past-event' : ''}`}>
            <img src={image} />

            <div className='event-title-bar'>
                <h3>{title}</h3>
            </div>

            <div className='event-information-overlay'>
                <div className='text'>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {date} <br /> {time}</p>
                    <p className={`countdown ${isPast ? 'past' : ''}`}>{remaining}</p>
                </div>
            </div>
        </article>
    )
}

export default Event
