import React, {useContext, useEffect, useState } from 'react'
import db from '../../db'
import {
  useParams,
  Link,
  useHistory
} from "react-router-dom";
import { Button, Card, Alert, CardDeck, Modal } from 'react-bootstrap';
import { faEye, faHeart, faMicrophone, faComment, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Event from './PerformerEvent'
import UserContext from '../../UserContext'
import Spinner from 'react-bootstrap/Spinner'
export default function PerformerDetail() {

  const { id: stringId } = useParams();
  const id = 1 * stringId
  const history = useHistory()

  const [performer, setPerformer] = useState(null)
  const [favs, setFaves] = useState([])
  const [events, setEvents] = useState([])
  
  useEffect(() => (async () => setPerformer(await db.Performer.findOne(id)))(), [id])
  useEffect(() => (async () => performer && setFaves(await db.Favoriteperformer.findByPerformerid(performer.id)))(), [performer])
  useEffect(() => (async () => performer && setEvents(await db.Eventperformer.findByPerformerid(performer.id)))(), [performer])

  const [favoriteperformers, setFavoritePerformers] = useState([])
      
  const { user } = useContext(UserContext)
  const userxid = user && user.id
  const performerxid = performer && performer.id

  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
    history.go(0)
  }
  const handleShow = () => setShow(true)
 
  const createF = async () => {
    await db.Favoriteperformer.create(setFavoritePerformers, {userid:userxid, performerid:performerxid })
    handleShow()
}

    const [checkFav, setCheckFav] = useState(false)
    useEffect(() => (async () => setCheckFav(
      userxid !== "" &&
      performerxid > 0 &&
      await db.Users.findOne(userxid) !== undefined &&
      await db.Performer.findOne(performerxid) !== undefined &&
      (await db.Favoriteperformer.findByPerformeridAndUseridContains(performerxid, userxid)).length === 0
    ))(), [performerxid, userxid])

  const cardImage = {
      objectFit: "cover",
      height:"400px",
      objectPosition:"0 0"
  }

  return (
    <>
    { performer ? performer.image !== '/default.png' ?
    <div>
      <Card>
          <Card.Img style={cardImage} variant='top' src={performer.image}/>
      </Card>

      <br></br>

      <div className='row'>
          <div className='col-md-9'>
            <h1 className='display-4'>{performer.name}</h1>
            <p className='lead'>
                {performer.type}
                <Button size='sm' variant='link' onClick={createF} disabled={!checkFav}>
                    <FontAwesomeIcon icon={faHeart}/> Add to favorites
                </Button>
                <Button size='sm' as={Link} variant='link' to={`/perfreview/${performer.id}`}>
                    <FontAwesomeIcon icon={faComment}/> Leave a Review
                </Button>
            </p>
          </div>
          <div className='col-md-3'>
              <dl className='row'>
                  <dt className='col-sm-3'><FontAwesomeIcon icon={faEye}/></dt>
                  <dd className='col-sm-9'>
                      { performer.viewamount === 1 ? <>{performer.viewamount} view</>
                      : performer.viewamount > 1 ? <>{performer.viewamount} views</>
                      : <span className='text-muted'>{performer.viewamount} views</span>
                      }
                  </dd>
                  <dt className='col-sm-3'><FontAwesomeIcon icon={faHeart}/></dt>
                  <dd className='col-sm-9'>
                      { favs && favs.length === 1 ? <>{favs.length} favorite</>
                      : favs && favs.length > 1 ? <>{favs.length} favorites</>
                      : <span className='text-muted'>{favs.length} favorites</span>
                      }
                  </dd>
                  <dt className='col-sm-3'><FontAwesomeIcon icon={faMicrophone}/></dt>
                  <dd className='col-sm-9'>
                      { events && events.length === 1 ? <>{events.length} total concert</>
                      : events && events.length > 1 ? <>{events.length} total concerts</>
                      : <span className='text-muted'>{events.length} total concerts</span>
                      }
                  </dd>
              </dl>
          </div>
      </div>
      
      <br></br>

      { events.length === 0 ?
        <p className='text-muted'>Oops....this artist has no events yet.</p> :
        <CardDeck>
            {
                events.map(event => <Event key={event.id} perfevent={event} create={createF}/>)
            }
        </CardDeck>
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{performer.name} added to favorites!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            <FontAwesomeIcon icon={faCheck}/> Ok
          </Button>
        </Modal.Footer>
      </Modal>
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