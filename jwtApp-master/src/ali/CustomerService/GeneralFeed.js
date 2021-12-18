import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import db from '../../db'


export default function GeneralFeed({ feed }) {

   
  return (
      
    <tr>
    <td>{feed.userid}</td>
    <td>{feed.datemade.toDateString().split(" ").splice(1).join(" ")}</td>
    <td>{feed.title}</td>
    <td>{feed.feedback}</td>
    <td>{feed.reply}</td>
    <td>{feed.viewed}</td>

    
    </tr>
  )
}