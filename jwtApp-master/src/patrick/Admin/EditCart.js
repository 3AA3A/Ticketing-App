import React, { useEffect, useState } from 'react'
import db from '../../db'
import { useParams } from "react-router-dom";
import EditCart2 from './EditCart2'
import Spinner from 'react-bootstrap/Spinner'

export default function EditCart() {

  const { id } = useParams();

  const [cart, setCart] = useState(null)
  useEffect(() => (async () => setCart(await db.Carts.findOne(id)))(), [id])

  return (
    cart ?
    <EditCart2 id={id} cart={cart} />
    :
    <p>
    <Spinner animation="border" variant="dark" /> &nbsp;
    Please wait...
    </p>
  );
}