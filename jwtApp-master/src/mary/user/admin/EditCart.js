import React, { useEffect, useState } from 'react'
import db from '../../../db'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory, useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'

export default function EditCart() {

  const { id } = useParams();

  const [users, setUsers] = useState([])
  const [coupons, setCoupons] = useState([])
  useEffect(() => (async () => setUsers(await db.Users.findAll()))(), [])
  useEffect(() => (async () => setCoupons(await db.Coupon.findAll()))(), [])

  const [cart, setCart] = useState(null)
  useEffect(() => (async () => setCart(await db.Carts.findOne(id)))(), [id])

  const [status, setStatus] = useState("")
  useEffect(() => cart && setStatus(cart.status), [cart])

  const [amount, setAmount] = useState(0)
  useEffect(() => cart && setAmount(cart.amount), [cart])

  const [user, setUser] = useState("")
  useEffect(() => (async () => cart && setUser(await db.Users.findOne(cart.userid))), [cart])

  const [coupon, setCoupon] = useState("")
  useEffect(() => (async () => cart && setCoupon(await db.Coupon.findOne(cart.couponid))), [cart])

  const options = ["unpaid", "paid"]

  const history = useHistory()

  const update = async () => {
    await db.Carts.update(() => null, { id, status, amount, user, coupon })
    history.push("/carts")
  }

  const [validUpdate, setValidUpdate] = useState(false)
  useEffect(() => (async () => setValidUpdate(
    status !== "" &&
    amount >= 0 &&
    await db.Carts.findOne(id) !== undefined
  ))(), [id, status, amount])

  return (
    cart ?
    <div>
      <h1>Edit {user.name}'s Cart</h1>
      <dl className="row">
        <dt className="col-sm-3">Status</dt>
        <dd className="col-sm-9">
          <Form.Control as="select" value={status} onChange={event => setStatus(event.target.value)}>
            {
              options.map(stat =>
                <option key={stat} value={stat}>{stat}</option>
              )
            }
          </Form.Control>
        </dd>
        <dt className="col-sm-3">Amount</dt>
        <dd className="col-sm-9"><Form.Control size="sm" type="number" onChange={event => setAmount(1 * event.target.value)} value={amount} /></dd>
        <dt className="col-sm-3">User</dt>
        <dd className="col-sm-9"><Form.Control size="sm" type="text" disabled value={user.name} /></dd>
        <dt className="col-sm-3">Coupon</dt>
        <dd className="col-sm-9"><Form.Control size="sm" type="text" disabled value={coupon.coupcode} /></dd>
        {/* <dd className="col-sm-9">
          <Form.Control as="select" value={role} onChange={event => setRole(event.target.value)}>
            {
              roles.map(role =>
                <option key={role} value={role}>{role}</option>
              )
            }
          </Form.Control>
        </dd> */}
      </dl>
      <Button size="sm" variant="light" onClick={update} disabled={!validUpdate}>Update</Button>
    </div >
    :
    <p>
    <Spinner animation="border" variant="dark" /> &nbsp;
    Please wait...
    </p>
  );
}