// import React, { useEffect, useState } from 'react'
// import db from '../../db'
// import Event from '../../mary/user/Event'
// import Form from 'react-bootstrap/Form'
// import Col from 'react-bootstrap/Col'
// import CardDeck from 'react-bootstrap/CardDeck'

// export default function SearchEventsByName() {

//   const [events, setEvents] = useState([])
//   const [even, setEven] = useState("") 

//   useEffect(() => (async () => setEvents(await db.Events.findByNameContaining(even)))(), [even])

//   const handleSearchByName = event => {

//     setEven(event.target.value)
// }

//   return (
//     <>
//       <h1>Search by Events</h1>
//       <Form>
//         <Form.Row>
//           <Col>
//           <Form.Control size="sm" type="text" onChange={handleSearchByName} placeholder="Event" value={even} />
//           </Col>
          
//         </Form.Row>
//       </Form>
      
//       <br></br>

//       {
//       <CardDeck>
//         {
//           events.map(eventt => <Event key={eventt.id} event={eventt} />)
//         }
      
//       </CardDeck> 
//       }
//     </>
//   )
// }