import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import db from '../../../db';

export default function Performer({ performer }) {
    const [details, setDetails] = useState(null)
    useEffect(() => (async () => performer && setDetails(await db.Performer.findOne(performer.performerid)))(), [performer])
 
  return (
    <tr>
      <td>{details && details.name}</td>
      <td>{details && details.type}</td>
      <td>{performer.performdate.toDateString().split(" ").splice(1).join(" ")}</td>
      <td>{performer.performtime}</td>
      <td><img src={details && details.image} width='150'/></td>
    </tr>
  )
}