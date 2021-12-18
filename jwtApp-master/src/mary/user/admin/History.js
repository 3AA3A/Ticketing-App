import React, { useEffect, useState } from 'react'
import db from '../../../db'
import Hist from './Hist'
import { Button, Table } from 'react-bootstrap';

export default function History() {

  const [historyEvent, setHistoryEvent] = useState([])
  useEffect(() => (async () => setHistoryEvent(await db.Historyevent.findAll()))(), [])

  const removeAll = () => historyEvent.map(event => remove(event.id))

  const remove = async (id) => await db.Historyevent.remove(setHistoryEvent, id)

  return (
    <div>
     <br></br>
      <h1>Events History</h1>
      { historyEvent.length > 0 ?
      <>
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
            historyEvent.map(history =>
              <Hist key={history.id} history={history} remove={remove} />
            )
          }
        </tbody>
      </Table><br></br>
      <Button variant='danger' onClick={removeAll}>Clear History</Button>
      </>
      : <p className='text-muted'>No history records for events.</p> }
    </div >
  );
}