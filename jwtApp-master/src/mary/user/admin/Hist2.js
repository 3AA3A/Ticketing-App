import React, { useState, useEffect } from 'react'
import db from '../../../db'

export default function Hist2({ history }) {

const [performers, setPerformers] = useState(null)
const [users, setUsers] = useState(null)

useEffect(() => (async () => history && setPerformers(await db.Performer.findOne(history.performerid)))(), [history])
useEffect(() => (async () => history && setUsers(await db.Users.findOne(history.userid)))(), [history])
   
  return (
      
    <tr>
      <td>{performers && performers.name}</td>
      <td>{performers && performers.type}</td>
      <td><img src={performers && performers.image} width='150'/></td>
      <td>{performers && performers.viewamount}</td>
      <td>{users && users.name}</td>
      
    </tr>
  )
}