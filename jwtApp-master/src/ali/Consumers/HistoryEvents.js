import React, {useContext, useEffect, useState } from 'react'

import db from '../../db'
import Table from 'react-bootstrap/Table';
import PastEnt from '../Marketing/PastEnt';

import UserContext from '../../UserContext'
export default function Historys() {

    
  const [historyevents, setHistoryEvents] = useState([])
  

  const { user } = useContext(UserContext)
  const userxid = user && user.id

  useEffect(() => (async () => setHistoryEvents(await db.Historyevent.findAll()))(), [])

  


  return (
    
    <>
    <br></br>
      <h1 className='display-4'>Your History Page</h1>
      <p className='lead'>Keep track of all the events you have recently visited</p>
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
            historyevents.filter(pastet => pastet.userid === userxid).map(pastet => <PastEnt key={pastet.id} pastet={pastet} />)
          }
        </tbody>
      </Table>
    </>
  )
}