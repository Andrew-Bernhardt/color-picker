import React, { PureComponent } from 'react'

export default function ColorBlock() {

  var randomColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);


  return (
    <div className='color-body' style={{backgroundColor: randomColor}}>

    </div>
  )
}
