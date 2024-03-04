import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    userId && passWord && fetchObject()
  }
  const fetchObject = async () => {
    const ossUrl =
      'http://user-info-bucket.oss-cn-hangzhou.aliyuncs.com/user-info.json'

    try {
      const response = await fetch(ossUrl, { method: 'get', mode: 'cors' })
      if (!response.ok) {
        throw new Error(`请求失败，${response.status}`)
      }
      const data = (await response.json()) || []
      if (Array.isArray(data)) {
        const findItem = data?.find(item => {
          return item?.idNumber + '' === userId + ''
        })
        console.log(response, 'sdd', data, findItem, userId)
        if (findItem) {
          navigate('/user', { state: findItem })
        } else {
          alert('-1||不存在此身份证号的学员')
        }
      }
    } catch (err) {
      console.log(err, 'err')
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
        <img
          className='login-banner'
          src='http://cyberxueche.oss-cn-qingdao.aliyuncs.com/cyber-m-web/%E6%B1%9F%E8%8B%8F%E9%A9%BE%E5%9F%B9/%E9%A6%96%E9%A1%B5/login_logo.png'
          alt=''
        />
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
