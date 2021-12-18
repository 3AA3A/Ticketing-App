// Note: I had to create this additional js cuz there may be cases of coupons being <null> (no coupons used for a cart)
import React, { useEffect, useState } from 'react'
import db from '../../db'

export default function DetailCart2({ cart }) {

  const [coupon, setCoupon] = useState(null)
  useEffect(() => (async () => cart && cart.couponid === null ? setCoupon({coupcode: ""}) : setCoupon(await db.Coupon.findOne(cart.couponid)))(), [cart])

  return (
    cart &&
    <>
      <dt className="col-sm-3">Coupon</dt>
      <dd className="col-sm-9">{coupon && coupon.coupcode}</dd>
    </>
  );
}