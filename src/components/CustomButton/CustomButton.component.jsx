import React from 'react'

import './CustomButton.styles.scss'

function CustomButton({text}) {
  return (
    <button className="btn-add">{text}</button>
  )
}

export default CustomButton;