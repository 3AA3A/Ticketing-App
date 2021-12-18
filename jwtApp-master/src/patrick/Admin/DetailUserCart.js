import React, { useEffect, useState } from 'react'
import db from '../../db'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default function DetailUserCart({ cart }) {
  
  const [coupon, setCoupon] = useState(null)
  useEffect(() => (async () => cart && cart.couponid === null ? setCoupon("") : setCoupon(await db.Coupon.findOne(cart.couponid)))(), [cart])

  return (
    <tr>
      <td>{cart.status}</td>
      <td>{coupon && coupon.coupcode}</td>
      <td>
      <Button size="sm" variant="light" as={Link} to={`/detailcart/${cart.id}`}>Details</Button>
      </td>
    </tr>
  );
}