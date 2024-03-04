//app.js
const Koa = require('koa')
const app = new Koa()

//要涉及读文件的功能，所以引入node 的 fs 文件系统
const fs = require('fs')

/**
 * 用Promise封装异步读取文件方法
 * @param  {string} page html文件名称
 * @return {promise}
 */
function render (page) {
  return new Promise((resolve, reject) => {
    let distUrl = `./build/${page}`
    fs.readFile(distUrl, 'binary', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * 根据URL获取HTML内容
 * @param  {string} url koa2上下文的url，ctx.url
 * @return {string}     获取HTML文件内容
 */
async function route (url) {
  let dist = '404.html'
  switch (url) {
    case '/':
    case '/index':
      dist = 'index.html'
      break
    case '/todo':
      dist = 'todo.html'
      break
    case '/404':
      dist = '404.html'
      break
    default:
      break
  }
  let html = await render(dist)
  return html
}
app.use(require('koa-static')(__dirname + '/build'))
app.use(async ctx => {
  let url = ctx.request.url
  let html = await route(url)
  ctx.body = html
})
app.listen(80, () => {
  console.log('服务已启动 80 端口')
})
