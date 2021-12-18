import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion'
import db from '../../db'
import Card from 'react-bootstrap/Card'


export default function Feedback({ feedback }) {

  const [user, setUser] = useState(null)
  useEffect(() => (async () => feedback && setUser(await db.Users.findOne(feedback.userid)))(), [feedback])

  return (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={feedback.id}>
          {feedback.title}
          <span style={{ float: 'right' }}>
            {feedback.datemade.toDateString().split(" ").splice(1).join(" ")}
          </span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={feedback.id}>
          <Card.Body>
            <span style={{ float: 'right' }}>
              {user && user.name}
            </span>
            <h4>Feedback</h4>
            <p>{feedback.feedback}</p>
            <h4>Reply</h4>
            <p>{feedback.reply}</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
  )
}


