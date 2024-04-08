import { Table, message, Button } from 'antd'
import { useState, useEffect } from 'react'
import { fetchItem } from '../../untils'
import DataDrawer from '../../component/DataDrawer'

const preHost=window?.location?.hostname==='localhost'?'localhost:3000':'47.99.117.111:3007'
console.log(window.location?.hostname,'sds')
const OperateIndex = () => {
  const columns = [
    {
      title: '身份证号',
      dataIndex: 'ID',
      key: 'ID',
      render:(text,record)=>{
        return(
            <div>
                <div>{record?.name}</div>
                {/* <div>身份证：</div> */}
                <div>{text}</div>
            </div>
        )
      }
    },

    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: '类型',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: '驾校',
      dataIndex: 'drivingSchool',
      key: 'drivingSchool'
    },
    {
      title: '学时',
      dataIndex: 'subjectHours',
      key: 'subjectHours',
      render:(text,record)=>{
        console.log(text,'sd?')

        return<div>
            <div>科目一：{typeof text?.subjectOne ==='number'&& parseFloat(text?.subjectOne?.toFixed?.(2))} </div>
            <div>科目二：{typeof text?.subjectTwo ==='number'&& parseFloat(text?.subjectTwo?.toFixed?.(2))}</div>
            <div>科目三：{typeof text?.subjectThree ==='number'&& parseFloat(text?.subjectThree?.toFixed?.(2))}</div>
        </div>

      }
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      fixed:'right',

      render: (t, record) => {
        return (
          <>
            <Button
              onClick={() => setDataDrawer({ visible: true, data: record })}
              type='link'
            >
              更新
            </Button>
            <Button onClick={() => onDetele(record?.ID)} type='link'>
              删除
            </Button>
          </>
        )
      }
    }
  ]
  const [messageApi, contextHolder] = message.useMessage()
  const [data, setData] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchID, setSearchID] = useState('')
  const [dataDrawer, setDataDrawer] = useState({})

  const init = async () => {
    try {
      console.log(1)
      const result = await fetchItem(
        `http://${preHost}/userInfo/findAll`,
        {}
      )
      console.log(2)
      console.log(result, 'result init')

      if (result.success) {
        setData(result.data)
      } else {
        // message.error(result.data)
        messageApi.open({
          type: 'error',
          content: result.data
        })
      }
    } catch (err) {
      // message.error(err)
      console.log(err, 'sd')
      messageApi.open({
        type: 'error',
        content: err
      })
    }
  }
  const onSearch = async () => {
    try {
      const result = await fetchItem('http://localhost:3000/userInfo/findOne', {
        name: searchName,
        ID: searchID
      })
      if (result.success) {
        setData(result.data)
      } else {
        // message.error(result.data)
        messageApi.open({
          type: 'error',
          content: result.data
        })
      }
    } catch (err) {
      // message.error(err)
      messageApi.open({
        type: 'error',
        content: err
      })
    }
  }

  const onDetele = async id => {
    try {
      const result = await fetchItem(
        `http://${preHost}/userInfo/delete`,
        {
          ID: id
        },
        'DELETE'
      )
      if (result.success) {
        messageApi.open({
            type:'success',
            content:'删除成功'
        })
        init()
        // setData(result.data)
      } else {
        // message.error(result.data)
        messageApi.open({
          type: 'error',
          content: `删除失败 ${result.data || result?.message?.message || ''}`

        })
      }
    } catch (err) {
      // message.error(err)
      messageApi.open({
        type: 'error',
        content: `删除失败 ${err.data || err?.message || ''}`

      })
    }
  }
  const onUpdate = async (updataId, params) => {
    try {
      const result = await fetchItem(
        `http://${preHost}/userInfo/update`,
        {
          ID: updataId,
          updateItemDto: params
        },
        'PUT'
      )
      if (result.success) {
        messageApi.open({
            type:'success',
            content:'更新成功'
        })
        init()
        // setData(result.data)
      } else {
        // message.error(result.data)
        console.log(result,'???')
        messageApi.open({
          type: 'error',
          content: `更新失败 ${result.data || result?.message?.message || ''}`
        })
      }
    } catch (err) {
      // message.error(err)
      console.log(err,'sdd')
      messageApi.open({
        type: 'error',
        content: `更新失败 ${err?.message}`
      })
    }
  }
  const onCreate = async params => {
    try {
      const result = await fetchItem(
        `http://${preHost}/userInfo/create`,
        params,
        'POST'
      )
      if (result.success) {
        messageApi.open({
            type:'success',
            content:'新建成功'
        })
        init()
        // setData(result.data)
      } else {
        // message.error(result.data)
        messageApi.open({
          type: 'error',
          content: `新建失败 ${result.data || result?.message?.message || ''}`

        })
      }
    } catch (err) {
      // message.error(err)
      messageApi.open({
        type: 'error',
          content: `新建失败 ${err.data ||err?.message || ''}`
      })
    }
  }
  const onOK= (id,params)=>{
    if(id){
        setDataDrawer({})
        onUpdate(id,params)
    }else{
        setDataDrawer({})

        onCreate(params)
    }

  }
  useEffect(() => {
    init()
  }, [])
  return (
    <>
    {contextHolder}
      <Button onClick={() => setDataDrawer({ visible: true, data: {} })} type='primary'>
        新增
      </Button>
      <Table dataSource={data} columns={columns} scroll={{x:'max-content'}}style={{whiteSpace:'nowrap'}}></Table>
      <DataDrawer
       openData={dataDrawer} 
      onClose={() => setDataDrawer({})} 
      onOK={onOK}
      />
    </>
  )
}

export default OperateIndex
