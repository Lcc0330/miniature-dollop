import { Table, message, Button, Popconfirm, Form, Input } from 'antd'
import { useState, useEffect } from 'react'
import { fetchItem } from '../../untils'
import DataDrawer from '../../component/DataDrawer'

const preHost =
  window?.location?.hostname === 'localhost'
    ? 'localhost:3000'
    : '47.99.117.111:3007'
console.log(window.location?.hostname, 'sds')
const OperateIndex = () => {
  const columns = [
    {
      title: '身份证号',
      dataIndex: 'ID',
      key: 'ID',
      render: (text, record) => {
        return (
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
      title: '驾照类型',
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
      render: (text, record) => {
        return (
          <div>
            <div>
              科目一：
              {typeof text?.subjectOne === 'number' &&
                parseFloat(text?.subjectOne || 0)?.toFixed?.(2)}{' '}
            </div>
            <div>
              科目二：
              {typeof text?.subjectTwo === 'number' &&
                parseFloat(text?.subjectTwo || 0)?.toFixed?.(2)}
            </div>
            <div>
              科目三：
              {typeof text?.subjectThree === 'number' &&
                parseFloat(text?.subjectThree || 0)?.toFixed?.(2)}
            </div>
          </div>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      fixed: 'right',

      render: (t, record) => {
        return (
          <>
            <Button
              onClick={() =>
                setDataDrawer({ visible: true, data: record, type: 'edit' })
              }
              type='link'
            >
              更新
            </Button>
            <Popconfirm
              title={'是否确认删除？'}
              onConfirm={() => onDetele(record?.ID)}
              okText='确认'
              cancelText='取消'
            >
              <Button
                // onClick={() => onDetele(record?.ID)}
                type='link'
              >
                删除
              </Button>
            </Popconfirm>
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
  const [searchForm] = Form.useForm()
  const init = async () => {
    try {
      const preHost =
        window?.location?.hostname === 'localhost'
          ? 'localhost:3000'
          : '47.99.117.111:3007'

      console.log(1)
      const result = await fetchItem(
        `http://${preHost}/userInfo/findAll`,
        // 'http://localhost:3000/userInfo/findAll',
        {}
      )
      console.log(2)

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
        content: '请求失败'
      })
    }
  }
  const onSearch = async value => {
    try {
      const result = await fetchItem(
        `http://${preHost}/userInfo/findOne`,
        {
          name: value?.name || '',
          ID: value?.ID || ''
        },
        'POST'
      )
      if (result.success) {
        setData(result.data || [])
      } else {
        // message.error(result.data)
        messageApi.open({
          type: 'error',
          content: result.data || result?.message?.error
        })
      }
    } catch (err) {
      // message.error(err)
      console.log(JSON.stringify(err), 'err')
      messageApi.open({
        type: 'error',
        content: '搜索失败'
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
          type: 'success',
          content: '删除成功'
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
          type: 'success',
          content: '更新成功'
        })
        init()
        // setData(result.data)
      } else {
        // message.error(result.data)
        messageApi.open({
          type: 'error',
          content: `更新失败 ${result.data || result?.message?.message || ''}`
        })
      }
    } catch (err) {
      // message.error(err)
      console.log(err, 'sdd')
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
          type: 'success',
          content: '新建成功'
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
        content: `新建失败 ${err.data || err?.message || ''}`
      })
    }
  }
  const onOK = (id, params) => {
    if (id) {
      setDataDrawer({})
      onUpdate(id, params)
    } else {
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

      <div style={{margin: 15}}>
        <Form
          // layout='vertical'
          layout='inline'
          form={searchForm}
          onFinish={onSearch}
          preserve={false}
        >
          <Form.Item label={'身份证号'} name='ID'>
            <Input />
          </Form.Item>
          <Form.Item label={'姓名'} name='name'>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button onClick={() => searchForm.submit()} type='primary'>
              搜索
            </Button>
            <Button
              onClick={() => setDataDrawer({ visible: true, data: {} })}
              type='primary'
              style={{marginLeft:15}}
            >
              新增
            </Button>
          </Form.Item>
        </Form>
        
      </div>

      <Table
        dataSource={data}
        columns={columns}
        scroll={{ x: 'max-content' }}
        style={{ whiteSpace: 'nowrap' }}
      ></Table>
      <DataDrawer
        openData={dataDrawer}
        onClose={() => setDataDrawer({})}
        onOK={onOK}
      />
    </>
  )
}

export default OperateIndex
