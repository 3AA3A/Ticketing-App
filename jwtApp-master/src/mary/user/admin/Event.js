import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import db from '../../../db'

export default function Event({ event, remove }) {

const [genre, setGenre] = useState(null)
const [venue, setVenue] = useState(null)
const [user, setUser] = useState(null)

useEffect(() => (async () => event && setGenre(await db.Genres.findOne(event.genreid)))(), [event])
useEffect(() => (async () => event && setVenue(await db.Venues.findOne(event.venueid)))(), [event])
useEffect(() => (async () => event && setUser(await db.Users.findOne(event.userid)))(), [event])

const [validRemove, setValidRemove] = useState(false)
  useEffect(() => (async () => setValidRemove(
    (await db.Favoriteevent.findByEventid(event.id)).length === 0 &&
    (await db.Historyevent.findByEventid(event.id)).length === 0 &&
    (await db.Products.findByEventId(event.id)).length === 0 &&
    (await db.Promotion.findByEventid(event.id)).length === 0 &&
    (await db.Eventperformer.findbyEventId(event.id)).length === 0
  ))(), [event])

  return (
    <tr>
      <td>{event.name}</td>
      <td>{event.startdate.toDateString().split(" ").splice(1).join(" ")}</td>
      <td>{event.enddate.toDateString().split(" ").splice(1).join(" ")}</td>
      <td>{genre && genre.name}</td>
      <td>{venue && venue.name}</td>
      <td>{user && user.id}</td>
      <td>
        <Button size="sm" variant="light" as={Link} to={`/eventdetail/${event.id}`}>Details</Button> &nbsp;
        <Button size="sm" variant="light" as={Link} to={`/editevent/${event.id}`}>Edit</Button> &nbsp;
        <Button variant="danger" size="sm" onClick={() => remove(event.id)} disabled={!validRemove}>X</Button> 
      </td>
    </tr>
  )
}