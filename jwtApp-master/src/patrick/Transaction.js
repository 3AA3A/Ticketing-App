import { useContext } from 'react'
import UserContext from '../UserContext'
import db from '../db'
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from 'react'

const GetUsersCart = async () => {
    const { user } = useContext(UserContext)
    const username = user.id;
    var cart;
    try {
        // 3 -- do we have an unpaid Cart belonging to Customer with that username?
        cart = await db.Carts.findByUseridAndUnpaid(username);
    }
    catch (Exception) {
        // no we don't -- create one
        await db.Carts.create(() => null, { status: "unpaid", userid: username, couponid: null })
        cart = await db.Carts.findByUseridAndUnpaid(username);
    }
    return cart;
}

const Buy = async (id) => {
    const history = useHistory()
    // copy error checking code from Product Details method
    // is there an id?
    // if (id == null) {
    //     return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
    // }
    var product = await db.Products.findOne(id);
    // did we find a product with that id?
    // if (product == null) {
    //     return HttpNotFound();
    // }
    // get unpaid Cart belonging to Customer with that username
    var cart = await GetUsersCart();
    // search CartItems for existing CartItem for that cart and product
    try {
        // if found, increment quantity
        var cartitem = await db.Cartitems.findByCartidAndProductid(cart.id, product.id);
        await db.Cartitems.update(() => null, { id: cartitem.id, quantity: cartitem.quantity + 1, cartid: cartitem.cartid, productid: cartitem.productid })
    }
    catch (Exception) {
        // if not found, create it and add it
        await db.Cartitems.create(() => null, { quantity: 1, cartid: cart.cartid, productid: product.id })
    }
    // send user to Cart detail view
    history.push(`/detailcart/${cart.id}`)
}

const MyCart = async () =>
{
    const history = useHistory()
    // get user logged-in id + cart
    var cart = await GetUsersCart();
    // go to that user's shopping cart page
    history.push(`/detailcart/${cart.id}`)
}

// const GetUsersCart = async () => {
//     const { user } = useContext(UserContext)
//     const username = user.id;
//     const [cart, setCart] = useState(null)
//     try {
//         // 3 -- do we have an unpaid Cart belonging to Customer with that username?
//         setCart(await db.Carts.findByUseridAndUnpaid(username))
//     }
//     catch (Exception) {
//         // no we don't -- create one
//         await db.Carts.create(() => null, { status: "unpaid", userid: username, couponid: null })
//         setCart(await db.Carts.findByUseridAndUnpaid(username))
//     }
//     return cart;
// }

// const MyCart = async () => {
//     const history = useHistory()
//     // get user logged-in id + cart
//     const cart = await GetUsersCart();
//     // go to that user's shopping cart page
//     cart && history.push(`/detailcart/${cart.id}`) 
// }


const transaction = {
    Buy,
    MyCart
}

export default transaction