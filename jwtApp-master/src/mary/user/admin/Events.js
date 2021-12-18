import React, { useEffect, useState } from 'react'
import db from '../../../db'
import Event from './Event'
import { Table, Button, Form, Col } from 'react-bootstrap'

export default function Events() {

  const [genre, setGenre] = useState(0) 
  const [venue, setVenue] = useState(0) 
  const [name, setName] = useState("")
  const [status, setStatus] = useState("")

  const [events, setEvents] = useState([])
  const [genres, setGenres] = useState([])
  const [venues, setVenues] = useState([])

  useEffect(() => (async () => setEvents(await db.Events.findByNameContaining(name)))(), [name])
  useEffect(() => (async () => setGenres(await db.Genres.findAll()))(), [])
  useEffect(() => (async () => setVenues(await db.Venues.findAll()))(), [])
  
  const remove = async id => {
    await db.Events.remove(() => setEvents, id)
  }

  //filterBy(events, genreid, 0)

  return (
    <>
    <br></br>
      <h2>Search By:</h2>
      <dl className='row'>
          <dt className='col-sm-3'>Name</dt>
          <dd className='col-sm-9'><Form.Control type='text' size='sm' value={name} onChange={event => setName(event.target.value)}/></dd>
          <dt className='col-sm-3'>Genre</dt>
          <dd className='col-sm-9'>
              <Form.Control as='select' size='sm' value={genre} onChange={event => setGenre(1 * event.target.value)}>
                  <option key={""} value={0}>Select Genre</option>
                  { genres.map(item => 
                    <option key={item.id} value={item.id}>{item.name}</option>)
                  }
              </Form.Control>
          </dd>
          <dt className='col-sm-3'>Venue</dt>
          <dd className='col-sm-9'>
              <Form.Control as='select' size='sm' value={venue} onChange={event => setVenue(1 * event.target.value)}>
                  <option key={""} value={0}>Select Venue</option>
                  { venues.filter(v => v.image !== '/defaultvenue.png').map(item => 
                    <option key={item.id} value={item.id}>{item.name}</option>)
                  }
              </Form.Control>
          </dd>
          <dt className='col-sm-3'>Status</dt>
          <dd className='col-sm-9'>
            <Form.Check type="radio" key={0} label="All" value={""} name="status" onChange={event => setStatus(event.target.value)} inline checked = {status === ""}/>
            <Form.Check type="radio" key={1} label="Upcoming" value="upcoming" name="status" onChange={event => setStatus(event.target.value)} inline />
            <Form.Check type="radio" key={2} label="Ongoing" value="ongoing" name="status" onChange={event => setStatus(event.target.value)} inline />
            <Form.Check type="radio" key={3} label="Finished" value="finished" name="status" onChange={event => setStatus(event.target.value)} inline/>
          </dd>
      </dl>

      <br></br>
      <h1>Events</h1>
      <Table striped hover variant='light' size='sm'>
          <thead>
              <tr>
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Genre</th>
                <th>Venue</th>
                <th>Seller</th>
                <th></th>
              </tr>
          </thead>
          <tbody>
              {
                  genre > 0 && venue === 0 && status === "ongoing" ?
                    events.filter(e => e.genreid === genre && new Date() >= e.startdate && new Date() <= e.enddate).map(event => <Event key={event.id} event={event} remove={remove}/>)
                  : genre === 0 && venue > 0 && status === "ongoing" ?
                    events.filter(e => e.venueid === venue && new Date() >= e.startdate && new Date() <= e.enddate).map(event => <Event key={event.id} event={event} remove={remove}/>)
                  : genre > 0 && venue > 0 && status === "ongoing" ?
                    events.filter(e => e.genreid === genre && e.venueid === venue && new Date() >= e.startdate && new Date() <= e.enddate).map(event => <Event key={event.id} event={event} remove={remove}/>)
                  : genre === 0 & venue === 0 && status === "ongoing" ?
                    events.filter(e => new Date() >= e.startdate && new Date() <= e.enddate).map(event => <Event key={event.id} event={event} remove={remove}/>)

                  :  genre > 0 && venue === 0 && status === "upcoming" ?
                    events.filter(e => e.genreid === genre && e.startdate >= new Date()).map(event => <Event key={event.id} event={event} remove={remove}/>)
                  : genre === 0 && venue > 0 && status === "upcoming" ?
                    events.filter(e => e.venueid === venue && e.startdate >= new Date()).map(event => <Event key={event.id} event={event} remove={remove}/>)
                  : genre > 0 && venue > 0 && status === "upcoming" ?
                    events.filter(e => e.genreid === genre && e.venueid === venue && e.startdate >= new Date()).map(event => <Event key={event.id} event={event} remove={remove}/>)
                  : genre === 0 & venue === 0 && status === "upcoming" ?
                    events.filter(e => e.startdate >= new Date()).map(event => <Event key={event.id} event={event} remove={remove}/>)
                  
                  : genre > 0 && venue === 0 && status === "finished" ?
                    events.filter(e => e.genreid === genre && e.enddate <= new Date()).map(event => <Event key={event.id} event={event} remove={remove}/>)
                  : genre === 0 && venue > 0 && status === "finished" ?
                    events.filter(e => e.venueid === venue && e.enddate <= new Date()).map(event => <Event key={event.id} event={event} remove={remove}/>)
                  : genre > 0 && venue > 0 && status === "finished" ?
                    events.filter(e => e.genreid === genre && e.venueid === venue && e.enddate <= new Date()).map(event => <Event key={event.id} event={event} remove={remove}/>)
                  : genre === 0 & venue === 0 && status === "finished" ?
                    events.filter(e => e.enddate <= new Date()).map(event => <Event key={event.id} event={event} remove={remove}/>)  

                  : genre > 0 && venue === 0 && status === "" ?
                    events.filter(e => e.genreid === genre).map(event => <Event key={event.id} event={event} remove={remove}/>)
                  : genre === 0 && venue > 0 && status === "" ?
                    events.filter(e => e.venueid === venue).map(event => <Event key={event.id} event={event} remove={remove}/>)
                  : genre > 0 && venue > 0 && status === "" ?
                    events.filter(e => e.genreid === genre && e.venueid === venue).map(event => <Event key={event.id} event={event} remove={remove}/>)
                  : genre === 0 & venue === 0 && status === "" ?
                    events.filter(e => e.enddate >= new Date()).map(event => <Event key={event.id} event={event} remove={remove}/>)
                  
                  : events.map(event => <Event key={event.id} event={event} remove={remove}/>)
              }
          </tbody>
      </Table>
    </>
  )
}