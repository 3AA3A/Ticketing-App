import React, { useEffect, useState } from 'react'
import db from '../../../db'
import {
  useParams,
  Link,
  useHistory
} from "react-router-dom";
import Performer from './EventPerformer'
import Product from './EventProduct'
import { Alert, Jumbotron, Table, Col, Form, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'

export default function EventDetail() {
  const { id: stringId } = useParams();
  const id = 1 * stringId

  const [event, setEvent] = useState(null)
  useEffect(() => (async () => setEvent(await db.Events.findOne(id)))(), [id])

  const [genre, setGenre] = useState(null)
  const [venue, setVenue] = useState(null)
  const [user, setUser] = useState(null)
  const [performers, setPerformers] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => (async () => event && setGenre(await db.Genres.findOne(event.genreid)))(), [event])
  useEffect(() => (async () => event && setVenue(await db.Venues.findOne(event.venueid)))(), [event])
  useEffect(() => (async () => event && setUser(await db.Users.findOne(event.userid)))(), [event])
  useEffect(() => (async () => event && setPerformers(await db.Eventperformer.findbyEventId(id)))(), [event])
  useEffect(() => (async () => event && setProducts(await db.Products.findByEventId(id)))(), [event])

  return (
    event ?
    <>
    <br></br>
      <h1>{event.name} Details</h1>
      <p class='lead'>Organized by {user && user.name}</p>
      <dl className='row'>
          <dt className='col-sm-3'>Start</dt>
          <dd className='col-sm-9'>{event.startdate.toDateString().split(" ").splice(1).join(" ")}</dd>
          <dt className='col-sm-3'>End</dt>
          <dd className='col-sm-9'>{event.enddate.toDateString().split(" ").splice(1).join(" ")}</dd>
          <dt className='col-sm-3'>Genre</dt>
          <dd className='col-sm-9'>{genre && genre.name}</dd>
          <dt className='col-sm-3'>Venue</dt>
          <dd className='col-sm-9'>
              {venue && venue.name}<br></br>
              <img src={venue && venue.image} width='200'/>
          </dd>
      </dl>

      <h3>Tickets</h3>
      { products.length === 0 ? <Alert variant='warning'>No tickets added yet.</Alert> : 
      <Table striped hover variant="light" size="sm">
        <thead>
          <tr>
            <th>Admission</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(product => <tr><Product key = {product.id} product = {product}/></tr>)
          }
        </tbody>
      </Table>
      }
      
      <br></br>

        <h3>Performers</h3>
        { performers.length === 0 ? <Alert variant='warning'>No performers added yet.</Alert> :
        <Table striped hover variant='light' size='sm'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Perform Date</th>
                    <td>Perform Time</td>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
            {
              performers.map(performer => <Performer key={performer.id} performer={performer}/>)
            }
            </tbody>
        </Table> 
        }

        <br></br>
        <Button variant='info' as={Link} to={`/events`}>Back to Events</Button> &nbsp;
        <Button variant='warning' as={Link} to={`/editevent/${event.id}`}>Edit</Button>
    </>
    :
    <p>
    <Spinner animation="border" variant="dark" /> &nbsp;
    Please wait...
    </p>
  )
}