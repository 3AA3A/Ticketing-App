import React, { useEffect, useState } from 'react'
import db from '../../db'
import Table from 'react-bootstrap/Table';
import Cart from './Cart'
import { Form, Alert } from 'react-bootstrap';

export default function Carts() {

  const [status, setStatus] = useState("")
  const options = ["unpaid", "paid"]
  const [name, setName] = useState("")

  const [carts, setCarts] = useState([])
  useEffect(() => (async () => setCarts(await db.Carts.findByUserNameContains(name)))(), [name])

  // const remove = async id => await db.Carts.remove(setCarts, id)
  const remove = async (id) => {
    await db.Carts.remove(() => null, id)
    setCarts(await db.Carts.findByUserNameContains(name))
  }

  return (
    <div>
      <br></br>
      <h2>Search By:</h2>
      <dl className="row">
        <dt className="col-sm-3">Status</dt>
        <dd className="col-sm-9">
          <Form.Check type="radio" key="" label="All" value="" name="status" onChange={event => setStatus(event.target.value)} inline checked={status === ""} />
          {
            options.map(stat =>
              <Form.Check type="radio" key={stat} label={stat} value={stat} name="status" onChange={event => setStatus(event.target.value)} inline />
            )
          }
          {/* <Form.Control as="select" value={status} onChange={event => setStatus(event.target.value)}>
            <option key="" value="">All</option>
            {
              options.map(stat =>
                <option key={stat} value={stat}>{stat}</option>
              )
            }
          </Form.Control> */}
        </dd>
        <dt className="col-sm-3">User</dt>
        <dd className="col-sm-9"><Form.Control size="sm" type="text" onChange={event => setName(event.target.value)} value={name} /></dd>
      </dl>
      <h1>List of Carts</h1>
      {carts.length > 0 ?
        <Table striped hover variant="light" size="sm">
          <thead>
            <tr>
              <th>Status</th>
              <th>User</th>
              <th>Coupon Code</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              status === "" ?
                carts.map(cart =>
                  <Cart key={cart.id} cart={cart} remove={remove} />
                )
                : status === "paid" ?
                  carts
                    .filter(cart => cart.status === "paid")
                    .map(cart =>
                      <Cart key={cart.id} cart={cart} remove={remove} />
                    )
                  :
                  carts
                    .filter(cart => cart.status === "unpaid")
                    .map(cart =>
                      <Cart key={cart.id} cart={cart} remove={remove} />
                    )
            }
          </tbody>
        </Table> : <Alert variant='warning'>Carts database is empty</Alert>}
    </div >
  );
}