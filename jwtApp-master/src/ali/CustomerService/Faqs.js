import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import db from '../../db'


export default function Faqs({ fqs }) {

   
  return (
      
    <tr>
    <td>{fqs.userid}</td>
    <td>{fqs.question}</td>
    <td>{fqs.answer}</td>
    
    </tr>
  )
}