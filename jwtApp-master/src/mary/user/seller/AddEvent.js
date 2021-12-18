import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../../UserContext'
import db from '../../../db'
import {
  Link,
  useHistory
} from "react-router-dom";
import {Form, Button, Card} from 'react-bootstrap';


export default function Sellers() {
    const history = useHistory()

    //user stuff
    const { user } = useContext(UserContext)
    const userid = user && user.id

    //dropdown selections
    const [genres, setGenres] = useState([])
    const [venues, setVenues] = useState([])

    //input
    const [name, setName] = useState("")
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    const [genreid, setGenreid] = useState(0)
    const [venueid, setVenueid] = useState(0)

    //initialize
    useEffect(() => (async () => setGenres(await db.Genres.findAll()))(), [])
    useEffect(() => (async () => setVenues(await db.Venues.findAll()))(), [])

    const create = async () => {
      await db.Events.create(() => null, {name, startdate:start, enddate:end, viewamount:0, userid, genreid, venueid })
      setName("")
      setStart(new Date())
      setEnd(new Date())
      setVenueid(0)
      setGenreid(0)
      history.push('/events')
    }
  
    const [validCreate, setValidCreate] = useState(false)
    useEffect(() => (async () => setValidCreate(
      name !== '' &&
      start.getMonth() >= new Date().getMonth() &&
      start.getFullYear() >= new Date().getFullYear() &&
      end.getMonth() >= start.getMonth() &&
      end.getFullYear() >= start.getFullYear() &&
      userid !== '' &&
      genreid > 0 &&
      venueid > 0 &&
      await db.Users.findOne(userid) !== undefined &&
      await db.Genres.findOne(genreid) !== undefined &&
      await db.Venues.findOne(venueid) !== undefined
    ))(), [ name, start, end, userid, genreid, venueid ])

    return (
    user &&
    <>
    <br></br>
      <Card>
        <Card.Header>Add an Event</Card.Header>
        <Card.Body>
          <dl className='row'>
          <dt className='col-sm-3'>Name</dt>
          <dd className='col-sm-9'><Form.Control size='sm' type='text' placeholder='Event Name' value={name} onChange={event => setName(event.target.value)}/></dd>
          <dt className='col-sm-3'>Start</dt>
          <dd className='col-sm-9'><Form.Control size='sm' type='date' value={start.toISOString().slice(0,10)} onChange={event => setStart(new Date(event.target.value))}/></dd>
          <dt className='col-sm-3'>End</dt>
          <dd className='col-sm-9'><Form.Control size='sm' type='date' value={end.toISOString().slice(0,10)} onChange={event => setEnd(new Date(event.target.value))}/></dd>
          <dt className='col-sm-3'>Genre</dt>
          <dd className='col-sm-9'>
            <Form.Control size='sm' value={genreid} as="select" onChange = {event => setGenreid(1 * event.target.value)}>
              <option key={0} value={0}>Select Genre</option>
              {
                genres.map(item =>
                <option key={item.id} value={item.id}>{item.name}</option>)
              }
            </Form.Control>
          </dd>
          <dt className='col-sm-3'>Venue</dt>
          <dd className='col-sm-9'>
            <Form.Control size='sm' value={venueid} as="select" onChange = {event => setVenueid(1 * event.target.value)}>
              <option key={0} value={0}>Select Venue</option>
              {
                venues.filter(n => n.image !== "/defaultvenue.png").map(item =>
                <option key={item.id} value={item.id}>{item.name}</option>)
              }
            </Form.Control>
          </dd>
        </dl>
        <Button size="sm" variant="success" onClick={create} disabled={!validCreate}>Create</Button> &nbsp;
        <Button size="sm" variant="danger" as={Link} to={`/events`}>Cancel</Button>
        <Form.Text className="text-muted">Venue not in the list? Add a venue <Link to={'/addvenue'}>here</Link>.</Form.Text>
        </Card.Body>
      </Card>
    </>
  )
}