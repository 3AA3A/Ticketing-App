import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../UserContext'
import { Card, Button, Badge } from 'react-bootstrap';
import { Link, useParams, useHistory } from "react-router-dom";
import db from '../../db';

export default function Product({ product }) {

  const [level, setLevel] = useState(null)

  useEffect(() => (async () => product && setLevel(await db.Levels.findOne(product.levelid)))(), [product])

  const wrapStyle = {
    minWidth: "30.7%",
    flexGrow: 0,
    marginBottom: "3%"
  };

  const history = useHistory()

  const { user } = useContext(UserContext)
  const username = user.id;

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
  const buyproduct = async (productid) => {
    try {
      // if found, increment quantity
      const cartitem = await db.Cartitems.findByCartidAndProductid(cart.id, productid)
      // setCartitem(await db.Cartitems.findByCartidAndProductid(cart.id, productid));
      await db.Cartitems.update(() => null, { id: cartitem.id, quantity: cartitem.quantity + 1, cartid: cartitem.cartid, productid: cartitem.productid })
    }
    catch (Exception) {
      console.log(Exception)
      // if not found, create it and add it
      await db.Cartitems.create(() => null, { quantity: 1, cartid: cart.id, productid: productid })
    }
    history.push(`/detailcart/${cart.id}`)
  }

  const [promotion, setPromotion] = useState(null)
  useEffect(() => (async () => {
    try {
      product && setPromotion(await db.Promotion.findByEventidAndDatefromBeforeAndDatetoAfter(product.eventid, new Date(), new Date()))
    }
    catch (Exception) {
    }
  })(), [product])

  return (
    <Card style={wrapStyle}>
      <Card.Body>
        <dt>{level && level.name}</dt> <dd>{level && level.desc}</dd>
        <dt>Price</dt> <dd>{promotion ? product.price - promotion.discountamount : product.price} {promotion ? `(-${promotion.discountamount})` : null}</dd>
        {/* <Button size="sm" variant="success" as={Link} to={`/buyproduct/${product.id}`}>Purchase</Button> */}
        { product.amount != 0 ?
        <Button size="sm" variant="success" onClick={() => buyproduct(product.id)}>Purchase</Button>
        :
        <Button size="sm" variant="danger" disabled>Out of Stock</Button>
        }
      </Card.Body>
    </Card>
  )
}