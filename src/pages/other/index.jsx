import { useState,useEffect } from 'react'
import { useNavigate ,useLocation} from 'react-router-dom'
import './index.css'
import jxpj from '../img/jxpj.png'
import km1 from '../img/km1.png'
import km2 from '../img/km2.png'
import km3 from '../img/km3.png'
import myd from '../img/myd.png'

import jl from '../img/jl.png'

const OtherPage = () => {
  const [info, setInfo] = useState({})

  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (location.state) {
      setInfo(location.state.pageType)
    }
    console.log(location.state,'location.state')
  }, [location.state])
  return (
    <div style={{ position: 'fixed', width: '100%', zIndex: 999 }}>
      {info?.type !=='myd'?<div className='OtherPage-top'>
        <div className='OtherPage-top-icon' onClick={() => navigate('/user',{state:{data:location.state.data}})} />
        <div className='OtherPage-top-title'>{info.title}</div>
        <div></div>
      </div>:null}
      <div className={`OtherPage-content OtherPage-img-${info?.type}`} >

        </div>
    </div>
  )
}
export default OtherPage
