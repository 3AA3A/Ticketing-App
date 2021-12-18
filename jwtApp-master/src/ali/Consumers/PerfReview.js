import React, { useContext, useEffect, useState } from 'react'
import db from '../../db'
import UserContext from '../../UserContext'
import {Card, Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useParams, useHistory } from "react-router-dom";

export default function PerfReview() {

    const { id: stringId } = useParams();
  const id = 1 * stringId

  const [performers, setPerformers] = useState(null)
  useEffect(() => (async () => setPerformers(await db.Performer.findOne(id)))(), [id])

  const { user } = useContext(UserContext)

  const [review, setReview] = useState("")

  const userid = user.id

//   const perfid = performers && performers.id

  const datemde = new Date()

  const history = useHistory()

  const create = async () => {
    await db.Performerreview.create(() => null, { revdate:datemde, review, userid, performerid:id })
    history.push("/")
  }

  return (
    // faq &&
    <>
    <br></br>
      <h1 className='display-4'>Review {performers && performers.name}</h1>
      
      <div className='row'>
        <div className='col-md-3'>
          <img src={performers && performers.image} width='250'/>
        </div>
        <div className='col-md-9'>
          <p className='lead'>How did you find {performers && performers.name}'s overall performance? Are you a long time fan or have you just discovered {performers && performers.name}? Share your thoughts with us.</p>
        </div>
      </div> <br></br>
      <div className='row'>
        <div className='col-md-12'>
        <Form.Control size="sm" as="textarea" rows={3} onChange={event => setReview(event.target.value)} value={review} />
        </div>
      </div>
      
      <br></br>
      
      <Button size="sm" variant="success" onClick={create}>Submit</Button> &nbsp;
      <Button size="sm" variant="danger" as={Link} to={`/performerdetail/${performers && performers.id}`}>Cancel</Button>
    </ >
  );
}