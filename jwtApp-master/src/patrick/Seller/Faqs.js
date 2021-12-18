import React, { useEffect, useState } from 'react'
import db from '../../db'
import Form from 'react-bootstrap/Form'
import Faq from './Faq'
import {Card, Accordion} from 'react-bootstrap'

export default function Faqs() {

  const [question, setQuestion] = useState("")

  const [faqs, setFaqs] = useState([])
  useEffect(() => (async () => setFaqs(await db.Faq.findByQuestionContains(question)))(), [question])

  return (
    <div>
      <br></br>
      <h1 className='display-4'>Frequently Asked Questions</h1>

      <div className='row'>
        <div className='col-md-3'>
        <Card>
          <Card.Header>Search</Card.Header>
          <Card.Body>
            <Form.Control size="sm" placeholder='Question...' as="textarea" rows={3} onChange={event => setQuestion(event.target.value)} value={question} />
          </Card.Body>
        </Card>
        </div>
        <div className='col-md-9'>
          <Accordion>
            {
              faqs.map(faq =>
                <Faq key={faq.id} faq={faq} />
              )
            }
          </Accordion>
        </div>
      </div>
    </div >
  );
}