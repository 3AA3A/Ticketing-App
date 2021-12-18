import React, { useContext, useEffect, useState } from 'react'
import db from '../../db'
import Table from 'react-bootstrap/Table';
import UserContext from '../../UserContext'
import Cart from './Cart'
import { Alert } from 'react-bootstrap';

export default function Carts() {

  const { user } = useContext(UserContext)

  const [carts, setCarts] = useState([])
  useEffect(() => (async () => setCarts(await db.Carts.findByUserid(user.id)))(), [user])

  // const remove = async id => await db.Carts.remove(setCarts, id)

  const remove = async (id) => {
    await db.Carts.remove(() => null, id)
    setCarts(await db.Carts.findByUserid(user.id))
  }

  return (
    <div>
      <br></br>
      <h1>My Carts</h1>
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
              carts
                .map(cart =>
                  <Cart key={cart.id} cart={cart} remove={remove} />
                )
            }
          </tbody>
        </Table> : <Alert variant='warning'>You have no carts yet.</Alert>}
    </div >
  );
}