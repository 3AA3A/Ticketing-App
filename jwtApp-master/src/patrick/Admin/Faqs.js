import React, { useEffect, useState } from 'react'
import db from '../../db'
import Form from 'react-bootstrap/Form'
import Faq from './Faq'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion'

export default function Faqs() {

  const [question, setQuestion] = useState("")

  const [faqs, setFaqs] = useState([])
  useEffect(() => (async () => setFaqs(await db.Faq.findByQuestionContains(question)))(), [question])

  // const remove = async id => await db.Faq.remove(setFaqs, id)
  // if i used the former remove function, it would show ALL the faqs (including other supports) after the removal...
  const remove = async (id) => {
    await db.Faq.remove(() => null, id)
    setFaqs(await db.Faq.findByQuestionContains(question))
  }

  return (
    <div>
      <h2>Search By:</h2>
      <dl className="row">
        <dt className="col-sm-3">Question</dt>
        <dd className="col-sm-9"><Form.Control size="sm" as="textarea" rows={3} onChange={event => setQuestion(event.target.value)} value={question} /></dd>
      </dl>
      <h1>Frequently Asked Questions</h1>
      <Accordion>
        {
          faqs.map(faq =>
            <Faq key={faq.id} faq={faq} remove={remove} />
          )
        }
      </Accordion>
    </div >
  );
}