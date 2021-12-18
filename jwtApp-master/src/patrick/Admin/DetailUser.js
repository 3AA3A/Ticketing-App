import React, { useEffect, useState } from 'react'
import db from '../../db'
import Button from 'react-bootstrap/Button';
import { Link, useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import DetailUserCart from './DetailUserCart'
import DetailUserEvent from './DetailUserEvent'
import Spinner from 'react-bootstrap/Spinner'

export default function DetailUser() {

  const { id } = useParams();

  const [user, setUser] = useState(null)
  useEffect(() => (async () => setUser(await db.Users.findOne(id)))(), [id])

  const [carts, setCarts] = useState([])
  useEffect(() => (async () => setCarts(await db.Carts.findByUserid(id)))(), [id])

  const [events, setEvents] = useState([])
  useEffect(() => (async () => setEvents(await db.Events.findByUserid(id)))(), [id])

  const [faqs, setFaqs] = useState([])
  useEffect(() => (async () => setFaqs(await db.Faq.findByUserid(id)))(), [id])

  return (
    user ?
    <div>
      <h1>{user.name}'s Details</h1>
      <dl className="row">
        <dt className="col-sm-3">Email</dt>
        <dd className="col-sm-9">{user.id}</dd>
        <dt className="col-sm-3">Name</dt>
        <dd className="col-sm-9">{user.name}</dd>
        <dt className="col-sm-3">Phone</dt>
        <dd className="col-sm-9">{user.phone}</dd>
        <dt className="col-sm-3">Address</dt>
        <dd className="col-sm-9">{user.address}</dd>
        <dt className="col-sm-3">Image</dt>
        <dd className="col-sm-9"><img src={user.image} width='150'/></dd>
        <dt className="col-sm-3">Role</dt>
        <dd className="col-sm-9">{user.role}</dd>
      </dl>
        {
          user.role === "Customer" ?
            <>
              {carts.length > 0 ?
                <>
                  <h3>{user.name}'s Carts</h3>
                  <Table striped bordered hover variant="dark" size="sm">
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Coupon Code</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        carts.map(cart =>
                          <DetailUserCart key={cart.id} cart={cart} />
                        )
                      }
                    </tbody>
                  </Table>
                </>
                : <h3>This customer doesn't have a cart yet</h3>
              }
            </>
            : user.role === "Seller" ?
              <>
                {events.length > 0 ?
                  <>
                    <h3>{user.name}'s Events</h3>
                    <Table striped bordered hover variant="dark" size="sm">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Genre</th>
                          <th>Venue</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          events.map(event =>
                            <DetailUserEvent key={event.id} event={event} />
                          )
                        }
                      </tbody>
                    </Table>
                  </>
                  : <h3>This seller haven't hosted an event yet</h3>
                }
              </>
              : user.role === "Support" ?
                <>
                  {faqs.length > 0 ?
                    <>
                      <h3>{user.name}'s Posted Faqs</h3>
                      <Table striped bordered hover variant="dark" size="sm">
                        <thead>
                          <tr>
                            <th>Question</th>
                            <th>Answer</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            faqs.map(faq =>
                              <tr>
                                <td>{faq.question}</td>
                                <td>{faq.answer}</td>
                              </tr>
                            )
                          }
                        </tbody>
                      </Table>
                    </>
                    : <h3>This seller haven't hosted an event yet</h3>
                  }
                </>
                : null
        }
      <Button size="sm" variant="link" as={Link} to={'/users'}>Back to Users List</Button>
    </div >
    :
    <p>
    <Spinner animation="border" variant="dark" /> &nbsp;
    Please wait...
    </p>
  );
}