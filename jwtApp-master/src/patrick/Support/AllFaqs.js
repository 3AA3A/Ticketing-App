import React, { useEffect, useState } from 'react'
import db from '../../db'
import Form from 'react-bootstrap/Form'
import AllFaq from './AllFaq'
import Accordion from 'react-bootstrap/Accordion'

export default function AllFaqs() {

  const [question, setQuestion] = useState("")

  const [faqs, setFaqs] = useState([])
  useEffect(() => (async () => setFaqs(await db.Faq.findByQuestionContains(question)))(), [question])

  return (
    <div>
      <h2>Search By:</h2>
      <dl className="row">
        <dt className="col-sm-3">Question</dt>
        <dd className="col-sm-9"><Form.Control size="sm" as="textarea" rows={3} onChange={event => setQuestion(event.target.value)} value={question} /></dd>
      </dl>
      <h1>All Faqs</h1>
      <Accordion>
        {
          faqs.map(faq =>
            <AllFaq key={faq.id} faq={faq} />
          )
        }
      </Accordion>
    </div >
  );
}