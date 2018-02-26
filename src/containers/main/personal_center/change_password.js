import React from 'react'

import { Form,Input,Select,Row,Col,Button,Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import BreadcrumbCustom from '@components/BreadcrumbCustom'
import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class ChangePassword extends React.Component {
  constructor(){
    super()
    this.state = {
      pathList : ['个人中心','修改密码'],//面包屑路径
    }
  }

  //选择班级
  handleChange(value) {
    console.log(`selected ${value}`);
  }

  submitChange(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values.password1 !== values.password2) {
          Modal.warning({
            title : '两次输入的密码不一致',
            okText : '确定'
          })
          return;
        }
        httpServer({
          url : URL.change_password
        },{
          className : 'UpdateUserPwdServiceImpl',
          type : 1,
          password : values.password1,
          oldPassword : values.oldPassword
        })
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;

    //表单布局
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 , offset : 4},
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };

    return(
      <div>
        <BreadcrumbCustom pathList={this.state.pathList}></BreadcrumbCustom>
        <div className="change-password-content">
          <Form onSubmit={this.submitChange.bind(this)}>
            <FormItem
              {...formItemLayout}
              label="原密码"
            >
              {getFieldDecorator('oldPassword',{
                rules: [{ required: true, message: '请输入原密码！' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="新密码"
            >
              {getFieldDecorator('password1',{
                rules: [{ required: true, message: '请输入新密码！' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="确认密码"
            >
              {getFieldDecorator('password2',{
                rules: [{ required: true, message: '请输入确认密码！' }],
              })(
                <Input />
              )}
            </FormItem>
            <Row>
              <Col span={12} offset={4}>
                <Button type="primary" htmlType="submit" className="f-r">确定</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(ChangePassword)
