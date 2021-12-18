import React, { useContext, useEffect, useState } from 'react'
import db from '../../db'
import Form from 'react-bootstrap/Form'
import Feedback from './Feedback'
import {Card,Accordion} from 'react-bootstrap'
import UserContext from '../../UserContext'

export default function Feedbacks() {

  const { user } = useContext(UserContext)

  const [title, setTitle] = useState("")

  const [feedbacks, setFeedbacks] = useState([])
  useEffect(() => (async () => setFeedbacks(await db.Generalfeedback.findByUseridAndTitleContains(user.id, title)))(), [user, title])

  return (
    <div>
      <br></br>
      <h1 className='display-4'>My Feedbacks</h1>
      <div className='row'>
        <div className='col-md-3'>
          <Card>
            <Card.Header>Search</Card.Header>
            <Card.Body>
              <Form.Control size="sm" placeholder='Title' onChange={event => setTitle(event.target.value)} value={title} />
            </Card.Body>
          </Card>
        </div>
        <div className='col-md-9'>
          <Accordion>
            {
              feedbacks
                .map(feedback =>
                  <Feedback key={feedback.id} feedback={feedback} />)
            }
          </Accordion>
        </div>
      </div>

      
    </div >
  );
}