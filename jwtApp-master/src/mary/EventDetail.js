import React, { useEffect, useState } from 'react'
import db from '../db'
import {
  useParams,
  Link
} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'


export default function EventDetail() {

  const { id: stringId } = useParams();
  const id = 1 * stringId

  const [event, setEvent] = useState(null)
  useEffect(() => (async () => setEvent(await db.Events.findOne(id)))(), [id])

  const [genre, setGenre] = useState(null)
  const [venue, setVenue] = useState(null)

  useEffect(() => (async () => event && setGenre(await db.Genres.findOne(event.genreid)))(), [event])
  useEffect(() => (async () => event && setVenue(await db.Venues.findOne(event.venueid)))(), [event])

  return (
    event
    ?
    <>
      <h1>Event Details</h1>
      <dl className="row">
        <dt className="col-sm-3">Name</dt>
        <dd className="col-sm-9">{event.name}</dd>
        <dt className="col-sm-3">Start Date</dt>
        <dd className="col-sm-9">{event.startdate.toDateString().split(" ").splice(1).join(" ")}</dd>
        <dt className="col-sm-3">End Date</dt>
        <dd className="col-sm-9">{event.enddate.toDateString().split(" ").splice(1).join(" ")}</dd>
        <dt className="col-sm-3">Genre</dt>
        <dd className="col-sm-9">{genre && genre.name}</dd>
        <dt className="col-sm-3">Venue</dt>
        <dd className="col-sm-9">{venue && venue.name}</dd>
      </dl>

      <Button size="sm" variant="link" as={Link} to={'/events'}>Back to Events</Button>
    </>
    :
    <p>
    <Spinner animation="border" variant="dark" /> &nbsp;
    Please wait...
    </p>
  )
}