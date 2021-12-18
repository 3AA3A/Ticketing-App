import React, { useState, useEffect } from 'react'
import {Card, Button, Carousel} from 'react-bootstrap';
import { Link } from "react-router-dom";
import db from '../../db'

export default function Event2({ hist }) {

const [event, setEvent] = useState(null)
const [genre, setGenre] = useState(null)
const [venue, setVenue] = useState(null)
const [performers, setPerformers] = useState([])
const [tickets, setTickets] = useState([]) 

useEffect(() => (async () => setEvent(await db.Events.findOne(hist.eventid)))(), [hist])
useEffect(() => (async () => event && setGenre(await db.Genres.findOne(event.genreid)))(), [event])
useEffect(() => (async () => event && setVenue(await db.Venues.findOne(event.venueid)))(), [event])
useEffect(() => (async () => event && setPerformers(await db.Eventperformer.findbyEventId(event.id)))(), [event])
useEffect(() => (async () => event && setTickets(await db.Products.findByEventId(event.id)))(), [event]) 

const imgStyle = {
    width:"100%",
    objectFit: "cover",
    height:"15em",
    objectPosition:"0"
}

  return (
    <>
    { performers.length > 0 && tickets.length > 0 ?
    <>
    <img
        className="d-block w-100"
        style={imgStyle}
        src={venue && venue.image}
        alt={event && event.title}
    />
    <Carousel.Caption style={{background:"rgba(0,0,0,0.8)"}}>
        <p className='lead' style={{color:"lightgray"}}>{event && event.name}</p>
        <p>
            <Button size='sm' variant='light' as={Link} to={`/eventdetail/${event && event.id}`}>Details</Button>
        </p>
    </Carousel.Caption>
    </>
    : null
    }
    </>
  )
}