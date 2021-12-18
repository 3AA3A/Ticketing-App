import React, { useEffect, useState } from 'react'
import db from '../../db'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


function Cart({ cart, remove }) {
  const [user, setUser] = useState(null)
  const [coupon, setCoupon] = useState(null)

  useEffect(() => (async () => cart && setUser(await db.Users.findOne(cart.userid)))(), [cart])
  useEffect(() => (async () => cart && cart.couponid === null ? setCoupon({coupcode: ""}) : setCoupon(await db.Coupon.findOne(cart.couponid)))(), [cart])

  const [validRemove, setValidRemove] = useState(false)
  useEffect(() => (async () => setValidRemove(
    (await db.Cartitems.findByCartid(cart.id)).length === 0
  ))(), [cart])

  return (
    <tr>
      <td>{cart.status}</td>
      <td>{user && user.name}</td>
      <td>{coupon && coupon.coupcode}</td>
      <td>
      <Button size="sm" variant="light" as={Link} to={`/detailcart/${cart.id}`}>Details</Button>
      <Button size="sm" variant="light" as={Link} to={`/editcart/${cart.id}`}>Edit</Button>
      <Button variant="danger" size="sm" onClick={() => remove(cart.id)} disabled={!validRemove}>X</Button>
      </td>
    </tr>
  )
}

export default Cart;
