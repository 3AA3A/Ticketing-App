import React, {useContext, useEffect, useState } from 'react'

import db from '../../db'
import Table from 'react-bootstrap/Table';
import UserContext from '../../UserContext'
import PastPerf from '../Marketing/PastPerf';

export default function Historys() {

    
  
  const [historyperformers, setHistoryPerformers] = useState([])

 
  const { user } = useContext(UserContext)
  const userxid = user && user.id


  useEffect(() => (async () => setHistoryPerformers(await db.Historyperformer.findAll()))(), [])


  return (
    
    <>
    <br></br>
      <h1 className='display-4'>Your History Page</h1>
      <p className='lead'>Check out all the artists you have recently visited</p>
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
            historyperformers.filter(pastpf => pastpf.userid === userxid).map(pastpf => <PastPerf key={pastpf.id} pastpf={pastpf} />)
          }
        </tbody>
      </Table>

      
    </>
  )
}