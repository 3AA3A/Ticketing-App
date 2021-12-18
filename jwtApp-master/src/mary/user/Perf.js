import React, { userContext, useState, useEffect, useContext } from 'react'
import {Card, Badge, Button, Modal} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCheck } from '@fortawesome/free-solid-svg-icons'
import db from '../../db';
import UserContext from '../../UserContext'

export default function Performer({ performer, createF }) {
  const wrapStyle = {
    minWidth: "29.8%",
    flexGrow: 0,
    marginBottom:"3%"
  };

  const[tickets, setTickets] = useState([])
  useEffect(() => (async () => performer && setTickets(await db.Eventperformer.findByPerformerid(performer.id)))(), [performer])
 
  const { user } = useContext(UserContext)
  const userid = user && user.id
  const performerid = performer && performer.id

  const [checkFav, setCheckFav] = useState(false)
  useEffect(() => (async () => setCheckFav(
      userid !== "" &&
      performerid > 0 &&
      await db.Users.findOne(userid) !== undefined &&
      await db.Performer.findOne(performerid) !== undefined &&
      (await db.Favoriteperformer.findByPerformeridAndUseridContains(performerid, userid)).length === 0
  ))(), [performerid, userid])

  const addView = async () => {
    await db.Performer.update(() => null, { id:performer.id, name:performer.name, type:performer.type, image:performer.image, viewamount:performer.viewamount+1 })
    await db.Historyperformer.create(() => null, {userid, performerid})
}

  return (
    <>
    <Card style={wrapStyle}>
        <Card.Img variant="top" src={performer.image} />
        <Card.Body>
            <Card.Title>{performer.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{performer.type}</Card.Subtitle>
            <Card.Text>
                { tickets.length === 1 ?
                <><small class='text-info'>{tickets && tickets.length} concert</small><hr></hr></>
                : tickets.length > 1 ?
                <><small class='text-info'>{tickets && tickets.length} concerts</small><hr></hr></>
                :
                <><small class='text-muted'>No concerts</small><hr></hr></>
                }
                <Button size='sm' as={Link} onClick={addView} variant='info' to={`/performerdetail/${performer.id}`}>Details</Button> &nbsp;
                <Button size='sm' title='Favorite' variant='danger' onClick={() => createF(performer.id)} disabled={!checkFav}>
                    <FontAwesomeIcon icon={faHeart}/>
                </Button> 
            </Card.Text>
        </Card.Body>
    </Card>

    
    </>
  )
}