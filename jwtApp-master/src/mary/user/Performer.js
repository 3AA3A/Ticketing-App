import React, { useContext, useState, useEffect } from 'react'
import {Button, Card} from 'react-bootstrap';
import { Link } from "react-router-dom";
import db from '../../db';
import UserContext from '../../UserContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCheck } from '@fortawesome/free-solid-svg-icons'

export default function Performer({ performer }) {
  const wrapStyle = {
    minWidth: "30.7%",
    flexGrow: 0,
    marginBottom:"3%"
  };

    const { user } = useContext(UserContext)
    const userid = user && user.id

    const [details, setDetails] = useState(null)
    const [favoritePerformers, setFavoritePerformers] = useState([])
    useEffect(() => (async () => setFavoritePerformers(await db.Favoriteperformer.findAll()))(), [])
    useEffect(() => (async () => performer && setDetails(await db.Performer.findOne(performer.performerid)))(), [performer])
  
    const performerid = details && details.id
  
    const createF = async () => {
      await db.Favoriteperformer.create(setFavoritePerformers, {userid, performerid }
    )}

    const [checkFav, setCheckFav] = useState(false)
    useEffect(() => (async () => setCheckFav(
        userid !== "" &&
        performerid > 0 &&
        await db.Users.findOne(userid) !== undefined &&
        await db.Performer.findOne(performerid) !== undefined &&
        (await db.Favoriteperformer.findByPerformeridAndUseridContains(performerid, userid)).length === 0
    ))(), [performerid, userid])

    const addView = async () => {
      await db.Performer.update(() => null, { id:details && details.id, name:details && details.name, type:details && details.type, image:details && details.image, viewamount:details && details.viewamount+1 })
      await db.Historyperformer.create(() => null, {userid, performerid})
    }
  return (
    <Card style={wrapStyle}>
        <Card.Header>{performer.performdate.toDateString().split(" ").splice(1).join(" ")}</Card.Header>
        <Card.Img variant="top" src={details && details.image} />
        <Card.Body>
            <Card.Title>{details && details.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{details && details.type} | {performer.performtime}</Card.Subtitle>
            <Card.Text>
              <Button size='sm' as={Link} onClick={addView} variant='info' to={`/performerdetail/${details && details.id}`} >Details</Button> &nbsp;
              <Button size='sm' title='Favorite' variant='danger' onClick={createF} disabled={!checkFav}>
                <FontAwesomeIcon icon={faHeart}/>
              </Button> 
            </Card.Text>
        </Card.Body>
    </Card>
  )
}