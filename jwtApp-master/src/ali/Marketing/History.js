import React, {useEffect, useState } from 'react'

import db from '../../db'
import Table from 'react-bootstrap/Table';
import PastEnt from './PastEnt';
import PastPerf from './PastPerf';

export default function Historys() {

    
  const [historyevents, setHistoryEvents] = useState([])
  const [historyperformers, setHistoryPerformers] = useState([])

 

  useEffect(() => (async () => setHistoryEvents(await db.Historyevent.findAll()))(), [])

  useEffect(() => (async () => setHistoryPerformers(await db.Historyperformer.findAll()))(), [])


  return (
    
    <>
      <h1>Historys Page</h1>
      <p>Stay Informed by keeping track of what our customers visit in order to provide customer personalized recommendations.</p>
      
      <h4>Recently Viewed Artists</h4>
      <Table striped hover variant="light" size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Image</th>
            <th>ViewAmount</th>
            <th>Viewed By</th>
          </tr>
        </thead>
        <tbody>
         
          {
            historyperformers.map(pastpf => <PastPerf key={pastpf.id} pastpf={pastpf} />)
          }
        </tbody>
      </Table>

      <h4>Recently Viewed Events</h4>
      <Table striped hover variant="light" size="sm">
        <thead>
          <tr>
          <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Genre</th>
            <th>Venue</th>
            <th>Viewed By</th>
          </tr>
        </thead>
        <tbody>
          {
            historyevents.map(pastet => <PastEnt key={pastet.id} pastet={pastet} />)
          }
        </tbody>
      </Table>
    </>
  )
}