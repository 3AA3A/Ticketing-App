import React, { useEffect, useState } from 'react'
import db from '../../db'
import Button from 'react-bootstrap/Button';
import { Link, useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import DetailCartCartitem from './DetailCartCartitem'
import DetailCart2 from './DetailCart2'
import Spinner from 'react-bootstrap/Spinner'

export default function DetailCart() {

  const { id } = useParams();

  const [cart, setCart] = useState(null)
  useEffect(() => (async () => setCart(await db.Carts.findOne(id)))(), [id])

  const [user, setUser] = useState(null)
  useEffect(() => (async () => cart && setUser(await db.Users.findOne(cart.userid)))(), [cart])

  const [cartitems, setCartitems] = useState([])
  useEffect(() => (async () => setCartitems(await db.Cartitems.findByCartid(id)))(), [id])

  const remove = async (id) => {
    await db.Cartitems.remove(() => null, id)
    setCartitems(await db.Cartitems.findByCartid(cart.id))
  }

  return (
    cart ?
    <div>
      <h1>{user && user.name}'s Cart Details</h1>
      <dl className="row">
        <dt className="col-sm-3">Status</dt>
        <dd className="col-sm-9">{cart.status}</dd>
        <dt className="col-sm-3">User</dt>
        <dd className="col-sm-9">{user && user.name}</dd>
        <DetailCart2 cart={cart} />
      </dl>
      {cartitems.length > 0 ?
        <>
          <h3>Cart Items</h3>
          <Table striped bordered hover variant="dark" size="sm">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                cartitems.map(cartitem =>
                  <DetailCartCartitem key={cartitem.id} cartitem={cartitem} remove={remove} />
                )
              }
            </tbody>
          </Table>
        </>
        : <h3>This cart doesn't have items yet</h3>
      }
      <Button size="sm" variant="link" as={Link} to={'/carts'}>Back to Carts List</Button>
    </div >
    :
    <p>
    <Spinner animation="border" variant="dark" /> &nbsp;
    Please wait...
    </p>
  );
}