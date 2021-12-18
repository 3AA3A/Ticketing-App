import React, { useState, useEffect } from 'react'
import {Card, Button} from 'react-bootstrap';

import db from '../../db'
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";

export default function FavPerf({ favpf, remove, user }) {

const [performers, setPerformers] = useState(null)


useEffect(() => (async () => favpf && setPerformers(await db.Performer.findOne(favpf.performerid)))(), [favpf])

const wrapStyle = {
  minWidth: "30.7%",
  flexGrow: 0,
  marginBottom:"3%"
};

const addView = async () => {
  await db.Performer.update(() => null, { id:performers.id, name:performers.name, type:performers.type, image:performers.image, viewamount:performers.viewamount+1 })
  await db.Historyperformer.create(() => null, {userid:user.id, performerid:performers.id})
}

  return (
    <Card style={wrapStyle}>
      <Card.Img variant='top' src={performers && performers.image}/>
      <Card.Body>
        <Card.Title>{performers && performers.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{performers && performers.type} | {performers && performers.viewamount} views</Card.Subtitle>
        <Card.Text>
          <Button size='sm' onClick={addView} as={Link} variant='info' to={`/performerdetail/${performers && performers.id}`}>Details</Button> &nbsp;
          <Button variant='danger' size='sm' onClick={()=> remove(favpf.id)}>
              <FontAwesomeIcon icon={faHeartBroken}/> Unlike
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}