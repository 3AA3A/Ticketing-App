import React, { useEffect, useState } from 'react'
import db from '../../db'
import Button from 'react-bootstrap/Button';

export default function DetailCartCartitem({ cartitem, remove }) {
  
  const [product, setProduct] = useState(null)
  useEffect(() => (async () => cartitem && setProduct(await db.Products.findOne(cartitem.productid)))(), [cartitem])

  const [level, setLevel] = useState(null)
  useEffect(() => (async () => product && setLevel(await db.Levels.findOne(product.levelid)))(), [product])

  const [event, setEvent] = useState(null)
  useEffect(() => (async () => product && setEvent(await db.Events.findOne(product.eventid)))(), [product])

  return (
    <tr>
      <td>{`${event && event.name} ${level && level.name} Ticket`}</td>
      <td>{product && product.price * cartitem.quantity}</td>
      <td>{cartitem.quantity}</td>
      <td>
      <Button variant="danger" size="sm" onClick={() => remove(cartitem.id)}>X</Button>
      </td>
    </tr>
  );
}