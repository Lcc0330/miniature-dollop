import { useState,useEffect } from 'react'
import { useNavigate ,useLocation} from 'react-router-dom'
import './index.css'

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
