import React from 'react'

import { Form,Input,Select,Row,Col,Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import BreadcrumbCustom from '@components/BreadcrumbCustom'
import { connect } from 'react-redux'
import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class AddStudent extends React.Component {
  constructor(){
    super()
    this.state = {
      pathList : ['班级管理','添加班级'],//面包屑路径
    }
  }

  //选择班级
  handleChange(value) {
    // console.log(`selected ${value}`);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        httpServer({
          url : URL.add_student
        },{
          className : 'StudentServiceImpl',
          type : 2,
          classId : values.class,
          name : values.name
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

    //科目信息
    let classtArr = [];
    if(this.props.classinfo.classArr) {
      classtArr = this.props.classinfo.classArr.map((item)=>{
        return (
          <Option value={item.classId} key={item.classId}>{item.className}</Option>
        )
      })
    }

    return(
      <div>
        <BreadcrumbCustom pathList={this.state.pathList}></BreadcrumbCustom>
        <div className="add-student-content">
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {getFieldDecorator('name',{
                rules: [{ required: true, message: '请输入姓名！' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="班级"
              key = "subject"
            >
              {getFieldDecorator('class',{
                rules: [{ required: true, message: '请选择班级！' }],
              })(
                <Select style={{ width: '100%' }} onChange={this.handleChange.bind(this)}>
                  {classtArr}
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

function mapStateToProps(state) {
    return {
        classinfo: state.classinfo
    }
}

export default connect(
    mapStateToProps
)(Form.create()(AddStudent))
