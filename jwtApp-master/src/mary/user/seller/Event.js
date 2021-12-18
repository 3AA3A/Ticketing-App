import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import db from '../../../db'
import Card from 'react-bootstrap/Card'

export default function Event({ event, remove }) {
  const wrapStyle = {
    minWidth: "30.7%",
    flexGrow: 0,
    marginBottom:"3%"
  };

  const [performers, setPerformers] = useState([])
  const [tickets, setTickets] = useState([])
  const [genre, setGenre] = useState(null)
  const [venue, setVenue] = useState(null)
  useEffect(() => (async () => event && setPerformers(await db.Eventperformer.findbyEventId(event.id)))(), [event])
  useEffect(() => (async () => event && setTickets(await db.Products.findByEventId(event.id)))(), [event])
  useEffect(() => (async () => event && setGenre(await db.Genres.findOne(event.genreid)))(), [event])
  useEffect(() => (async () => event && setVenue(await db.Venues.findOne(event.venueid)))(), [event])

  const [validRemove, setValidRemove] = useState(false)
  useEffect(() => (async () => setValidRemove(
    (await db.Favoriteevent.findByEventid(event.id)).length === 0 &&
    (await db.Historyevent.findByEventid(event.id)).length === 0 &&
    (await db.Products.findByEventId(event.id)).length === 0 &&
    (await db.Promotion.findByEventid(event.id)).length === 0 &&
    (await db.Eventperformer.findbyEventId(event.id)).length === 0
  ))(), [event])
    
  return (
    <Card style={wrapStyle}>
      <Card.Header>
        {event && new Date() >= event.startdate && new Date() <= event.enddate ? <>Ongoing</> : event.startdate >= new Date() ? <>Upcoming</> : <>Finished</>}
      </Card.Header>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">From {event.startdate.toDateString().split(" ").splice(1).join(" ")} to {event.enddate.toDateString().split(" ").splice(1).join(" ")}</Card.Subtitle>
        <Card.Text>
          <strong>Genre</strong>: {genre && genre.name}<br></br>
          <strong>Venue</strong>: {venue && venue.name} ({venue && venue.city})<br></br>
          <strong>Performers</strong>: {performers && performers.length}<br></br>
          <strong>Tickets</strong>: {tickets && tickets.length}<br></br>
          <Button size="sm" variant='info' as={Link} to={`/eventdetail/${event.id}`}>Info</Button> &nbsp;
          <Button size="sm" variant='danger' onClick={() => remove(event.id)} disabled={!validRemove}>Delete</Button>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}