import React, { useEffect, useState } from 'react'
import db from '../../db'
import PerformerReview from './PerformerReview'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { Link } from "react-router-dom";

export default function PerformerReviews() {

  const [performerreviews, setPerformerreviews] = useState([])
  const [review, setReview] = useState("")
  const [from, setFrom] = useState(new Date(1999, 10, 5))
  const [to, setTo] = useState(new Date())
  const [user, setUser] = useState("")
  const [performerid, setPerformerid] = useState(0)
  const [newperformers, setNewPerformers] = useState([])

  useEffect(() => (async () => setNewPerformers(await db.Performer.findAll()))(), [])
  useEffect(() => (async () => setPerformerreviews(await db.Performerreview.findByReviewContainsAndRevdateBetweenAndUserNameContainsAndPerformerid(review, from, to, user, performerid)))(), [review, from, to, user, performerid])
  // useEffect(() => (async () => setPerformerreviews(await db.Performerreview.findAll(review, from, to, user, performerid)))(), [])

  const remove = async (id) => {
    await db.Performerreview.remove(() => null, id)
    setPerformerreviews(await db.Performerreview.findByReviewContainsAndRevdateBetweenAndUserNameContainsAndPerformerid(review, from, to, user, performerid))
  }

  return (
    <div>
      <br></br>
      <h2>Search By:</h2>
      <dl className='row'>
        <dt className='col-sm-3'>Review</dt>
        <dd className='col-sm-9'><Form.Control placeholder='Review' type="text" size='sm' value={review} onChange={event => setReview(event.target.value)} /></dd>
        <dt className='col-sm-3'>Review Date</dt>
        <dd className='col-sm-9'>
          <Form>
            <Form.Row>
              <Col>
                From:
            <Form.Control size="sm" type="date" onChange={event => setFrom(new Date(event.target.value))} placeholder="From" value={from.toISOString().slice(0, 10)} />
              </Col>
              <Col>
                To:
            <Form.Control size="sm" type="date" onChange={event => setTo(new Date(event.target.value))} placeholder="To" value={to.toISOString().slice(0, 10)} />
              </Col>
            </Form.Row>
          </Form>
        </dd>
        <dt className='col-sm-3'>Performer</dt>
        <dd className='col-sm-9'>
          <Form.Control size='sm' value={performerid} as="select" onChange={event => setPerformerid(1 * event.target.value)}>
            <option key={0} value={0}>Select Performer</option>
            {
              newperformers.filter(n => n.image !== "/default.png").map(item =>
                <option key={item.id} value={item.id}>{item.name}</option>
              )
            }
          </Form.Control>
        </dd>
        <dt className='col-sm-3'>User</dt>
        <dd className='col-sm-9'><Form.Control placeholder='User' type="text" size='sm' value={user} onChange={event => setUser(event.target.value)} /></dd>
      </dl>

      <h1>Performer Reviews</h1>
      { performerreviews.length > 0 ?
        <Table striped hover variant="light" size="sm">
          <thead>
            <tr>
              <th>Review</th>
              <th>Review Date</th>
              <th>Performer</th>
              <th>User</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              performerreviews
                .map(review =>
                  <PerformerReview key={review.id} review={review} remove={remove} />
                )
            }
          </tbody>
        </Table>
        : <Alert variant='warning'>There are no customer reviews yet for that performer.</Alert>
      }
    </div>
  )
}