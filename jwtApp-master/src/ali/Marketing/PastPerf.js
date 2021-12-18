import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import db from '../../db'

export default function FavPerf({ pastpf }) {

const [performers, setPerformers] = useState(null)
const [users, setUsers] = useState(null)

useEffect(() => (async () => pastpf && setPerformers(await db.Performer.findOne(pastpf.performerid)))(), [pastpf])
useEffect(() => (async () => pastpf && setUsers(await db.Users.findOne(pastpf.userid)))(), [pastpf])
   
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