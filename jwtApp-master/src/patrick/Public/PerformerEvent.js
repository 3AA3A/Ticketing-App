import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import db from '../../db'
import Card from 'react-bootstrap/Card'

export default function PerformerEvent({ perfevent }) {
  const wrapStyle = {
    minWidth: "29.8%",
    flexGrow: 0,
    marginBottom:"3%"
  };

const [event, setEvent] = useState(null)
const [genre, setGenre] = useState(null)
const [venue, setVenue] = useState(null)

useEffect(() => (async () => perfevent && setEvent(await db.Events.findOne(perfevent.eventid)))(), [perfevent])
useEffect(() => (async () => event && setGenre(await db.Genres.findOne(event.genreid)))(), [event])
useEffect(() => (async () => event && setVenue(await db.Venues.findOne(event.venueid)))(), [event])

  return (
    <>
    <Card style={wrapStyle}>
    <Card.Header>
      { event && new Date() >= event.startdate && new Date() <= event.enddate ? <>Ongoing</> : event && event.startdate >= new Date() ? <>Upcoming</> : <>Finished</> }
    </Card.Header>
    <Card.Img variant="top" src={venue && venue.image} />
    <Card.Body>
      <Card.Title>{event && event.name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">From {event && event.startdate.toDateString().split(" ").splice(1).join(" ")} to {event && event.enddate.toDateString().split(" ").splice(1).join(" ")}</Card.Subtitle>
      <Button size='sm' as={Link} variant='info' to={`/eventdetail/${event && event.id}`}>Details</Button> 
    </Card.Body>
    </Card>
    </>
  )
}