import 'dotenv/config'

import { pool } from './database.js'

const createTables = async () => {
    const createLocationsTable = `
        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255),
            city VARCHAR(255),
            state VARCHAR(50),
            zip VARCHAR(10),
            image VARCHAR(500)
        )
    `

    const createEventsTable = `
        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date VARCHAR(100),
            time VARCHAR(100),
            image VARCHAR(500),
            location_id INTEGER REFERENCES locations(id)
        )
    `

    try {
        await pool.query(createLocationsTable)
        await pool.query(createEventsTable)

        await pool.query('DROP TABLE IF EXISTS events')
        await pool.query('DROP TABLE IF EXISTS locations')
        await pool.query(createLocationsTable)
        await pool.query(createEventsTable)

        const locations = [
            ['The Live Hub', '100 CodePath Way', 'San Francisco', 'CA', '94105', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'],
            ['Liz Penny Auditorium', '200 CodePath Way', 'San Francisco', 'CA', '94105', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800'],
            ['Jason Wodicka Hall', '300 CodePath Way', 'San Francisco', 'CA', '94105', 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800'],
            ['Turing-103', '400 CodePath Way', 'San Francisco', 'CA', '94105', 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800']
        ]

        for (const loc of locations) {
            await pool.query(
                'INSERT INTO locations (name, address, city, state, zip, image) VALUES ($1, $2, $3, $4, $5, $6)',
                loc
            )
        }

        const events = [
            ['Pre-Conference Meetup: Meet Your Fellow Graders', 'March 15, 2026', '6:00 PM', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800', 1],
            ['Organizer Planning Meeting', 'March 16, 2026', '9:00 AM', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800', 2],
            ['Why Is It Always CORS?', 'March 20, 2026', '10:00 AM', 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800', 1],
            ['Rubber Duck Debugging Circle', 'March 20, 2026', '2:00 PM', 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800', 1],
            ['Office Hours: Bring Your Worst Bugs', 'March 21, 2026', '11:00 AM', 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800', 1],

            ['It Works On My Machine: A Memoir', 'March 20, 2026', '9:00 AM', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800', 2],
            ['Imposter Syndrome Is a Feature, Not a Bug', 'March 20, 2026', '1:00 PM', 'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=800', 2],
            ['Why Some Students Always Submit Late', 'March 21, 2026', '3:00 PM', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800', 2],

            ['Git Push --force and Pray Workshop', 'March 20, 2026', '11:00 AM', 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800', 3],
            ['They Said There\'d Be Jobs', 'March 21, 2026', '10:00 AM', 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800', 3],
            ['Python Slices: The Best Pizzas for 2am Debugging', 'March 21, 2026', '2:00 AM', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800', 3],

            ['404: Motivation Not Found Support Group', 'March 20, 2026', '3:00 PM', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800', 4],
            ['Recursion: See Recursion', 'March 20, 2026', '5:00 PM', 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800', 4],
            ['Big O Notation: Why Your For Loop Is Crying', 'March 21, 2026', '9:00 AM', 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=800', 4]
        ]

        for (const event of events) {
            await pool.query(
                'INSERT INTO events (title, date, time, image, location_id) VALUES ($1, $2, $3, $4, $5)',
                event
            )
        }

        console.log('Tables created and seeded successfully!')
    } catch (error) {
        console.error('Error creating tables:', error)
    } finally {
        pool.end()
    }
}

createTables()
