import React, { useEffect, useState } from 'react'
import db from '../../db'
import {
  useParams,
  Link
} from "react-router-dom";
import { Button, Card, Alert, CardDeck } from 'react-bootstrap';
import { faEye, faHeart, faMicrophone, faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Event from './PerformerEvent'
import Spinner from 'react-bootstrap/Spinner'

export default function PerformerDetail() {

  const { id: stringId } = useParams();
  const id = 1 * stringId

  const [performer, setPerformer] = useState(null)
  const [favs, setFaves] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => (async () => setPerformer(await db.Performer.findOne(id)))(), [id])
  useEffect(() => (async () => performer && setFaves(await db.Favoriteperformer.findByPerformerid(performer.id)))(), [performer])
  useEffect(() => (async () => performer && setEvents(await db.Eventperformer.findByPerformerid(performer.id)))(), [performer])

  const cardImage = {
    objectFit: "cover",
    height: "400px",
    objectPosition: "0 0"
  }

  return (
    <>
      { performer ? performer.image !== '/default.png' ?
        <div>
          <Card>
            <Card.Img style={cardImage} variant='top' src={performer.image} />
          </Card>

          <br></br>

          <div className='row'>
            <div className='col-md-9'>
              <h1 className='display-4'>{performer.name}</h1>
              <p className='lead'>
                {performer.type}
              </p>
            </div>
            <div className='col-md-3'>
              <dl className='row'>
                <dt className='col-sm-3'><FontAwesomeIcon icon={faEye} /></dt>
                <dd className='col-sm-9'>
                  {performer.viewamount === 1 ? <>{performer.viewamount} view</>
                    : performer.viewamount > 1 ? <>{performer.viewamount} views</>
                      : <span className='text-muted'>{performer.viewamount} views</span>
                  }
                </dd>
                <dt className='col-sm-3'><FontAwesomeIcon icon={faHeart} /></dt>
                <dd className='col-sm-9'>
                  {favs && favs.length === 1 ? <>{favs.length} favorite</>
                    : favs && favs.length > 1 ? <>{favs.length} favorites</>
                      : <span className='text-muted'>{favs.length} favorites</span>
                  }
                </dd>
                <dt className='col-sm-3'><FontAwesomeIcon icon={faMicrophone} /></dt>
                <dd className='col-sm-9'>
                  {events && events.length === 1 ? <>{events.length} total concert</>
                    : events && events.length > 1 ? <>{events.length} total concerts</>
                      : <span className='text-muted'>{events.length} total concerts</span>
                  }
                </dd>
              </dl>
            </div>
          </div>

          <br></br>

          {events.length === 0 ?
            <p className='text-muted'>Oops....this artist has no events yet.</p> :
            <CardDeck>
              {
                events.map(event => <Event key={event.id} perfevent={event} />)
              }
            </CardDeck>
          }
        </div> : <><br></br><Alert variant='danger'>Error. You are not authorized to view this performer!</Alert></>
        :
        <p>
          <Spinner animation="border" variant="dark" /> &nbsp;
        Please wait...
        </p>}

      <br></br>

      <Button as={Link} variant='primary' to={`/performers`}>Go Back</Button>
    </>
  )
}