import React, { useEffect, useState } from 'react'
import db from '../../db'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory, useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'

export default function EditFeedback() {

  const { id: stringid } = useParams();
  const id = stringid * 1

  const [feedback, setFeedback] = useState(null)
  useEffect(() => (async () => setFeedback(await db.Generalfeedback.findOne(id)))(), [id])

  const userid = feedback && feedback.userid

  const [user, setUser] = useState("")
  useEffect(() => (async () => feedback && setUser(await db.Users.findOne(userid)))(), [userid])

  const datemade = feedback && feedback.datemade

  const title = feedback && feedback.title

  const userfeed = feedback && feedback.feedback

  const [reply, setReply] = useState("")
  useEffect(() => feedback && setReply(feedback.reply), [feedback])

  const [viewed, setViewed] = useState("")
  useEffect(() => feedback && setViewed(feedback.viewed), [feedback])

  const history = useHistory()

  const update = async () => {
    await db.Generalfeedback.update(() => null, { id, userid, datemade, title, feedback: userfeed, reply, viewed })
    history.push("/feedbacks")
  }

  return (
    feedback ?
    <div>
      <h1>Edit Feedback</h1>
      <dl className="row">
        <dt className="col-sm-3">User</dt>
        <dd className="col-sm-9"><Form.Control size="sm" type="text" disabled value={user && user.name} /></dd>
        <dt className="col-sm-3">Date Made</dt>
        <dd className="col-sm-9"><Form.Control size="sm" type="date" disabled value={datemade.toISOString().slice(0, 10)} /></dd>
        <dt className="col-sm-3">Title</dt>
        <dd className="col-sm-9"><Form.Control size="sm" type="text" disabled value={title} /></dd>
        <dt className="col-sm-3">User Feedback</dt>
        <dd className="col-sm-9"><Form.Control size="sm" type="text" disabled value={userfeed} /></dd>
        <dt className="col-sm-3">Reply</dt>
        <dd className="col-sm-9"><Form.Control size="sm" as="textarea" rows={3} onChange={event => setReply(event.target.value)} value={reply} /></dd>
        <dt className="col-sm-3">Mark as Viewed?</dt>
        <dd className="col-sm-9">
          <Form.Check type="checkbox" checked={viewed === "YES"} name="viewed" onChange={() => viewed === "NO" ? setViewed("YES") : setViewed("NO")} inline />
        </dd>
      </dl>
      <Button size="sm" variant="light" onClick={update}>Update</Button>
      <Button size="sm" variant="link" as={Link} to={'/feedbacks'}>Back to Feedbacks</Button>
    </div >
    :
    <p>
    <Spinner animation="border" variant="dark" /> &nbsp;
    Please wait...
    </p>
  );
}