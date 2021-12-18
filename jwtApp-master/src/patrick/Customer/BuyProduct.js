import React, { useEffect, useState } from 'react'
import db from '../../db'
import Product from './Product'
import {
    useParams,
    Link
  } from "react-router-dom";

export default function BuyProduct() {

  const { id: stringId } = useParams();
  const id = 1 * stringId

  const [event, setEvent] = useState(null)
  const [genre, setGenre] = useState(null)
  const [venue, setVenue] = useState(null)
  useEffect(() => (async () => setEvent(await db.Events.findOne(id)))(), [id])
  useEffect(() => (async () => event && setGenre(await db.Genres.findOne(event.genreid)))(), [event])
  useEffect(() => (async () => event && setVenue(await db.Venues.findOne(event.venueid)))(), [event])

  const [products, setProducts] = useState([])
  useEffect(() => (async () => event && setProducts(await db.Products.findByEventId(id)))(), [event])

  return (
    <>
    <br></br>
      { event && products.length > 0 ?
      <>
      <Jumbotron>
        <h1>{event && event.name}</h1>
        <p class='lead'>Purchase tickets for this event.</p>
        <hr></hr>
        <p>
          {event.startdate.toDateString().split(" ").splice(1).join(" ")} - {event.enddate.toDateString().split(" ").splice(1).join(" ")}<br></br>
          Genre: {genre && genre.name} | Venue: {venue && venue.name}
        </p>
        <p><Button variant="light" as={Link} to={'/events'}>Back to Events</Button></p>
      </Jumbotron>
      
      <CardDeck>
          {
            products.map(product => <Product key={product.id} product={product} />)
          }
      </CardDeck>
      </> : <Alert variant='danger'>Error. You are not authorized to view this event!</Alert>
      }
    </>
  )
}