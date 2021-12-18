import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import db from '../../../db'

export default function Hist({ history }) {

const [users, setUsers] = useState(null)
const [events, setEvents] = useState(null)

useEffect(() => (async () => history && setEvents(await db.Events.findOne(history.eventid)))(), [history])
useEffect(() => (async () => history && setUsers(await db.Users.findOne(history.userid)))(), [history])
const [genre, setGenre] = useState(null)
const [venue, setVenue] = useState(null)

useEffect(() => (async () => events && setGenre(await db.Genres.findOne(events.genreid)))(), [events])
useEffect(() => (async () => events && setVenue(await db.Venues.findOne(events.venueid)))(), [events])
   
  return (
      
    <tr>
    <td>{events && events.name}</td>
    <td>{events && events.startdate.toDateString().split(" ").splice(1).join(" ")}</td>
    <td>{events && events.enddate.toDateString().split(" ").splice(1).join(" ")}</td>
    <td>{genre && genre.name}</td>
    <td>{venue && venue.name}</td>
    <td>{users && users.name}</td>
    </tr>
  )
}