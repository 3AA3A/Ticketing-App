import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../UserContext'
import db from '../../db'
import { Table, Button, Card } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import DetailCartCartitem from './DetailCartCartitem'
import DetailCart2 from './DetailCart2'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';

export default function DetailCart() {

  const history = useHistory()

  const { user } = useContext(UserContext)
  const username = user.id;

const arrg = []

  const [cart, setCart] = useState(null)
  useEffect(() => (async () => {
    try {
      // do we have an unpaid Cart belonging to Customer with that username?
      setCart(await db.Carts.findByUseridAndUnpaid(username));
    }
    catch (Exception) {
      // no we don't -- create one
      await db.Carts.create(() => null, { status: "unpaid", userid: username, couponid: null })
      setCart(await db.Carts.findByUseridAndUnpaid(username));
    }
  })(), [user])

  const [cartitems, setCartitems] = useState([])
  useEffect(() => (async () => cart && setCartitems(await db.Cartitems.findByCartid(cart.id)))(), [cart])
  
  const [product, setProduct] = useState(null)
  useEffect(() => (async () => setProduct(await db.Products.findAll()))(), [])

  const remove = async (id) => {
    await db.Cartitems.remove(() => null, id)
    setCartitems(await db.Cartitems.findByCartid(cart.id))
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [coupcode, setCoupcode] = useState("")
  useEffect(() => (async () => cart && cart.couponid ? setCoupcode((await db.Coupon.findOne(cart.couponid)).coupcode) : setCoupcode(""))(), [cart])
  // useEffect(() => cart && setCoupcode(cart.couponid), [cart])

  const [coupon, setCoupon] = useState(null)
  useEffect(() => (async () => setCoupon((await db.Coupon.findByCoupcodeAndDatevalidIsAfter(coupcode, new Date()))[0]))(), [coupcode])

  const update = async () => {
    await db.Carts.update(() => null, { id: cart.id, status: cart.status, userid: cart.userid, couponid: coupon.id })
    setCart(await db.Carts.findByUseridAndUnpaid(username));
    handleClose()
    // document.location.reload()
  }

  const [validUpdate, setValidUpdate] = useState(false)
  useEffect(() => (async () => setValidUpdate(
    (await db.Coupon.findByCoupcodeAndDatevalidIsAfter(coupcode, new Date())).length > 0
  ))(), [coupcode])

  const removeCartCoupon = async () => {
    await db.Carts.update(() => null, { id: cart.id, status: cart.status, userid: cart.userid, couponid: null })
    setCart(await db.Carts.findByUseridAndUnpaid(username));
    setCoupcode("")
  }

  const checkout = async () => {
    await db.Carts.update(() => null, { id: cart.id, status: "paid", userid: cart.userid, couponid: cart.couponid })
    history.push(`/detailcart/${cart.id}`)
    // document.location.reload()
  }

  const [validCheckout, setvalidCheckout] = useState(false)
  useEffect(() => (async () => setvalidCheckout(
    cart &&
    cart.status === "unpaid" &&
    cartitems.length > 0
  ))(), [cartitems])

const total = () => {
   var tots = 0
  for(var i = 0; i < cartitems.length; i++){
    
    for(var x = 0; x < product.length; x++){
      if (cartitems[i].productid == product[x].id)
      {tots += product[x].price * cartitems[i].quantity}
      
    }
  }
  
  if (coupon) {tots = tots - (tots * coupon.discount / 100)}
  return tots
}

  return (
    cart ?
      <div>
        <br></br>
        <h1 className='display-4'>{user && user.name}'s Cart</h1>
        <div className='row'>
          <div className='col-md-9'>
            <Card>
              <Card.Header>Items</Card.Header>
              <Card.Body>
                {cartitems.length > 0 ?
                  <>
                    <Table striped hover variant="light" size="sm">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          cartitems.map(cartitem =>
                            <DetailCartCartitem key={cartitem.id} cartitem={cartitem} remove={remove} cart={cart} />
                          )
                        }
                      </tbody>
                    </Table>
                    Total: {total()}
                            
                          
                        
                  </>
                  : <p className='text-muted'>This cart doesn't have items yet</p>
                }
              </Card.Body>
            </Card>
          </div>
          <div className='col-md-3'>
            <Card>
              <Card.Body>
                <dt>Status</dt>
                <dd>{cart.status}</dd>
                <dt>User</dt>
                <dd>{user && user.name}</dd>
                {cart.couponid !== null ? <DetailCart2 cart={cart} /> : <span className='text-muted'>No coupon used</span>}
                <br />
                {cart.status === "unpaid" ?
                  cart.couponid !== null ?
                    <>
                      <Button variant="link" onClick={removeCartCoupon} size="sm">
                        Remove Coupon
                  </Button>
                      <Button variant="link" onClick={handleShow} size="sm">
                        Change Coupon
                  </Button>
                    </>
                    :
                    <Button variant="link" onClick={handleShow} size="sm">
                      Add Coupon
                  </Button>
                  : null
                }

                <Modal show={show} onHide={handleClose} centered>
                  <Modal.Header closeButton>
                    {cart.couponid !== null ?
                      <Modal.Title>Change the Coupon of your Cart</Modal.Title>
                      : <Modal.Title>Add Coupon to your Cart</Modal.Title>}
                  </Modal.Header>
                  <Modal.Body>
                    Enter Coupon Code:
                  <Form.Control size="sm" type="text" value={coupcode} onChange={event => setCoupcode(event.target.value)} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Go Back
                    </Button>
                    <Button variant="primary" onClick={update} disabled={!validUpdate}>
                      {cart.couponid !== null ?
                        <>Change Coupon</>
                        : <>Add Coupon</>}
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Card.Body>
            </Card>
          </div>
        </div>

        <Button variant="light" as={Link} to={'/carts'}>Back to Carts List</Button>
        {cart.status === "unpaid" ?
          <Button variant="success" onClick={checkout} disabled={!validCheckout}>Checkout</Button>
          : null}
      </div >
      :
      <p>
        <Spinner animation="border" variant="dark" /> &nbsp;
    Please wait...
    </p>
  );
}