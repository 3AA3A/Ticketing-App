import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'


export default function Faq({ faq }) {

  return (
    <>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={faq.id}>
          {faq.question}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={faq.id}>
          <Card.Body>
            {faq.answer}<br />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  )
}


