import React, { useState, useEffect } from 'react'
import {Card, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";

import db from '../../db'

import { faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FavEnt({ favet, remove, user }) {

const [events, setEvents] = useState(null)

useEffect(() => (async () => favet && setEvents(await db.Events.findOne(favet.eventid)))(), [favet])

const [genre, setGenre] = useState(null)
const [venue, setVenue] = useState(null)

useEffect(() => (async () => events && setGenre(await db.Genres.findOne(events.genreid)))(), [events])
useEffect(() => (async () => events && setVenue(await db.Venues.findOne(events.venueid)))(), [events])

const wrapStyle = {
  minWidth: "30.7%",
  flexGrow: 0,
  marginBottom:"3%"
};

const addView = async () => {
  await db.Events.update(() => null, { id:events.id, name:events.name, startdate:events.startdate, enddate:events.enddate, viewamount:events.viewamount + 1, userid:events.userid, genreid:genre.id, venueid:venue.id })
  await db.Historyevent.create(() => null, {userid:user.id, eventid:events.id})
}
   
  return (
    <Card style={wrapStyle}>
      <Card.Img variant='top' src={venue && venue.image}/>
      <Card.Body>
        <Card.Title>{events && events.name}</Card.Title>
        <Card.Subtitle className='text-muted'>From {events && events.startdate.toDateString().split(" ").splice(1).join(" ")} to {events && events.enddate.toDateString().split(" ").splice(1).join(" ")}</Card.Subtitle>
        <Card.Text>
          <dt>Genre</dt> <dd>{genre && genre.name}</dd>
          <dt>Venue</dt> <dd>{venue && venue.name} ({venue && venue.city})</dd>
          <Button size='sm' variant='info' onClick={addView} as={Link} to={`/eventdetail/${events && events.id}`}>Details</Button>&nbsp;
          <Button size='sm' variant='danger' onClick={()=> remove(favet.id)}>
            <FontAwesomeIcon icon={faHeartBroken}/> Unlike
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}