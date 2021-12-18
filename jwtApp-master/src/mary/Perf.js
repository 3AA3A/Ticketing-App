import React, { userContext, useState, useEffect, useContext } from 'react'
import {Card, Badge, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCheck } from '@fortawesome/free-solid-svg-icons'
import db from '../db';

export default function Performer({ performer }) {
  const wrapStyle = {
    minWidth: "29.8%",
    flexGrow: 0,
    marginBottom:"3%"
  };

  const[tickets, setTickets] = useState([])
  useEffect(() => (async () => performer && setTickets(await db.Eventperformer.findByPerformerid(performer.id)))(), [performer])

  const addView = async () => {
    await db.Performer.update(() => null, { id:performer.id, name:performer.name, type:performer.type, image:performer.image, viewamount:performer.viewamount+1 })
}

  return (
    <Card style={wrapStyle}>
        <Card.Img variant="top" src={performer.image} />
        <Card.Body>
            <Card.Title>{performer.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{performer.type}</Card.Subtitle>
            <Card.Text>
                <Button size='sm' as={Link} onClick={addView} variant='info' to={`/performerdetail/${performer.id}`}>Details</Button>
            </Card.Text>
        </Card.Body>
    </Card>
  )
}