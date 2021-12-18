import React, { useEffect, useState } from 'react'
import db from '../../db'
import {
  useParams,
  Link
} from "react-router-dom";
import { Button, Jumbotron, Alert, CardDeck, Badge } from 'react-bootstrap';
import Performer from './Performer'
import { faHeart, faEye, faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from 'react-bootstrap/Spinner'

export default function EventDetail() {

  const { id: stringId } = useParams();
  const id = 1 * stringId

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

  return (
    <>
    <br></br>
    { event ? performers.length > 0 ?
    <div>
      <Jumbotron>
        <h1 className='display-4'>{event.name}</h1>
        <p className='lead'>Take a sneak peek at the solo artists and bands performing for this event!</p>
        <hr></hr>
        <p>
          {event.startdate.toDateString().split(" ").splice(1).join(" ")} - {event.enddate.toDateString().split(" ").splice(1).join(" ")}<br></br>
          Venue: {venue && venue.name} ({venue && venue.city})
        </p>
        <p>
          <Badge pill variant='info' className='text-light'><FontAwesomeIcon icon={faMusic}/>&nbsp;{genre && genre.name}</Badge> &nbsp;
          <Badge pill variant='info' className='text-light'><FontAwesomeIcon icon={faHeart}/>&nbsp;{favoriteevents && favoriteevents.length} favorite(s)</Badge> &nbsp;
          <Badge pill variant='info' className='text-light'><FontAwesomeIcon icon={faEye}/>&nbsp;{event.viewamount} view(s)</Badge>
        </p>
        <p>
          { event.enddate >= new Date() ? 
            <>
            <Button variant="light" as={Link} to={'/events'}>Back to Events</Button> &nbsp;
            <Button variant="warning" as={Link} to={`/products/${event.id}`}>Buy Tickets</Button>
            </>
            :
            <>
            <Button variant="light" as={Link} to={'/prevevents'}>Back to Previous Events</Button> &nbsp;
            <Button variant="warning">Send a Review</Button> 
            </>
          }
        </p>
      </Jumbotron>

      <CardDeck>
      { performers.map(performer => <Performer key = {performer.id} performer = {performer}/>) }
      </CardDeck>
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