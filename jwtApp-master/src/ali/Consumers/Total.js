import React, { useRef ,useEffect, useState } from 'react'
import db from '../../db'
import Button from 'react-bootstrap/Button';
import Last from './Last'
export default function Total({ cartitems }) {
  
//   const [cartitems, setCartitems] = useState([])
//   useEffect(() => (async () => id && setCartitems(await db.Cartitems.findByCartid(id)))(), [id])

// console.log(cartitems)

// const [product, setProduct] = useState(null)
//   useEffect(() => (async () => cartitems && setProduct(await db.Products.findAll(cartitems.productid)))(), [cartitems])
const [product, setProduct] = useState(null)
useEffect(() => (async () => cartitems && setProduct(await db.Products.findOne(cartitems.productid)))(), [cartitems])
  return (
    product && product.price * cartitems.quantity
    
    
              
         
        
    
      
  );
}