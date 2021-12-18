import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import db from '../../db'
import {Badge, Accordion, Card} from 'react-bootstrap'


export default function Feedback({ feedback, remove }) {

  const [user, setUser] = useState(null)
  useEffect(() => (async () => feedback && setUser(await db.Users.findOne(feedback.userid)))(), [feedback])

  return (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={feedback.id}>
          {feedback.title} {feedback.reply === "" ? <>&nbsp; <Badge pill variant='warning'>No reply</Badge></> : null}
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
            <Button variant="danger" size="sm" onClick={() => remove(feedback.id)} style={{float:'right'}}>X</Button> 
            <Button size="sm" variant="dark" as={Link} to={`/editfeedback/${feedback.id}`} style={{ float: 'right' }}>{feedback.reply === "" ? "Add Reply" : "Edit Reply"}</Button><br />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
  )
}


