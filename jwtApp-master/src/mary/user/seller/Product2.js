import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import db from '../../../db';
import Button from 'react-bootstrap/Button'

export default function Product2({ product }) {
    const [level, setLevel] = useState(null)
    useEffect(() => (async () => setLevel(await db.Levels.findOne(product.levelid)))(), [product])

  return (
    <>
    <td>{level && level.name}</td>
    <td>{level && level.desc}</td>
    <td>{product.price}</td>
    </>
  )
}