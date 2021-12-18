import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../UserContext'
import db from '../../db'
import Table from 'react-bootstrap/Table';
import Faqs from './Faqs'
import GeneralFeed from './GeneralFeed'

export default function Support() {

const { user } = useContext(UserContext)
  const [faq, setFaq] = useState([])
  const [feeds, setFeeds] = useState([])

  useEffect(() => (async () => setFaq(await db.Faq.findAll()))(), [])

  useEffect(() => (async () => setFeeds(await db.Generalfeedback.findAll()))(), [])
console.log(faq)
  return (
    user &&
    <>
      <h1>Welcome {user.name}</h1>
      
    <h4>Follow-up on and Respond to any Questions Users may have</h4>
      <h1>Latest FAQ's</h1>
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>User</th>
            <th>Question</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {
            faq.map(fqs => <Faqs key={fqs.id} fqs={fqs} />)
          }
        </tbody>
      </Table>

      <h1>Most Recent General Feedback</h1>
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>User</th>
            <th>Date Posted</th>
            <th>Title</th>
            <th>Feedback</th>
            <th>Reply</th>
            <th>Viewed</th>
          </tr>
        </thead>
        <tbody>
          {
            feeds.map(feed => <GeneralFeed key={feed.id} feed={feed} />)
          }
        </tbody>
      </Table>
    </>
  )
}