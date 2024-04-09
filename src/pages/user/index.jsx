import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import manIcon from '../img/man.png'
import shangke from '../img/shangke.jpg'
import fukuan from '../img/fukuan.jpg'
import pingjia from '../img/pingjia.jpg'
import kecheng from '../img/kecheng.jpg'
import kemu1 from '../img/kemuyi.jpg'
import kemu2 from '../img/kemu2.jpg'
import kemu3 from '../img/kumu3.jpg'
import jilu from '../img/jilu.jpg'
import yuyue from '../img/yuyue.jpg'
import moni from '../img/mouni.jpg'
import tousu from '../img/tousu.jpg'
import xiugai from '../img/xiugai.jpg'
import jxpingjia from '../img/jxpingjia.jpg'
import kemupingjia from '../img/kemupingjia.jpg'
import zhuxiao from '../img/zhuxiao.jpg'
import erweima from '../img/erweima.jpg'
import login1 from '../img/login1.jpg'
import my from '../img/my.png'
import home from '../img/home.png'
import QR from '../img/qrcode.png'
import OperateIndex from '../Operate' 
import './index.css'

const UserInfo = () => {
  const [info, setInfo] = useState({})
  const [activeTab, setActiveTab] = useState('my')
  const [topPosition, setTopPosition] = useState('relative')
  const [showQR,setShowQR]=useState(false)
  const divRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
//   console.log(location, 'location')
  useEffect(() => {
    if (location.state) {
      setInfo(location.state?.data||{})
    }
  }, [location.state])
  return (
    <div>
    {info.ID==='admin'?<OperateIndex/>:<div className='UserInfo'>
      <div>
      <div
        style={{ position: 'fixed', width: '100%', zIndex: 9999 }}
        ref={divRef}
      >
        <div className='UserInfo-top'>
          <div
            className='UserInfo-top-icon'
            onClick={() => navigate('/login')}
          />
          <div className='UserInfo-top-title'>学员中心</div>
          <div></div>
        </div>
      </div>
      <div className='UserInfo-base'>
        <div className='UserInfo-base-user'>
          <div className='UserInfo-base-user-pic'>
            <img alt='' src={manIcon}></img>
          </div>
          <div className='UserInfo-base-user-name'>{info?.name}</div>
        </div>

        <div className='UserInfo-base-info'>
          <div className='UserInfo-base-info-text'>
            驾校： {info?.drivingSchool}
          </div>
          <div className='UserInfo-base-info-text'>类型： {info?.category}</div>
          <div className='UserInfo-base-info-text'>状态： {info?.status}</div>
          <div className='UserInfo-base-info-text'>手机号： {info?.phone}</div>

          <div className='UserInfo-base-info-vipmoney'>
            <div className='UserInfo-base-info-money'>
              <div>
                <div>余额</div>
                <div>0.00￥</div>
              </div>
              <div style={{ borderLeft: '1px solid #ccc' }}>
                <div>累计充值</div>
                <div>0.00￥</div>
              </div>
            </div>
           
          </div>
          <div className='UserInfo-base-info-vip'>
              <div>会员类型</div>
              <div>套餐会员</div>
            </div>
        </div>
      </div>
      <div className='UserInfo-subject'>
        <div className='UserInfo-subject-title'>我的课程</div>
        <div className='UserInfo-subject-itemWrap'>
          <div className='UserInfo-subject-item'>
            <div className='UserInfo-subject-item-pic'>
              <img src={shangke} alt='' />
            </div>
            <div className='UserInfo-subject-item-text'>待上课</div>
          </div>
          <div className='UserInfo-subject-item'>
            <div className='UserInfo-subject-item-pic'>
              <img src={fukuan} alt='' />
            </div>
            <div className='UserInfo-subject-item-text'>待付款</div>
          </div>
          <div className='UserInfo-subject-item'>
            <div className='UserInfo-subject-item-pic'>
              <img src={pingjia} alt='' />
            </div>
            <div className='UserInfo-subject-item-text'>待评价</div>
          </div>
          <div className='UserInfo-subject-item'>
            <div className='UserInfo-subject-item-pic'>
              <img src={kecheng} alt='' />
            </div>
            <div className='UserInfo-subject-item-text'>课程</div>
          </div>
        </div>
        <div>
          <div className='UserInfo-subject-itemWrap'>
            <div className='UserInfo-subject-item' onClick={()=>navigate('/other',{ state: {pageType:{title:'训练信息',type:'km1'},data:info} })}>
              <div className='UserInfo-subject-item-tip'> {info?.subjectHours?.subjectOne}</div>
              <div className='UserInfo-subject-item-pic'>
                <img src={kemu1} alt='' />
              </div>
              <div className='UserInfo-subject-item-text'>科目一</div>
            </div>
            <div className='UserInfo-subject-item'  onClick={()=>navigate('/other',{ state:{pageType: {title:'训练信息',type:'km2'},data:info} })}>
              <div className='UserInfo-subject-item-tip'> {info?.subjectHours?.subjectTwo}</div>
              <div className='UserInfo-subject-item-pic'>
                <img src={kemu2} alt='' />
              </div>
              <div className='UserInfo-subject-item-text'>科目二</div>
            </div>
            <div className='UserInfo-subject-item' onClick={()=>navigate('/other',{ state: {pageType:{title:'训练信息',type:'km3'},data:info} })}>
              <div className='UserInfo-subject-item-tip'> {info?.subjectHours?.subjectThree}</div>
              <div className='UserInfo-subject-item-pic'>
                <img src={kemu3} alt='' />
              </div>
              <div className='UserInfo-subject-item-text'>科目三</div>
            </div>
            <div className='UserInfo-subject-item'  onClick={()=>navigate('/other',{ state: {pageType:{title:'训练信息',type:'jl'},data:info} })}>
              <div className='UserInfo-subject-item-tip'> {(info?.subjectHours?.subjectOne+info?.subjectHours?.subjectTwo+info?.subjectHours?.subjectThree)?.toFixed(2)}</div>
              <div className='UserInfo-subject-item-pic'>
                <img src={jilu} alt='' />
              </div>
              <div className='UserInfo-subject-item-text'>记录</div>
            </div>
          </div>
          <div className='UserInfo-subject-item-extr'>
            注：红色圆圈内为学时信息
          </div>
        </div>
        <div
          className='UserInfo-subject-itemWrap  UserInfo-subject-itemWrap2'
          style={{ flexWrap: 'wrap', backgroundColor: '#e4e4e4', gap: '2px' }}
        >
          <div className='UserInfo-subject-item'>
            <div className='UserInfo-subject-item-pic'>
              <img src={yuyue} alt='' />
            </div>
            <div className='UserInfo-subject-item-text'>预约</div>
          </div>
          <div className='UserInfo-subject-item'>
            <div className='UserInfo-subject-item-pic'>
              <img src={moni} alt='' />
            </div>
            <div className='UserInfo-subject-item-text'>模拟理考</div>
          </div>
          <div className='UserInfo-subject-item'>
            <div className='UserInfo-subject-item-pic'>
              <img src={moni} alt='' />
            </div>
            <div className='UserInfo-subject-item-text'>模拟成绩</div>
          </div>
          <div className='UserInfo-subject-item'>
            <div className='UserInfo-subject-item-pic'>
              <img src={tousu} alt='' />
            </div>
            <div className='UserInfo-subject-item-text'>投诉</div>
          </div>
          <div className='UserInfo-subject-item'>
            <div className='UserInfo-subject-item-pic'>
              <img src={xiugai} alt='' />
            </div>
            <div className='UserInfo-subject-item-text'>修改密码</div>
          </div>
          <div className='UserInfo-subject-item' onClick={()=>navigate('/other',{ state: {pageType:{title:'驾校评价',type:'jxpj'},data:info} })}>
            <div className='UserInfo-subject-item-pic'>
              <img src={jxpingjia} alt='' />
            </div>
            <div className='UserInfo-subject-item-text' >驾校评价</div>
          </div>
          <div className='UserInfo-subject-item'  onClick={()=>navigate('/other',{ state: {pageType:{type:'myd'},data:info} })}>
            <div className='UserInfo-subject-item-pic'>
              <img src={kemupingjia} alt='' />
            </div>
            <div className='UserInfo-subject-item-text'>科目评价</div>
          </div>
          <div className='UserInfo-subject-item'>
            <div className='UserInfo-subject-item-pic'>
              <img src={zhuxiao} alt='' />
            </div>
            <div className='UserInfo-subject-item-text'>注销</div>
          </div>
          <div className='UserInfo-subject-item' onClick={()=>setShowQR(true)}>
            <div className='UserInfo-subject-item-pic'>
              <img src={erweima} alt='' />
            </div>
            <div className='UserInfo-subject-item-text' >我的二维码</div>
          </div>
          <div className='UserInfo-subject-item'>
            <div className='UserInfo-subject-item-pic'>
              <img src={login1} alt='' />
            </div>
            <div className='UserInfo-subject-item-text'>绑定一键登录</div>
          </div>
          <div className='UserInfo-subject-item'></div>
          <div className='UserInfo-subject-item'></div>
        </div>
      </div>

      <div className='UserInfo-bottom'>
        <div className='UserInfo-bottom-item'></div>
        <div
          className={`UserInfo-bottom-item ${
            activeTab === 'home' ? 'UserInfo-bottom-activeItem' : ''
          }`}
          onClick={() => setActiveTab('home')}
        >
          <div className='UserInfo-bottom-item-pic'>
            <img src={home} alt='' />
          </div>
          <div
            className='UserInfo-bottom-item-text'
            onClick={() => navigate('/')}
          >
            首页
          </div>
        </div>
        <div
          className={`UserInfo-bottom-item ${
            activeTab === 'my' ? 'UserInfo-bottom-activeItem' : ''
          }`}
          onClick={() => setActiveTab('home')}
        >
          <div className='UserInfo-bottom-item-pic'>
            <img src={my} alt='' />
          </div>
          <div className='UserInfo-bottom-item-text'>我的</div>
        </div>
        <div className='UserInfo-bottom-item'></div>
      </div>
      </div>
     {showQR? <div className='UserInfo-ModalWarp'>
        <div className='UserInfo-Modal'>
          <div className='UserInfo-Modal-title'>
            签到签退二维码
          </div>
          <div className='UserInfo-Modal-content'>
            <img alt="" src={QR}></img>
          </div>
          <div className='UserInfo-Modal-bottom' onClick={()=>setShowQR(false)}>
            关闭
          </div>
        </div>
      </div>:null}
    </div>}
    </div>
  )
}

export default UserInfo
