import React, { useState, useEffect } from "react";

import db from '../../db';



function Coup({ coupon}) {
  
  
  return (
    <tr>
      <td>{coupon.coupcode}</td>
      <td>{coupon.discount}%</td>
      <td>{coupon.datevalid.toDateString().split(" ").splice(1).join(" ")}</td>
      
      <td>
        
      </td>
    </tr>
  );
}

export default Coup;
