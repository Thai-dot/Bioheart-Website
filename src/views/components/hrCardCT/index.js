import React from 'react'
import "./styles.scss"
import svgImg from '../../../assets/images/svg/index'

const HRCardCT = ({icon,content,index,index2,unit,unit2,hasreport}) => {
  return (
    <div className={`d-flex flex-column align-items-start cardItem ${!hasreport?"pb-3":"pb-3"}`}>
        <img src={icon=="heart"?svgImg.heartIcon:svgImg.runSignIcon} className="img-fluid " width={30} height={30} alt="heart" />
        <div className="cardTitle mt-3">
          {content}
        </div>
        <div className={`d-flex  mt-3 ${!hasreport ? "flex-column" : "justify-content-start align-items-start"} `}>
        <div className='cardIndex'>
          {index}
        </div>
        <div className={`cardUnit  ${!hasreport ? "ms-1 mt-3" : "ms-1 mt-3 mb-2"} `}>
          {unit}
        </div>

        </div>
        {
          index2 && (
            <div className={`d-flex  mt-2 ${!hasreport ? "flex-column" : "justify-content-start align-items-center"} `}>
              <img src={svgImg.heartIcon} width={20} height= {20} className="me-2" alt="" />
        <div className='cardIndex2'>
          {index2}
        </div>
        <div className={`cardUnit  ${!hasreport ? "ms-1 mt-3" : "ms-1 mt-2 mb-2"} `}>
          {unit2}
        </div>

        </div>
          )
        }

    </div>
  )
}

export default HRCardCT