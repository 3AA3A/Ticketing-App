import React, { useState, useEffect } from 'react'
import {Card, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import db from '../../db';

export default function Product({ product }) {

  const [level, setLevel] = useState(null)

  useEffect(() => (async () => product && setLevel(await db.Levels.findOne(product.levelid)))(), [product])

  const wrapStyle = {
    minWidth: "30.7%",
    flexGrow: 0,
    marginBottom:"3%"
  };

  const [promotion, setPromotion] = useState(null)
  useEffect(() => (async () => {
    try {
      product && setPromotion(await db.Promotion.findByEventidAndDatefromBeforeAndDatetoAfter(product.eventid, new Date(), new Date()))
    }
    catch (Exception) {
    }
  })(), [product])

  return (
    <Card style={wrapStyle}>
      <Card.Body>
        <dt>{level && level.name}</dt> <dd>{level && level.desc}</dd>
        <dt>Price</dt> <dd>{promotion ? product.price - promotion.discountamount : product.price} {promotion ? `(-${promotion.discountamount})` : null}</dd>
        { product.amount != 0 ?
        <Button size="sm" variant="success" as={Link} to={`/register`}>Purchase</Button>
        :
        <Button size="sm" variant="danger" disabled>Out of Stock</Button>
        }
      </Card.Body>
    </Card>
  )
}