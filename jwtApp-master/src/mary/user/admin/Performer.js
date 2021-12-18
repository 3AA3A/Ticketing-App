import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import db from '../../../db'

export default function Performer({ performer, remove }) {

    const [validRemove, setValidRemove] = useState(false)
    useEffect(() => (async () => setValidRemove(
        (await db.Favoriteperformer.findByPerformerid(performer.id)).length === 0 &&
        (await db.Historyperformer.findByPerformerid(performer.id)).length === 0 &&
        (await db.Eventperformer.findByPerformerid(performer.id)).length === 0 &&
        (await db.Performerreview.findByPerformerid(performer.id)).length === 0 
    ))(), [performer])
    
  return (
    <>
        <td>{performer.name}</td>
        <td>{performer.type}</td>
        <td><img src={performer.image} width='150'/></td>
        <td>
            <Button size="sm" variant='light' as={Link} to={`/editperformer/${performer.id}`}>Edit</Button> &nbsp;
            <Button size="sm" variant='danger' onClick={() => remove(performer.id)} disabled={!validRemove}>X</Button>
        </td>
    </>
  )
}