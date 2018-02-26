import React from 'react'

import { Form,Input,Select,Row,Col,Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import BreadcrumbCustom from '@components/BreadcrumbCustom'
import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class AddTeacher extends React.Component {
  constructor(){
    super()
    this.state = {
      pathList : ['教师管理','添加教师'],//面包屑路径
      managerId : 0,
    }
  }

  //选择班级
  handleChange(value) {
    console.log(`selected ${value}`);
  }

  //获取工号
  getManagerId(){
    httpServer({
      url : URL.get_manager_id
    },{
      className : 'ManagerServiceImpl',
      type : 5,
    })
    .then((res)=>{
      this.setState({managerId:res.data.data});
    })
  }

  //提交
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        httpServer({
          url : URL.add_teacher
        },{
          className : 'ManagerServiceImpl',
          type : 1,
          roleId : values.roleId,
          name : values.name,
          managerId : this.state.managerId,
        })
      }
    });
  }

  componentWillMount(){
    this.getManagerId();
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
        <div className="add-student-content">
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormItem
              {...formItemLayout}
              label="工号"
            >
              <span>{this.state.managerId}</span>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {getFieldDecorator('name')(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="角色"
            >
              {getFieldDecorator('roleId')(
                <Select style={{ width: '100%' }}>
                  <Option value={2}>教学</Option>
                  <Option value={3}>教务</Option>
                </Select>
              )}
            </FormItem>
            <Row>
              <Col span={12} offset={4}>
                <Button type="primary" htmlType="submit" className="f-r">添加</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(AddTeacher)
