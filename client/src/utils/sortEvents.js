const sortEvents = (events) => {
    return [...events].sort((a, b) => {
        const now = new Date()
        const aDate = new Date(`${a.date} ${a.time}`)
        const bDate = new Date(`${b.date} ${b.time}`)
        const aPast = aDate < now
        const bPast = bDate < now
        if (aPast && !bPast) return 1
        if (!aPast && bPast) return -1
        return aDate - bDate
    })
}

export default sortEvents
