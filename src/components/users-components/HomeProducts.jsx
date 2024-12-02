import React from 'react'
import veirdo from '../../assets/vb200.jpeg'

const HomeProducts = () => {
  return (
    <div className='grid grid-cols-4 gap-4 '>
        <div>
        <img src={veirdo} alt="productImg" />
        </div>
        <div>
        <img src={veirdo} alt="productImg" />
        </div>
        <div>
        <img src={veirdo} alt="productImg" />
        </div>
        <div>
        <img src={veirdo} alt="productImg" />
        </div>
        <div>
        <img src={veirdo} alt="productImg" />
        </div>
    </div>
  )
}

export default HomeProducts
