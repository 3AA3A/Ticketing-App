import React, { useEffect, useState } from 'react'
import db from '../../db'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default function DetailUserEvent({ event }) {

  const [genre, setGenre] = useState(null)  
  useEffect(() => (async () => event && setGenre(await db.Genres.findOne(event.genreid)))(), [event])

  const [venue, setVenue] = useState(null)
  useEffect(() => (async () => event && setVenue(await db.Venues.findOne(event.venueid)))(), [event])

  return (
    <tr>
      <td>{event.name}</td>
      <td>{event.startdate.toDateString().split(" ").splice(1).join(" ")}</td>
      <td>{event.enddate.toDateString().split(" ").splice(1).join(" ")}</td>
      <td>{genre && genre.name}</td>
      <td>{venue && venue.name}</td>
      <td>
      <Button size="sm" variant="light" as={Link} to={`/eventdetail/${event.id}`}>Details</Button>
      </td>
    </tr>
  );
}