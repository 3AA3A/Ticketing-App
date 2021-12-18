import React, { useEffect, useState } from 'react'
import db from '../../../db'
import Hist2 from './Hist2'
import { Button, Table } from 'react-bootstrap';

export default function History2() {

  const [historyPerformer, setHistoryPerformer] = useState([])
  useEffect(() => (async () => setHistoryPerformer(await db.Historyperformer.findAll()))(), [])

  const removeAll = () => historyPerformer.map(event => remove(event.id))

  const remove = async (id) => await db.Historyperformer.remove(setHistoryPerformer, id)

  return (
    <div>
     <br></br>
      <h1>Performers History</h1>
      { historyPerformer.length > 0 ?
      <>
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
            historyPerformer.map(history =>
              <Hist2 key={history.id} history={history} remove={remove} />
            )
          }
        </tbody>
      </Table><br></br>
      <Button variant='danger' onClick={removeAll}>Clear History</Button>
      </>
      : <p className='text-muted'>No history records for performers.</p> }
    </div >
  );
}