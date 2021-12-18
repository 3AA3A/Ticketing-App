import React, { useEffect, useState } from 'react'
import db from '../../db'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from "react-router-dom";

export default function EditCart2({ id, cart }) {

  const [status, setStatus] = useState("")
  useEffect(() => cart && setStatus(cart.status), [cart])

  const [user, setUser] = useState("")
  useEffect(() => (async () => cart && setUser(await db.Users.findOne(cart.userid)))(), [cart])

  const options = ["unpaid", "paid"]

  const history = useHistory()

  const update = async () => {
    coupon.coupcode === "" ? await db.Carts.update(() => null, { id, status, userid: user.id, couponid: null })
      : await db.Carts.update(() => null, { id, status, userid: user.id, couponid: coupon.coupcode })
    history.push("/carts")
  }

  const [validUpdate, setValidUpdate] = useState(false)
  useEffect(() => (async () => setValidUpdate(
    status !== "" &&
    await db.Carts.findOne(id) !== undefined
  ))(), [id, status])

  const [coupon, setCoupon] = useState("")
  useEffect(() => (async () => cart && cart.couponid === null ? setCoupon({ coupcode: "" }) : setCoupon(await db.Coupon.findOne(cart.couponid)))(), [cart])

  return (
    <div>
      <h1>Edit {user.name}'s Cart</h1>
      <dl className="row">
        <dt className="col-sm-3">Status</dt>
        <dd className="col-sm-9">
          {
            options.map(stat =>
              <Form.Check type="radio" key={stat} label={stat} value={stat} checked={status === stat} name="status" onChange={event => setStatus(event.target.value)} inline />
            )
          }
          {/* <Form.Control as="select" value={status} onChange={event => setStatus(event.target.value)}>
            {
              options.map(stat =>
                <option key={stat} value={stat}>{stat}</option>
              )
            }
          </Form.Control> */}
        </dd>
        <dt className="col-sm-3">User</dt>
        <dd className="col-sm-9"><Form.Control size="sm" type="text" disabled value={user.name} /></dd>
        <dt className="col-sm-3">Coupon</dt>
        <dd className="col-sm-9"><Form.Control size="sm" type="text" disabled value={coupon.coupcode} /></dd>
      </dl>
      <Button size="sm" variant="light" onClick={update} disabled={!validUpdate}>Update</Button>

      <Button size="sm" variant="link" as={Link} to={'/carts'}>Back to Carts List</Button>
    </div >
  );
}