import { Drawer, Form, Input, InputNumber, Button, Popconfirm } from 'antd'
import { useState, useEffect } from 'react'
const DataDrawer = props => {
  const { openData = {}, onClose = () => {}, onOK = () => {} } = props
  //   const [data, setData] = useState([])
  const isEdit = openData?.type === 'edit'
  const [baseForm] = Form.useForm()

  const onFinish = value => {
    const { data } = openData

    onOK(data?.ID, value)
  }
  return (
    <Drawer
      open={openData?.visible}
      onClose={onClose}
      footer={
        <>
          <Popconfirm
            title={'是否确认更新数据？'}
            onConfirm={() => baseForm.submit()}
            okText='确认'
            cancelText='取消'
          >
            <Button
              // onClick={() => baseForm.submit()}
              type='primary'
            >
              {' '}
              提交
            </Button>
          </Popconfirm>
          <Button onClick={onClose} style={{ marginLeft: 15 }}>
            取消
          </Button>
        </>
      }
      destroyOnClose={true}
    >
      <Form
        layout='vertical'
        form={baseForm}
        onFinish={onFinish}
        preserve={false}
        initialValues={openData?.data}
      >
        <Form.Item
          name='ID'
          label='身份证号'
          rules={[{ required: true, message: '请输入身份证号' }]}
          disabled={isEdit}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='name'
          label='姓名'
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='phone'
          label='电话'
          rules={[{ required: true, message: '请输入电话' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='category'
          label='驾照类型'
          rules={[{ required: true, message: '请输入类型' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='status'
          label='状态'
          rules={[{ required: true, message: '请输入状态' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='drivingSchool'
          label='驾校'
          rules={[{ required: true, message: '请输入驾校' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name='subjectHours'>
          <Form.Item
            name={['subjectHours', 'subjectOne']}
            label='科目一学时'
            rules={[{ required: true, message: '请输入科目一学时' }]}
          >
            <InputNumber step={0.01} decimalSeparator={'.'} precision={2} />
          </Form.Item>
          <Form.Item
            name={['subjectHours', 'subjectTwo']}
            label='科目二学时'
            rules={[{ required: true, message: '请输入科目二学时' }]}
          >
            <InputNumber step={0.01} decimalSeparator={'.'} precision={2} />
          </Form.Item>
          <Form.Item
            name={['subjectHours', 'subjectThree']}
            label='科目三学时'
            rules={[{ required: true, message: '请输入科目三学时' }]}
          >
            <InputNumber step={0.01} decimalSeparator={'.'} precision={2} />
          </Form.Item>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default DataDrawer
