import React, { useEffect, useState } from 'react'
import db from '../db'
import Table from 'react-bootstrap/Table';
import Event from './Event'

export default function Home() {

  const [events, setEvents] = useState([])

  useEffect(() => (async () => setEvents(await db.Events.findAll()))(), [])

  return (
    <>
      <h1>Events</h1>
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Genre</th>
            <th>Venue</th>
          </tr>
        </thead>
        <tbody>
          {
            events.filter(e => e.enddate >= new Date()).map(event => <Event key={event.id} event={event} />)
          }
        </tbody>
      </Table>
    </>
  )
}