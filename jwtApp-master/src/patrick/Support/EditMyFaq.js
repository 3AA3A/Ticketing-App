import React, { useContext, useEffect, useState } from 'react'
import db from '../../db'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory, useParams } from "react-router-dom";
import UserContext from '../../UserContext'
import Spinner from 'react-bootstrap/Spinner'

export default function EditMyFaq() {

  const { user } = useContext(UserContext)
  const userid = user && user.id

  const { id: stringid } = useParams();
  const id = stringid * 1

  const [faq, setFaq] = useState(null)
  useEffect(() => (async () => setFaq(await db.Faq.findOne(id)))(), [id])

  const [question, setQuestion] = useState("")
  useEffect(() => faq && setQuestion(faq.question), [faq])

  const [answer, setAnswer] = useState("")
  useEffect(() => faq && setAnswer(faq.answer), [faq])

  const history = useHistory()

  const update = async () => {
    await db.Faq.update(() => null, { id, question, answer, userid })
    history.push("/myfaqs")
  }

  const [validUpdate, setValidUpdate] = useState(false)
  useEffect(() => (async () => setValidUpdate(
    question !== "" &&
    answer !== ""
  ))(), [question, answer])

  return (
    faq ? faq.userid === userid ?
    <div>
      <h1>Edit Faq</h1>
      <dl className="row">
        <dt className="col-sm-3">Question</dt>
        <dd className="col-sm-9"><Form.Control size="sm" as="textarea" rows={3} onChange={event => setQuestion(event.target.value)} value={question} /></dd>
        <dt className="col-sm-3">Answer</dt>
        <dd className="col-sm-9"><Form.Control size="sm" as="textarea" rows={3} onChange={event => setAnswer(event.target.value)} value={answer} /></dd>
      </dl>
      <Button size="sm" variant="light" onClick={update} disabled={!validUpdate}>Update</Button>
      <Button size="sm" variant="link" as={Link} to={'/myfaqs'}>Back to My Faqs</Button>
    </div > 
    : <h4>Error. You are not authorized to edit this Faq!</h4>
    :
    <p>
    <Spinner animation="border" variant="dark" /> &nbsp;
    Please wait...
    </p>
  );
}