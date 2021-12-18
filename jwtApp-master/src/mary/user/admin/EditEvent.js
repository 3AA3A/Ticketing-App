import React, { useEffect, useState } from 'react'
import db from '../../../db'
import { Form, Button } from 'react-bootstrap';
import { useHistory, useParams, Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'

export default function EditEvent() {

  const history = useHistory()

  const { id: stringId } = useParams()
  const id = 1 * stringId 

  const [event, setEvent] = useState(null)
  const [genres, setGenres] = useState([])
  const [venues, setVenues] = useState([])
  
  const [user, setUser] = useState(null)
  const [name, setName] = useState("")
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())
  const [genre, setGenre] = useState(0)
  const [venue, setVenue] = useState(0)
  const view = event && event.viewamount

  useEffect(() => (async () => setEvent(await db.Events.findOne(id)))(), [id])
  useEffect(() => (async () => event && setUser(await db.Users.findOne(event.userid)))(), [event])
  useEffect(() => (async () => setGenres(await db.Genres.findAll()))(), [])
  useEffect(() => (async () => setVenues(await db.Venues.findAll()))(), [])

  const userid = user && user.id

  useEffect(() => event && setName(event.name), [event])
  useEffect(() => event && setStart(event.startdate), [event])
  useEffect(() => event && setEnd(event.enddate), [event])
  useEffect(() => event && setGenre(event.genreid), [event])
  useEffect(() => event && setVenue(event.venueid), [event]) 

  console.log(user)

  const update = async () => {
    await db.Events.update(() => null, { id, name, startdate:start, enddate:end, viewamount:view, userid, genreid:genre, venueid:venue })
    history.push(`/eventdetail/${id}`)
  }

  const [validUpdate, setValidUpdate] = useState(false)
  useEffect(() => (async () => setValidUpdate(
    name !== "" &&
    end >= start &&
    genre > 0 &&
    venue > 0 &&
    userid !== "" &&
    await db.Users.findOne(userid) !== undefined &&
    await db.Events.findOne(id) !== undefined
  ))(), [id, name, start, userid, end, genre, venue])
 
  return (
    event ?
    <>
    <br></br>

    <h1>Edit Event</h1>
    <dl className="row">
          <dt className="col-sm-3">Name</dt>
          <dd className="col-sm-9"><Form.Control size="sm" type="text" value={name} onChange={event => setName(event.target.value)}/></dd>
          <dt className="col-sm-3">Start Date</dt>
          <dd className="col-sm-9"><Form.Control size="sm" type="date" onChange={event => setStart(new Date(event.target.value))} value={start.toISOString().slice(0,10)} /></dd>
          <dt className="col-sm-3">End Date</dt>
          <dd className="col-sm-9"><Form.Control size="sm" type="date" onChange={event => setEnd(new Date(event.target.value))} value={end.toISOString().slice(0,10)} /></dd>
          <dt className="col-sm-3">Genre</dt>
          <dd className="col-sm-9">
              <Form.Control size='sm' value={genre} as="select" onChange={event => setGenre(1 * event.target.value)}>
                  {
                  genres.map(item =>
                      <option key={item.id} value={item.id}>{item.name}</option>
                  )
                  }
              </Form.Control>
          </dd>
          <dt className="col-sm-3">Venue</dt>
          <dd className="col-sm-9">
              <Form.Control size='sm' value={venue} as="select" onChange={event => setVenue(1 * event.target.value)}>
                  {
                  venues.filter(n => n.image !== "/default.png").map(item =>
                      <option key={item.id} value={item.id}>{item.name}</option>
                  )
                  }
              </Form.Control>
          </dd>
          <dt className='col-sm-3'>User</dt>
          <dd className='col-sm-9'><Form.Control size='sm' type='text' value={userid} disabled/></dd>
        </dl>

        <br></br>

        <Button size="sm" variant="success" onClick={update} disabled={!validUpdate}>Update</Button> &nbsp;
        <Button size="sm" variant="danger" as={Link} to={`/eventdetail/${event.id}`}>Cancel</Button>
      </>
      :
      <p>
      <Spinner animation="border" variant="dark" /> &nbsp;
      Please wait...
      </p>
  );
}