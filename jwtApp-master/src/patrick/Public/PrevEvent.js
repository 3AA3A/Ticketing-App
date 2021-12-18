import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import db from '../../db'
import Card from 'react-bootstrap/Card'

export default function Event({ event }) {
  const wrapStyle = {
    minWidth: "29.8%",
    flexGrow: 0,
    marginBottom:"3%"
  };

const [genre, setGenre] = useState(null)
const [venue, setVenue] = useState(null)
const [performers, setPerformers] = useState([])
const [tickets, setTickets] = useState([])

useEffect(() => (async () => event && setGenre(await db.Genres.findOne(event.genreid)))(), [event])
useEffect(() => (async () => event && setVenue(await db.Venues.findOne(event.venueid)))(), [event])
useEffect(() => (async () => event && setPerformers(await db.Eventperformer.findbyEventId(event.id)))(), [event])
useEffect(() => (async () => event && setTickets(await db.Products.findByEventId(event.id)))(), [event]) 
    
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
        <Button size="sm" variant='success'>Review</Button>
      </Card.Text>
    </Card.Body>
    </Card>
    : null
    }
    </>
  )
}