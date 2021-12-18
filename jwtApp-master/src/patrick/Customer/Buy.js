import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../UserContext'
import db from '../../db'
import Button from 'react-bootstrap/Button';
import { Link, useParams, useHistory } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import DetailCartCartitem from './DetailCartCartitem'
import Buy2 from './Buy2'

export default function Buy() {

  // receiving product id
  const { id } = useParams();
  // const history = useHistory()

  const { user } = useContext(UserContext)
  const username = user.id;

  // get current user's unpaid cart
  const [cart, setCart] = useState(null)
  useEffect(() => (async () => {
    try {
      setCart(await db.Carts.findByUseridAndUnpaid(username));
    }
    catch (Exception) {
      await db.Carts.create(() => null, { status: "unpaid", userid: username, couponid: null })
      setCart(await db.Carts.findByUseridAndUnpaid(username));
    }
  })(), [user])

  // const [cartitem, setCartitem] = useState(null)
  // useEffect(() => (async () => {
  //   cart &&
  //   setProduct(await db.Products.findOne(id))
  //   try {
  //     // if found, increment quantity
  //     cart && setCartitem(await db.Cartitems.findByCartidAndProductid(cart.id, id));
  //     cart && await db.Cartitems.update(() => null, { id: cartitem.id, quantity: cartitem.quantity + 1, cartid: cartitem.cartid, productid: cartitem.productid })
  //   }
  //   catch (Exception) {
  //     // if not found, create it and add it
  //     cart && await db.Cartitems.create(() => null, { quantity: 1, cartid: cart.cartid, productid: id })
  //   }
  //   history.push(`/detailcart/${cart.id}`)
  // })(), [cart])

  return (
    // null
    cart && <Buy2 cart={cart} id={id} />
  );
}