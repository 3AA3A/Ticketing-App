import React, { userContext, useState, useEffect, useContext } from 'react'
import {Card, Badge, Button, Carousel} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCheck } from '@fortawesome/free-solid-svg-icons'
import db from '../../db';

export default function Perf2({ hist }) {
  const wrapStyle = {
    minWidth: "29.8%",
    flexGrow: 0,
    marginBottom:"3%"
  };

  const [performer, setPerformer] = useState(null)
  const[tickets, setTickets] = useState([])

  useEffect(() => (async () => setPerformer(await db.Performer.findOne(hist.performerid)))(), [hist])
  useEffect(() => (async () => performer && setTickets(await db.Eventperformer.findByPerformerid(performer.id)))(), [performer])

  const addView = async () => {
    await db.Performer.update(() => null, { id:performer.id, name:performer.name, type:performer.type, image:performer.image, viewamount:performer.viewamount+1 })
}

const imgStyle = {
    width:"100%",
    objectFit: "cover",
    height:"15em",
    objectPosition:"0"
}

  return (
    <>
    <img
        className="d-block w-100"
        style={imgStyle}
        src={performer && performer.image}
        alt={performer && performer.name}
    />
    <Carousel.Caption style={{background:"rgba(0,0,0,0.8)"}}>
        <p className='lead' style={{color:"lightgray"}}>{performer && performer.name}</p>
        <p>
            <Button size='sm' variant='light' onClick={addView} as={Link} to={`/performerdetail/${performer && performer.id}`}>Details</Button>
        </p>
    </Carousel.Caption>
    </>
  )
}