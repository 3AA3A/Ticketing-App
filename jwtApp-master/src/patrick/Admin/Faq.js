import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'


export default function Faq({ faq, remove }) {

  return (
    <>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={faq.id}>
          {faq.question}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={faq.id}>
          <Card.Body>
            {faq.answer}<br />
            <Button variant="danger" size="sm" onClick={() => remove(faq.id)} style={{float:'right'}}>X</Button>
            <Button size="sm" variant="light" as={Link} to={`/editfaq/${faq.id}`} style={{float:'right'}}>Edit</Button><br />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  )
}


