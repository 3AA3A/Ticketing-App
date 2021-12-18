import React, { useEffect, useState } from 'react'
import db from '../../db'
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


function User({ user, remove }) {

  const [validRemove, setValidRemove] = useState(false)
  useEffect(() => (async () => setValidRemove(
    (await db.Events.findByUserid(user.id)).length === 0 &&
    (await db.Favoriteevent.findByUserid(user.id)).length === 0 &&
    (await db.Historyevent.findByUserid(user.id)).length === 0 &&
    (await db.Faq.findByUserid(user.id)).length === 0 &&
    (await db.Performerreview.findByUserid(user.id)).length === 0 &&
    (await db.Favoriteperformer.findByUserid(user.id)).length === 0 &&
    (await db.Historyperformer.findByUserid(user.id)).length === 0 &&
    (await db.Coupon.findByUserid(user.id)).length === 0 &&
    (await db.Carts.findByUserid(user.id)).length === 0 &&
    (await db.Generalfeedback.findByUserid(user.id)).length === 0 &&
    user.role !== "Admin"
  ))(), [user])

  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.phone}</td>
      <td>{user.address}</td>
      <td><img src={user.image} width='80' /></td>
      <td>{user.role}</td>
      <td>
        <Button size="sm" variant="light" as={Link} to={`/detailuser/${user.id}`}>Details</Button>
        <Button size="sm" variant="light" as={Link} to={`/edituser/${user.id}`}>Edit</Button>
        <Button variant="danger" size="sm" onClick={() => remove(user.id)} disabled={!validRemove}>X</Button>
      </td>
    </tr>
  )
}

export default User;
