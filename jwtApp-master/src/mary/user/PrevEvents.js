import React, { useEffect, useState } from 'react'
import db from '../../db'
import PrevEvent from './PrevEvent'
import { Card, CardDeck, Form, Carousel, Spinner } from 'react-bootstrap'

export default function Events() {

  const [events, setEvents] = useState(null)
  const [genre, setGenre] = useState(0) 
  const [venue, setVenue] = useState(0) 
  const [genres, setGenres] = useState([])
  const [venues, setVenues] = useState([])

  useEffect(() => (async () => setEvents(await db.Events.findAll()))(), [])
  useEffect(() => (async () => setGenres(await db.Genres.findAll()))(), [])
  useEffect(() => (async () => setVenues(await db.Venues.findAll()))(), [])

  const filterBy = (list, g, v) => {
    var results = ""
    if(v === 0) {
      results = list.filter(l => l.enddate <= new Date() && l.genreid === g)
    }
    else if (g === 0) {
      results = list.filter(l => l.enddate <= new Date() && l.venueid === v)
    }
    else {
      results = list.filter(l => l.enddate <= new Date() && l.genreid === g && l.venueid === v)
    }

    return results
  }

  //filterBy(events, genreid, 0)

  return (
    <>
      <Carousel>
        <Carousel.Item interval={5000}>
          <img
            style={{width:"100%", height:"300px", objectFit:"cover"}}
            src="/home2.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h1 className='display-4' style={{textAlign:"left"}}>Previous Events</h1>
            <p className='lead' style={{textAlign:"left", color:"lightgray"}}>View and review finished events here.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            style={{width:"100%", height:"300px", objectFit:"cover"}}
            src="/home1.png"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            style={{width:"100%", height:"300px", objectFit:"cover"}}
            src="/home3.png"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      
      <br></br>

      <div className='row'>
      <div className='col-md-3'>
      <Card>
        <Card.Header>Filter Events</Card.Header>
        <Card.Body>
          <Form>
              <Form.Group>
                <Form.Label>Genres</Form.Label>
                <Form.Check type="radio" key="" label="All" value="0" name="genre" onChange={event => setGenre(1 * event.target.value)} checked={genre === 0} />
                {
                  genres.map(item =>
                    <Form.Check type="radio" key={item.id} label={item.name} value={item.id} name="genre" onChange={event => setGenre(1 * event.target.value)}/>)
                }
              </Form.Group>

              <Form.Group>
                <Form.Label>Venues</Form.Label>
                <Form.Control as="select" size="sm" value={venue} onChange={event => setVenue(1 * event.target.value)}>
                  <option key = {""} value="">Select Venue</option>
                  {
                    venues.filter(v => v.image !== "/default.png").map(item =>
                      <option key={item.id} value={item.id}>{item.name}</option>)
                  }
                </Form.Control>
              </Form.Group>
        </Form>
        </Card.Body>
      </Card>
      </div>
      
      <div className='col-md-9'>
      { events ?
      <>
      { genre > 0 && venue > 0 ?
        <CardDeck>
        {
          filterBy(events,genre,venue).map(event => <PrevEvent key={event.id} event={event} />)
        }
        </CardDeck>
        : genre > 0 ? 
        <CardDeck>
          {
            filterBy(events,genre,0).map(event => <PrevEvent key={event.id} event={event} />)
          }
        </CardDeck>
        : venue > 0 ?
        <CardDeck>
        {
          filterBy(events,0,venue).map(event => <PrevEvent key={event.id} event={event} />)
        }
        </CardDeck> 
        : 
        <CardDeck>
          {
            events.filter(e => e.enddate <= new Date()).map(event => <PrevEvent key={event.id} event={event} />)
          }
        </CardDeck> 
        }
        </>
        :
        <p>
          <Spinner animation="border" variant="dark" /> &nbsp;
          Please wait...
        </p> 
      }
      </div>
      </div>
      
      
      <br></br>

      
    </>
  )
}