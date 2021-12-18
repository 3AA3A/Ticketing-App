import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import db from '../../db'

export default function FavPerf({ favpf }) {

const [performers, setPerformers] = useState(null)


useEffect(() => (async () => favpf && setPerformers(await db.Performer.findOne(favpf.performerid)))(), [favpf])

   
  return (
      
    <tr>
      <td>{performers && performers.name}</td>
      <td>{performers && performers.type}</td>
      <td><img src={performers && performers.image} width='150'/></td>
      <td>{performers && performers.viewamount}</td>
      
    </tr>
  )
}