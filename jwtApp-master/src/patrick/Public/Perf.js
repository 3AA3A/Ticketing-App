import React, { useState, useEffect, useContext } from 'react'
import {Card, Badge, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCheck } from '@fortawesome/free-solid-svg-icons'
import db from '../../db';

export default function Performer({ performer, create }) {
  const wrapStyle = {
    minWidth: "29.8%",
    flexGrow: 0,
    marginBottom:"3%"
  };

  const[tickets, setTickets] = useState([])
  useEffect(() => (async () => performer && setTickets(await db.Eventperformer.findByPerformerid(performer.id)))(), [performer])

  return (
    <Card style={wrapStyle}>
        <Card.Img variant="top" src={performer.image} />
        <Card.Body>
            <Card.Title>{performer.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{performer.type}</Card.Subtitle>
            <Card.Text>
                { tickets.length === 1 ?
                <><small className='text-info'>{tickets && tickets.length} concert</small></>
                : tickets.length > 1 ?
                <><small className='text-info'>{tickets && tickets.length} concerts</small></>
                :
                <><small className='text-muted'>No concerts</small></>
                }
                <br /><br />
                <Button size='sm' as={Link} variant='info' to={`/performerdetail/${performer.id}`}>Details</Button>
            </Card.Text>
        </Card.Body>
    </Card>
  )
}