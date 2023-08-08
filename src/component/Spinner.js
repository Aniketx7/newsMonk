import React from 'react'
import Loading from './Image component/Loading.gif'

const  Spinner = () => {
  return (
      <div style={{ display: 'flex' , alignItems:'center', justifyContent: 'center', mixBlendMode: 'multiply'}}>
          <img width="300px" margin=" 1rem 0 1rem 0" height="auto" src={Loading} alt="Loading..." />
    </div>
  )
}

export default Spinner