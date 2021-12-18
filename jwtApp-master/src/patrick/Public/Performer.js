import React, { useState, useEffect } from 'react'
import {Button, Card} from 'react-bootstrap';
import { Link } from "react-router-dom";
import db from '../../db';

export default function Performer({ performer }) {
  const wrapStyle = {
    minWidth: "30.7%",
    flexGrow: 0,
    marginBottom:"3%"
  };


    const [details, setDetails] = useState(null)
    useEffect(() => (async () => performer && setDetails(await db.Performer.findOne(performer.performerid)))(), [performer])
    
  return (
    <Card style={wrapStyle}>
        <Card.Header>{performer.performdate.toDateString().split(" ").splice(1).join(" ")}</Card.Header>
        <Card.Img variant="top" src={details && details.image} />
        <Card.Body>
            <Card.Title>{details && details.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{details && details.type} | {performer.performtime}</Card.Subtitle>
            <Card.Text>
              <Button size='sm' as={Link} variant='info' to={`/performerdetail/${details && details.id}`} >Details</Button> &nbsp;
            </Card.Text>
        </Card.Body>
    </Card>
  )
}