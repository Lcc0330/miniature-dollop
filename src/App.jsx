import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import yuyue from './pages/img/1.1.jpg'
import xinwen from './pages/img/2.2.jpg'
import school from './pages/img/3.3.jpg'
import person from './pages/img/5.5.jpg'
import gold from './pages/img/6.6.jpg'
import baoming from './pages/img/7.7.jpg'
import styles from './App.css'
const preFixCls = 'main'
function App () {
  const navigate= useNavigate()
  //生成mock


  useEffect(()=>{

  },[])
  return (
    <div className={styles[preFixCls]}>
      <div className='main-banner'>
        <div className='main-banner-title'>
          徐州市
        </div>
      </div>
      <div className='main-content'>
        <div className='main-content-top'>
          <div className='main-content-top-one'>
            <span className='main-content-title'>预约驾校</span>
            <img className='main-content-icon' alt= "" src={yuyue} />
          </div>
          <div className='main-content-top-two'>
            <div className='main-content-top-two-one'>
              <span className='main-content-title'>驾校列表</span>
              {/* <div className='main-content-icon'></div> */}
              <img className='main-content-icon' alt= "" src={school} />
            </div>
            <div className='main-content-top-two-three' >
              <span className='main-content-title' >新闻公告</span>
              {/* <img className='main-content-icon' src={xinwen} alt=""/> */}
              <img className='main-content-icon' alt= "" src={xinwen} />

            </div>
          </div>
          
        </div>
        <div className='main-content-middle'>
          <div className='main-content-middle-one'>
            <span className='main-content-title'>我要报名</span>
            {/* <div className='main-content-icon'></div>  */}
            <img className='main-content-icon' alt= "" src={baoming} />
           </div>
          <div className='main-content-middle-two' onClick={()=>{
            // window.location.href=''
            navigate('/login')
          }}>
            <span className='main-content-title'>个人中心</span>
            {/* <div className='main-content-icon'></div>  */}
            <img className='main-content-icon' alt= "" src={person} />
            </div>
        </div>
        <div className='main-content-bottom'>
          <div className='main-content-bottom-one'></div>
          <div className='main-content-bottom-two'>
            
            <span className='main-content-title' >明星教练</span>
            {/* <div className='main-content-icon'></div> */}
            <img className='main-content-icon' alt= "" src={gold} />

            </div>
        </div>
      </div>
      <div className='main-bottom'>
      版权所有：无锡赛博盈科科技有限公司 苏ICP备09094489号-13 苏公网安备32021102001675号
      </div>
    </div>
  )
}

export default App
