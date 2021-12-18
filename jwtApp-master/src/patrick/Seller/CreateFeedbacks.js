import React, { useContext, useState } from 'react'
import db from '../../db'
import UserContext from '../../UserContext'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from "react-router-dom";

export default function CreateFeedbacks() {

  const { user } = useContext(UserContext)

  const [title, setTitle] = useState("")

  const [feedback, setFeedback] = useState("")

  const userid = user.id

  const datemde = new Date()

  const history = useHistory()

  const create = async () => {
    await db.Generalfeedback.create(() => null, { userid, title, feedback, datemade:datemde, viewed: "NO", reply: "" })
    history.push("/")
  }

  return (
    // faq &&
    <>
    <br></br>
      <h1 className='display-4'>Give us your Feedback</h1>
      <p className='lead'>Tell us what you think about our site and your experience. Your opinon matters.</p>
      <dl className="row">
      <dt className="col-sm-3">Title</dt>
        <dd className="col-sm-9"><Form.Control size="sm" as="textarea" rows={1} onChange={event => setTitle(event.target.value)} value={title} /></dd>
        <dt className="col-sm-3">Feedback</dt>
        <dd className="col-sm-9"><Form.Control size="sm" as="textarea" rows={3} onChange={event => setFeedback(event.target.value)} value={feedback} /></dd>
      </dl>
      <Button size="sm" variant="success" onClick={create}>Submit</Button> &nbsp;
      <Button size="sm" variant="danger" as={Link} to={'/'}>Cancel</Button>
    </ >
  );
}