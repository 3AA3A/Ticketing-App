import React, { useContext, useEffect, useState } from 'react'
import db from '../../db'
import Form from 'react-bootstrap/Form'
import UserContext from '../../UserContext'
import MyFaq from './MyFaq'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion'

export default function MyFaqs() {

  const { user } = useContext(UserContext)

  const [question, setQuestion] = useState("")

  const [faqs, setFaqs] = useState([])
  useEffect(() => (async () => setFaqs(await db.Faq.findByUseridAndQuestionContains(user.id, question)))(), [user, question])

  // const remove = {async id => await db.Faq.remove(setFaqs, id)}
  // if i used the former remove function, it would show ALL the faqs (including other supports) after the removal...
  const remove = async (id) => {
    await db.Faq.remove(() => null, id)
    setFaqs(await db.Faq.findByUseridAndQuestionContains(user.id, question))
  }

  return (
    <div>
      <h2>Search By:</h2>
      <dl className="row">
        <dt className="col-sm-3">Question</dt>
        <dd className="col-sm-9"><Form.Control size="sm" as="textarea" rows={3} onChange={event => setQuestion(event.target.value)} value={question} /></dd>
      </dl>
      <h1>My Faqs</h1>
      <Button size="sm" variant="link" as={Link} to={'/createfaq'}>Create New Faq</Button>
      <Accordion>
        {
          faqs.map(faq =>
            <MyFaq key={faq.id} faq={faq} remove={remove} />
          )
        }
      </Accordion>
      {/* <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            faqs.map(faq =>
                <MyFaq key={faq.id} faq={faq} remove={remove} />
              )
          }
        </tbody>
      </Table> */}
    </div >
  );
}