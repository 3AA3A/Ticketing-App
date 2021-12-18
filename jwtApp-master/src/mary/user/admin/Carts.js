import React, { useEffect, useState } from 'react'
import db from '../../../db'
import Table from 'react-bootstrap/Table';
import Cart from './Cart'

export default function Carts() {

  const [carts, setCarts] = useState([])
  useEffect(() => (async () => setCarts(await db.Carts.findAll()))(), [])

  const remove = async id => await db.Carts.remove(setCarts, id)

  return (
    <div>
      <h1>List of Carts</h1>
      { carts.length > 0 ?
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>Status</th>
            <th>Quantity</th>
            <th>User</th>
            <th>Coupon Code</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            carts.map(cart =>
              <Cart key={cart.id} cart={cart} remove={remove} />
            )
          }
        </tbody>
      </Table> : <p>Carts database is empty</p> }
    </div >
  );
}