import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import db from '../../db'

export default function Genre({ genre, remove }) {

    const [validRemove, setValidRemove] = useState(false)
    useEffect(() => (async () => setValidRemove(
        (await db.Events.findByGenreId(genre.id)).length === 0
    ))(), [genre])
    
  return (
    <tr>
        <td>{genre.name}</td>
        <td>{genre.desc}</td>
        <td>
            <Button size="sm" variant='light' as={Link} to={`/editgenre/${genre.id}`}>Edit</Button> 
            <Button size="sm" variant='danger' onClick={() => remove(genre.id)} disabled={!validRemove}>X</Button>
        </td>
    </tr>
  )
}