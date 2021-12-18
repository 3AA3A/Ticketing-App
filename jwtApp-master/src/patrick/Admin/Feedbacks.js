import React, { useContext, useEffect, useState } from 'react'
import db from '../../db'
import Form from 'react-bootstrap/Form'
import Feedback from './Feedback'
import Accordion from 'react-bootstrap/Accordion'

export default function Feedbacks() {

  const [title, setTitle] = useState("")
  const [viewed, setViewed] = useState("")
  const [name, setName] = useState("")
  const options = ["YES", "NO"]

  const [feedbacks, setFeedbacks] = useState([])
  useEffect(() => (async () => setFeedbacks(await db.Generalfeedback.findByUserNameContainsAndTitleContains(name, title)))(), [name, title])

  const remove = async (id) => {
    await db.Generalfeedback.remove(() => null, id)
    setFeedbacks(await db.Generalfeedback.findByUserNameContainsAndTitleContains(name, title))
  }

  return (
    <div>
      <br></br>
      <h2>Search By:</h2>
      <dl className="row">
        <dt className="col-sm-3">Title</dt>
        <dd className="col-sm-9"><Form.Control size="sm" onChange={event => setTitle(event.target.value)} value={title} /></dd>
        <dt className="col-sm-3">Viewed?</dt>
        <dd className="col-sm-9">
          <Form.Check type="radio" key="" label="All" value="" name="viewed" onChange={event => setViewed(event.target.value)} inline checked={viewed === ""} />
          {
            options.map(view =>
              <Form.Check type="radio" key={view} label={view} value={view} name="viewed" onChange={event => setViewed(event.target.value)} inline />
            )
          }
        </dd>
        <dt className="col-sm-3">User</dt>
        <dd className="col-sm-9"><Form.Control size="sm" type="text" onChange={event => setName(event.target.value)} value={name} /></dd>
      </dl>
      <h1>User Feedbacks</h1>
      <Accordion>
        {
          viewed === "" ?
            feedbacks
              .map(feedback =>
                <Feedback key={feedback.id} feedback={feedback} remove={remove} />
              )
            : viewed === "YES" ?
              feedbacks
                .filter(feedback => feedback.viewed === "YES")
                .map(feedback =>
                  <Feedback key={feedback.id} feedback={feedback} remove={remove} />
                )
              : feedbacks
                .filter(feedback => feedback.viewed === "NO")
                .map(feedback =>
                  <Feedback key={feedback.id} feedback={feedback} remove={remove} />
                )
        }
      </Accordion>
    </div >
  );
}