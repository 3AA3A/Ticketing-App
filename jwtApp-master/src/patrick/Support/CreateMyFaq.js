import React, { useContext, useEffect, useState } from 'react'
import db from '../../db'
import UserContext from '../../UserContext'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from "react-router-dom";

export default function CreateMyFaq() {

  const { user } = useContext(UserContext)

  const [question, setQuestion] = useState("")

  const [answer, setAnswer] = useState("")

  const userid = user.id

  const history = useHistory()

  const create = async () => {
    await db.Faq.create(() => null, { question, answer, userid })
    history.push("/myfaqs")
  }

  const [validCreate, setValidCreate] = useState(false)
  useEffect(() => (async () => setValidCreate(
    question !== "" &&
    answer !== ""
  ))(), [question, answer])

  return (
    // faq &&
    <div>
      <h1>Create Faq</h1>
      <dl className="row">
        <dt className="col-sm-3">Question</dt>
        <dd className="col-sm-9"><Form.Control size="sm" as="textarea" rows={3} onChange={event => setQuestion(event.target.value)} value={question} /></dd>
        <dt className="col-sm-3">Answer</dt>
        <dd className="col-sm-9"><Form.Control size="sm" as="textarea" rows={3} onChange={event => setAnswer(event.target.value)} value={answer} /></dd>
      </dl>
      <Button size="sm" variant="light" onClick={create} disabled={!validCreate}>Create</Button>
      <Button size="sm" variant="link" as={Link} to={'/myfaqs'}>Back to My Faqs</Button>
    </div >
  );
}