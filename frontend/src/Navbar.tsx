import React, { useReducer } from 'react'
import { Link } from 'react-router-dom'
import "./App.css"

// 'Optional' parameter
export default function ({refreshBlockBattle = (() => {}), refreshRandomized = (() => {})}) {
  return (
    <div className='nav'>
      <div className="grid-flex">
        <h3><Link to="/first">Ordered</Link></h3>
        <h3><Link to="/random" onClick={refreshRandomized}>Randomized</Link></h3>
        
      </div>
      <div className="grid-flex title">
        <h1><Link to="/" onClick={refreshBlockBattle}>Color Picker</Link></h1>
      </div>
      <div className="grid-flex">
        <h3><Link to="/top-colors">Top Colors</Link></h3>
        <h3><Link to="/bottom-colors">Bottom Colors</Link></h3>
      </div>
    </div>
  )
}
