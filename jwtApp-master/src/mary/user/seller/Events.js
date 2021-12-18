import React, { useContext, useEffect, useState } from 'react'
import db from '../../../db'
import Event from './Event'
import { Card, CardDeck, Col, Alert, Form, Button } from 'react-bootstrap'
import UserContext from '../../../UserContext'
import { useHistory, Link } from 'react-router-dom'

export default function Events() {
  const history = useHistory()

  const { user } = useContext(UserContext)
  const [events, setEvents] = useState([])
  const [genre, setGenre] = useState(0) 
  const [venue, setVenue] = useState(0) 
  const [genres, setGenres] = useState([])
  const [venues, setVenues] = useState([])

  useEffect(() => (async () => setEvents(await db.Events.findByUserid(user.id)))(), [])
  useEffect(() => (async () => setGenres(await db.Genres.findAll()))(), [])
  useEffect(() => (async () => setVenues(await db.Venues.findAll()))(), [])

  const remove = async id => {
    await db.Events.remove(() => null, id)
    history.go(0)
  }

  const filterBy = (list, g, v) => {
    var results = ""
    if(v === 0) {
      results = list.filter(l => l.genreid === g)
    }
    else if (g === 0) {
      results = list.filter(l => l.venueid === v)
    }
    else {
      results = list.filter(l => l.genreid === g && l.venueid === v)
    }

    return results
  }

  return (
    <>
    <br></br>
    <h1>Your Events</h1>
    <p className="text-muted">Manage your events here.</p>
    <hr></hr>

      <Card>
        <Card.Header>Filter Events</Card.Header>
        <Card.Body>
        <Form>
          <Form.Row>
            <Col>
              <Form.Control as="select" size='sm' value={genre} onChange={event => setGenre(1 * event.target.value)}>
                <option key = {""} value="">Select Genre</option>
                {
                  genres.map(item =>
                    <option key={item.id} value={item.id}>{item.name}</option>)
                }
              </Form.Control>
            </Col>
            <Col>
              <Form.Control as="select" size="sm" value={venue} onChange={event => setVenue(1 * event.target.value)}>
                <option key = {""} value="">Select Venue</option>
                {
                  venues.map(item =>
                    <option key={item.id} value={item.id}>{item.name}</option>)
                }
              </Form.Control>
            </Col>
          </Form.Row>
        </Form>
        </Card.Body>
      </Card>
      
      <br></br>

      { genre > 0 && venue > 0 ?
      <CardDeck>
      {
        filterBy(events,genre,venue).length === 0 ? 
        <Card.Body>
          <Alert variant='warning'>No events available</Alert>
        </Card.Body> : 
        filterBy(events,genre,venue).map(event => <Event key={event.id} event={event} remove = {remove} />)
      }
      </CardDeck>
      : genre > 0 ? 
      <CardDeck>
        {
          filterBy(events,genre,0).length === 0 ? 
          <Card.Body>
            <Alert variant='warning'>No events available</Alert>
          </Card.Body> : 
          filterBy(events,genre,0).map(event => <Event key={event.id} event={event} remove = {remove} />)
        }
      </CardDeck>
      : venue > 0 ?
      <CardDeck>
      {
        filterBy(events,0,venue).length === 0 ? 
        <Card.Body>
          <Alert variant='warning'>No events available</Alert>
        </Card.Body> : 
        filterBy(events,0,venue).map(event => <Event key={event.id} event={event} remove = {remove} />)
      }
      </CardDeck> 
      : 
      <CardDeck>
        {
          events.map(event => <Event key={event.id} event={event} remove = {remove}/>)
        }
      </CardDeck> 
      }
    </>
  )
}