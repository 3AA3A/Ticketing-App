import React, { useContext, useEffect, useState } from 'react'
import db from '../../db'
import {
  useParams,
  Link,
  useHistory
} from "react-router-dom";
import { Button, Jumbotron, Alert, CardDeck, Badge, Modal } from 'react-bootstrap';
import { faHeart, faEye, faMusic, faCheck } from '@fortawesome/free-solid-svg-icons'
import UserContext from '../../UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Performer from './Performer'
import Spinner from 'react-bootstrap/Spinner'

export default function EventDetail() {

  const { id: stringId } = useParams();
  const id = 1 * stringId
  const history = useHistory()

  const [event, setEvent] = useState(null)
  useEffect(() => (async () => setEvent(await db.Events.findOne(id)))(), [id])

  const [genre, setGenre] = useState(null)
  const [venue, setVenue] = useState(null)
  const [performers, setPerformers] = useState([])
  const [favoriteevents, setFavoriteEvents] = useState([])

  useEffect(() => (async () => event && setGenre(await db.Genres.findOne(event.genreid)))(), [event])
  useEffect(() => (async () => event && setVenue(await db.Venues.findOne(event.venueid)))(), [event])
  useEffect(() => (async () => event && setPerformers(await db.Eventperformer.findbyEventId(event.id)))(), [event])
  useEffect(() => (async () => event && setFavoriteEvents(await db.Favoriteevent.findByEventid(event.id)))(), [event])

  const [favevents, setFavEvents] = useState([])

  const { user } = useContext(UserContext)
  const userxid = user && user.id
  const eventxid = event && event.id

  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
    history.go(0)
  }
  const handleShow = () => setShow(true)

  const createF = async () => {
    await db.Favoriteevent.create(setFavEvents, {userid:userxid, eventid:eventxid })
    handleShow()
  }

  const [checkFav, setCheckFav] = useState(false)
  useEffect(() => (async () => setCheckFav(
      userxid !== "" &&
      eventxid > 0 &&
      await db.Users.findOne(userxid) !== undefined &&
      await db.Events.findOne(eventxid) !== undefined &&
      (await db.Favoriteevent.findByEventidAndUserid(eventxid, userxid)).length === 0 
  ))(), [userxid, eventxid])

  return (
    <>
    <br></br>
    { event ? performers.length > 0 ?
    <div>
      <Jumbotron>
        <h1 className='display-4'>{event.name}</h1>
        <p class='lead'>Take a sneak peek at the solo artists and bands performing for this event!</p>
        <hr></hr>
        <p>
          {event.startdate.toDateString().split(" ").splice(1).join(" ")} - {event.enddate.toDateString().split(" ").splice(1).join(" ")}<br></br>
          {venue && venue.name} ({venue && venue.city})
        </p>
        <p>
          <Badge pill variant='info' className='text-light'><FontAwesomeIcon icon={faMusic}/>&nbsp;{genre && genre.name}</Badge> &nbsp;
          <Badge pill variant='info' className='text-light'><FontAwesomeIcon icon={faHeart}/>&nbsp;{favoriteevents.length} favorite(s)</Badge> &nbsp;
          <Badge pill variant='info' className='text-light'><FontAwesomeIcon icon={faEye}/>&nbsp;{event.viewamount} view(s)</Badge>
        </p>
        <p>
          { event.enddate >= new Date() ? 
            <>
            <Button variant="light" as={Link} to={'/events'}>Back to Events</Button> &nbsp;
            <Button variant="warning" as={Link} to={`/products/${event.id}`}>Buy Tickets</Button> &nbsp;
            </>
            :
            <>
            <Button variant="light" as={Link} to={'/prevevents'}>Back to Previous Events</Button> &nbsp;
            <Button variant="warning">Send a Review</Button> 
            </>
          }
          <Button variant='link' onClick={createF} disabled={!checkFav}>
            <FontAwesomeIcon icon={faHeart}/> Add to favorites
          </Button>
        </p>
      </Jumbotron>

      <CardDeck>
      { performers.map(performer => <Performer key = {performer.id} performer = {performer}/>) }
      </CardDeck>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{event.name} added to favorites!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            <FontAwesomeIcon icon={faCheck}/> Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div> : <Alert variant='danger'>Error. You are not authorized to view this event!</Alert> 
    :
    <p>
    <Spinner animation="border" variant="dark" /> &nbsp;
    Please wait...
    </p>
    }
    </>
  )
}