import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import db from '../../db'

export default function Venue({ venue, remove }) {

    const [validRemove, setValidRemove] = useState(false)
    useEffect(() => (async () => setValidRemove(
        (await db.Events.findByVenueId(venue.id)).length === 0
    ))(), [venue])
    
  return (
    <tr>
        <td>{venue.name}</td>
        <td>{venue.city}</td>
        <td><img src={`${venue.image}?${new Date().getTime()}`} width='120'/></td>
        <td>{venue.capacity}</td>
        <td>
            <Button size="sm" variant='light' as={Link} to={`/editvenue/${venue.id}`}>Edit</Button> &nbsp;
            <Button size="sm" variant='danger' onClick={() => remove(venue.id)} disabled={!validRemove}>X</Button>
        </td>
    </tr>
  )
}