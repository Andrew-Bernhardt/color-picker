import React from 'react'
import { Link } from 'react-router-dom'
import "./App.css"

export default function 
() {
  return (
    <div className='nav'>
      <div className="grid-flex">
        <h3><Link to="/first">Ordered</Link></h3>
        <h3><Link to="/random">Randomized</Link></h3>
        
      </div>
      <div className="grid-flex title">
        <h1><Link to="/">Color Picker</Link></h1>
      </div>
      <div className="grid-flex">
        <h3><Link to="/top-colors">Top Colors</Link></h3>
        <h3><Link to="/bottom-colors">Bottom Colors</Link></h3>
      </div>
    </div>
  )
}
