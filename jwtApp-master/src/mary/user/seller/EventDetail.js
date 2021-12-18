import React, { useContext, useEffect, useState } from 'react'
import db from '../../../db'
import {
  useParams,
  Link,
  useHistory
} from "react-router-dom";
import Performer from './Performer'
import Product from './Product'
import Performer2 from './Performer2'
import Product2 from './Product2'
import UserContext from '../../../UserContext'
import { Card, Alert, Jumbotron, Table, Col, Form, CardDeck, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'

export default function EventDetail() {

  const { user } = useContext(UserContext)
  const userid = user && user.id
  const history = useHistory()

  const { id: stringId } = useParams();
  const id = 1 * stringId

  const [event, setEvent] = useState(null)
  useEffect(() => (async () => setEvent(await db.Events.findOne(id)))(), [id])

  const [genre, setGenre] = useState(null)
  const [venue, setVenue] = useState(null)
  const [performers, setPerformers] = useState([])
  const [products, setProducts] = useState([])
  const [levels, setLevels] = useState([])

  //dropdown & inputs (performer)
  const [newperformers, setNewPerformers] = useState([])
  const [performerid, setPerformerid] = useState(0)
  const [time, setTime] = useState("")
  const [performdate, setPerformdate] = useState(new Date())
  //dropdown & inputs (ticket)
  const [levelid, setLevelid] = useState(0)
  const [price, setPrice] = useState(0)
  const [qty, setQty] = useState(0)

  useEffect(() => (async () => event && setGenre(await db.Genres.findOne(event.genreid)))(), [event])
  useEffect(() => (async () => event && setVenue(await db.Venues.findOne(event.venueid)))(), [event])
  useEffect(() => (async () => event && setPerformers(await db.Eventperformer.findbyEventId(id)))(), [event])
  useEffect(() => (async () => event && setProducts(await db.Products.findByEventId(id)))(), [event])
  useEffect(() => event && setPerformdate(event.startdate), [event])
  useEffect(() => (async () => setNewPerformers(await db.Performer.findAll()))(), [])
  useEffect(() => (async () => setLevels(await db.Levels.findAll()))(), [])

  const remove = async (id,type) => {
      if (type === "performer") await db.Eventperformer.remove(() => null, id)
      else if (type === "product") await db.Products.remove(() => null, id)
      history.go(0) //refreshes the page....there must be a better way but i found this on google lmaooo
  }

  const create = async (type) => {
    if (type === "performer") {
      await db.Eventperformer.create(() => null, {performdate, performtime:time, eventid:id, performerid })
      setPerformerid(0)
      setTime("")
      setPerformerid(new Date())
    }
    else if (type === "ticket") {
      await db.Products.create(() => null, {levelid, eventid:id, price, amount:qty})
      setLevelid(0)
      setPrice(0)
      setQty(0)
    }
    history.go(0)
  }

  const [validCreate, setValidCreate] = useState(false)
  useEffect(() => (async () => setValidCreate(
    time !== "" &&
    performerid > 0 &&
    id > 0 &&
    performdate >= event.startdate && performdate <= event.enddate &&
    (await db.Eventperformer.findByEventidAndPerformeridAndPerformdateAndPerformtime(id, performerid, performdate, time)).length === 0 &&
    await db.Performer.findOne(performerid) !== undefined &&
    await db.Events.findOne(id) !== undefined
  ))(), [ performerid, performdate, time, id ])

  const [validCreate2, setValidCreate2] = useState(false)
  useEffect(() => (async () => setValidCreate2(
    levelid > 0 &&
    id > 0 &&
    price > 0 &&
    qty > 0 &&
    (await db.Products.findByEventidAndLevelid(id, levelid)).length === 0 &&
    await db.Levels.findOne(levelid) !== undefined &&
    await db.Events.findOne(id) !== undefined
  ))(), [ levelid, price, qty, id ])

  return (
    <>
    <br></br>
      { event ? event.userid === userid ?
      <div>
      <Jumbotron>
          <h1>{event.name}</h1>
          <p>
            From <strong>{event.startdate.toDateString().split(" ").splice(1).join(" ")}</strong> to <strong>{event.enddate.toDateString().split(" ").splice(1).join(" ")}</strong><br></br>
            <strong>Genre</strong>: {genre && genre.name} | <strong>Venue</strong> {venue && venue.name} ({venue && venue.city})
          </p>
          <p>
            <Button variant="light" as={Link} to={'/events'}>Back to Events</Button> &nbsp;
            {event.enddate >= new Date() ?
            <Button variant="warning" as={Link} to={`/editevent/${event.id}`}>Edit Event</Button> : 
            <Button variant="warning" disabled title='You cannot edit a finished event!'>Edit Event</Button>}
          </p>
      </Jumbotron>

      {event.enddate >= new Date() ?
      <>
      <Form>
          <Form.Row>
              <Col>
                <Form.Control size='sm' value={levelid} as="select" onChange = {event => setLevelid(1 * event.target.value)}>
                    <option key={0} value={0}>Select Level</option>
                    {
                    levels.map(item =>
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )
                    }
                </Form.Control>
              </Col>
              <Col>
                <Form.Control size='sm' type='text' placeholder = 'Price' onChange = {event => setPrice(1 * event.target.value)}/>
              </Col>
              <Col>
                <Form.Control size='sm' type='text' placeholder = 'Quantity' onChange = {event => setQty(1 * event.target.value)}/>
              </Col>
              <Col>
                <Button size="sm" variant="success" onClick={() => create("ticket")} disabled={!validCreate2}>Add Ticket</Button>
              </Col>
          </Form.Row>
      </Form>

      <br></br>
      
      <Form>
          <Form.Row>
              <Col>
                <Form.Control size='sm' value={performerid} as="select" onChange = {event => setPerformerid(1 * event.target.value)}>
                    <option key={0} value={0}>Select Performer</option>
                    {
                    newperformers.filter(n => n.image !== "/default.png").map(item =>
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )
                    }
                </Form.Control>
                <Form.Text className="text-muted">Performer not in the list? Add a performer <Link to={'/addperformer'}>here</Link>.</Form.Text>
              </Col>
              <Col>
                    <Form.Control size='sm' type='date' value={performdate.toISOString().slice(0,10)} onChange={event => setPerformdate(new Date(event.target.value))}/>
              </Col>
              <Col>
                <Form.Control size='sm' value={time} type='text' placeholder = 'Perform Time HH:MM AM/PM' onChange = {event => setTime(event.target.value)}/>
              </Col>
              <Col>
                <Button size="sm" variant="success" onClick={() => create("performer")} disabled={!validCreate}>Add Performer</Button>
              </Col>
          </Form.Row>
      </Form>

      <hr></hr>
      </> :
      null
      }

      <Card>
      <Card.Header>Tickets</Card.Header>
      <Card.Body>
      { products.length === 0 ? <Alert variant='warning'>No tickets added yet.</Alert> : 
      <Table bordered variant="light" size="sm">
        <thead>
          <tr>
            <th>Admission</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            {
              event.enddate >= new Date() ? <th></th> : null
            }
          </tr>
        </thead>
        <tbody>
          {
            event.enddate >= new Date() ? products.map(product => <tr><Product key = {product.id} product = {product} remove = {remove}/></tr>)
            : products.map(product => <tr><Product2 key = {product.id} product = {product}/></tr>)
          }
        </tbody>
      </Table>
      }
      </Card.Body>
      </Card>
      
      <br></br>

      <Card>
        <Card.Header>Performers</Card.Header>
        <Card.Body>
        { performers.length === 0 ? <Alert variant='warning'>No performers added yet.</Alert> :
        <CardDeck>
          {
            event.enddate >= new Date() ? performers.map(performer => <Performer key = {performer.id} performer = {performer} remove = {remove} />)
            : performers.map(performer => <Performer2 key = {performer.id} performer = {performer}/>)
          }
        </CardDeck> 
        }
        </Card.Body>
      </Card>
      <br></br>
      
      </div> : <Alert variant='danger'>Error. You are not authorized to view this page!</Alert>
      :
      <p>
      <Spinner animation="border" variant="dark" /> &nbsp;
      Please wait...
      </p>
      }
    </>
  )
}