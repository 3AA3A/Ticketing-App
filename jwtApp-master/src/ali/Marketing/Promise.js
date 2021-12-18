import React, { useState, useEffect } from "react";
import db from "../../db";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function Promise({ promotion }) {
  const [event, setEvent] = useState(null);
 

  useEffect(
    () => (async () => setEvent(await db.Events.findOne(promotion.eventid)))(),
    [promotion.eventid]
  );

  

  return (
    
      <tr key={promotion.id}>
        
        
        <td>{event && event.name}</td>
    
        
      </tr>
    
  );
}

export default Promise;
