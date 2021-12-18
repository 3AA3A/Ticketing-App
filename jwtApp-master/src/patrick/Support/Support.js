import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../UserContext'
import db from '../../db'
import Table from 'react-bootstrap/Table';
import Faqs from './Faqs'
import GeneralFeed from './GeneralFeed'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'

export default function Support() {

const { user } = useContext(UserContext)
  const [faq, setFaq] = useState([])
  const [feeds, setFeeds] = useState([])

  useEffect(() => (async () => setFaq(await db.Faq.findAll()))(), [])
  useEffect(() => (async () => setFeeds(await db.Generalfeedback.findAll()))(), [])

  return (
    user ?
    <>
     <Jumbotron>
        <h1>Welcome, {user.name}!</h1>
        <p>
          Follow-up on and respond to any questions users may have
        </p>
        <p>
          <Button variant="primary" as={Link} to={'/myfaqs'}>View my FAQs</Button>
        </p>
      </Jumbotron>

      <h4>Latest FAQs</h4>
      <Table striped hover variant="light" size="sm">
        <thead>
          <tr>
            <th>User</th>
            <th>Question</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {
            faq.slice(Math.max(faq.length - 5, 0)).map(fqs => <Faqs key={fqs.id} fqs={fqs} />)
          }
        </tbody>
      </Table>

      <h4>Most Recent Feedbacks</h4>
      <Table striped hover variant="light" size="sm">
        <thead>
          <tr>
            <th>User</th>
            <th>Date Posted</th>
            <th>Title</th>
            <th>Feedback</th>
            <th>Reply</th>
            <th>Viewed?</th>
          </tr>
        </thead>
        <tbody>
          {
            feeds.slice(Math.max(feeds.length - 5, 0)).map(feed => <GeneralFeed key={feed.id} feed={feed} />)
          }
        </tbody>
      </Table>
    </>
    :
    <p>
    <Spinner animation="border" variant="dark" /> &nbsp;
    Please wait...
    </p>
  )
}