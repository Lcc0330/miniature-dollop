export const fetchItem = async (url = '', data = {}, type = 'GET') => {
  try {
    type = type.toUpperCase()
    if (type == 'GET') {
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
    }
    let requestConfig = {
      credentials: 'same-origin',
      method: type,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors', // 用来决定是否允许跨域请求  值有 三个 same-origin，no-cors（默认）以及 cores;
      cache: 'no-cache' // 是否缓存请求资源 可选值有 default 、 no-store 、 reload 、 no-cache 、 force-cache 或者 only-if-cached 。
    }
    if (type === 'POST' || type === 'PUT' || type === 'DELETE') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    const response = await fetch(url, requestConfig)
    const responseConfig = await response.json()
    return responseConfig
  } catch (error) {
    throw new Error(error)
  }
}
