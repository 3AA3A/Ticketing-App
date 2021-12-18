import React, { useState, useEffect } from 'react'
import {Card, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import db from '../db'

export default function Event({ event }) {

const [genre, setGenre] = useState(null)
const [venue, setVenue] = useState(null)
const [performers, setPerformers] = useState([])
const [tickets, setTickets] = useState([])

useEffect(() => (async () => event && setGenre(await db.Genres.findOne(event.genreid)))(), [event])
useEffect(() => (async () => event && setVenue(await db.Venues.findOne(event.venueid)))(), [event])
useEffect(() => (async () => event && setPerformers(await db.Eventperformer.findbyEventId(event.id)))(), [event])
useEffect(() => (async () => event && setTickets(await db.Products.findByEventId(event.id)))(), [event]) 

const wrapStyle = {
  minWidth: "30.7%",
  flexGrow: 0,
  marginBottom:"3%"
};

  return (
    <>
    { performers.length > 0 && tickets.length > 0 ?
    <Card style={wrapStyle}>
    <Card.Img variant="top" src={venue && venue.image} />
    <Card.Body>
      <Card.Title>{event.name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">From {event.startdate.toDateString().split(" ").splice(1).join(" ")} to {event.enddate.toDateString().split(" ").splice(1).join(" ")}</Card.Subtitle>
      <Card.Text>
        <dt>Genre</dt> <dd>{genre && genre.name}</dd>
        <dt>Venue</dt> <dd>{venue && venue.name} ({venue && venue.city})</dd>
        <Button size="sm" variant='info' as={Link} to={`/eventdetail/${event.id}`}>Performers</Button> &nbsp;
      </Card.Text>
    </Card.Body>
    </Card>
    : null
    }
    </>
  )
}