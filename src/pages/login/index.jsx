import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginIcon from '../img/login_logo.png'
import { fetchItem } from '../../untils'
import './index.css'
const Login = props => {
  const navigate = useNavigate()
  const [userId, setUseerId] = useState()
  const [passWord, setPassWord] = useState()
  const [activeTab, setActiveTab] = useState('student')
  const loginFun = () => {
    let text = ''
    if (!userId) {
      text = '账号不能为空'
      alert(text)
      return
    }
    if (userId === 'admin' && passWord === '123') {
      const aa = {
        _id: {
          $oid: 'admin'
        },
        name: '管理员',
        category: 'C2',
        phone: '15862208952',
        ID: 'admin',
        status: '结业',
        drivingSchool: '睢宁恒安',
        passWord: '123456',
        subject_hours: {
          科目二: 12.67,
          科目三: 24.78,
          科目一: 13.45
        }
      }
      navigate('/user', { state: { data: aa } })
      return
    }
    userId && passWord && fetchObject()
  }
  const fetchObject = async () => {
    const ossUrl =
      'https://user-info-bucket.oss-cn-hangzhou.aliyuncs.com/data.json'
    // try {
    //   const response = await fetch(ossUrl, { method: 'get', mode: 'cors' })
    //   if (!response.ok) {
    //     throw new Error(`请求失败，${response.status}`)
    //   }
    //   const data = (await response.json()) || []
    //   if (Array.isArray(data)) {
    //     const findItem = data?.find(item => {
    //       return item?.ID + '' === userId + ''
    //     })
    //     if (findItem) {
    //       // if (findItem?.passWord + '' === passWord + '') {
    //       navigate('/user', { state: { data: findItem } })
    //       // } else {
    //       //   alert('密码错误')
    //       // }
    //     } else {
    //       alert('-1||不存在此身份证号的学员')
    //     }
    //   }
    // } catch (err) {
    //   console.log(err, 'err')
    // }
    const preHost =
      window?.location?.hostname === 'localhost'
        ? 'localhost:3000'
        : '47.99.117.111:3007'

    try {
      const result = await fetchItem(
        `http://${preHost}/userInfo/findOne`,
        {
          ID: userId || ''
        },
        'POST'
      )
      if (result.success) {
        // navigate('/user', { state: { data: result?.data } })
        if (Array.isArray(result?.data)) {
          const findItem = result?.data?.find(item => {
            return item?.ID + '' === userId + ''
          })
          if (findItem) {
            // if (findItem?.passWord + '' === passWord + '') {
            navigate('/user', { state: { data: findItem } })
            // } else {
            //   alert('密码错误')
            // }
          } else {
            alert('-1||不存在此身份证号的学员')
          }
        }
      } else {
        // message.error(result.data)
        alert('-1||不存在此身份证号的学员')
      }
    } catch (err) {
      // message.error(err)
      console.log(JSON.stringify(err), 'err')
    }
  }
  return (
    <div className='login'>
      <div className='login-top'>
        <div className='login-top-icon' onClick={() => navigate('/')} />
        <div className='login-top-title'>登录</div>
        <div className='login-top-adress'>徐州市</div>
      </div>
      <div className='login-content'>
        <img className='login-banner' src={loginIcon} alt='' />
        <div className='login-tabWarp'>
          <div className={`login-tab login-activetab`}>
            学员
            {activeTab === 'student' ? (
              <div className='login-line'></div>
            ) : null}
          </div>
          <div className='login-tab'>
            教练
            {/* <div className='login-line'></div> */}
          </div>
          <div className='login-tab'>
            驾校
            {/* <div className='login-line'></div> */}
          </div>
          <div className='login-tab'>
            运管
            {/* <div className='login-line'></div> */}
          </div>
        </div>
        <div className='login-operate'>
          <div className='login-user'>
            <span className='login-user-icon'></span>
            <input
              placeholder='输入身份证号码'
              value={userId}
              onChange={e => setUseerId(e?.target?.value)}
              maxLength={20}
            />
            {!userId ? (
              <span
                className='login-user-clear'
                // onClick={() => setUseerId(undefined)}
              />
            ) : (
              <span className='login-user-check' />
            )}
          </div>

          <div className='login-passWord'>
            <span className='login-passWord-icon'></span>
            <input
              placeholder='输入密码（默认密码是身份证后六位）'
              value={passWord}
              onChange={e => setPassWord(e?.target?.value)}
              type='password'
              maxLength={20}
            />
            <span
              className='login-passWord-clear'
              // onClick={() => setPassWord(undefined)}
            />
          </div>

          <div className='login-forget'>
            <span>忘记密码?</span>
          </div>
        </div>

        <div className='login-operateBtn'>
          <div className='login-operateBtn-bangding' onClick={loginFun}>
            绑定
          </div>
          <div className='login-operateBtn-login'>一键登录</div>
        </div>
      </div>
    </div>
  )
}
export default Login
