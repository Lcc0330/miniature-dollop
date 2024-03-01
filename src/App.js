import style from './App.css'
const preFixCls = 'main'
function App () {
  return (
    <div className='App'>
      <div className={style[`${preFixCls}-banner`]}>baneer</div>
      <div></div>
    </div>
  )
}

export default App
