import React from 'react'

import { Form,Input,Select,Row,Col,Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import BreadcrumbCustom from '@components/BreadcrumbCustom'
import { connect } from 'react-redux'
import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class AddClass extends React.Component {
  constructor(){
    super()
    this.state = {
      pathList : ['班级管理','添加班级'],//面包屑路径
    }
  }

  //选择班级
  handleChange(value) {
    console.log(`selected ${value}`);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        httpServer({
          url : URL.add_class
        },{
          className : 'ClassServiceImpl',
          type : 2,
          subjectId : values.subject,
          name : values.className
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
    let subjectArr = [];
    if(this.props.subjectinfo.subjectArr) {
      subjectArr = this.props.subjectinfo.subjectArr.map((item)=>{
        return (
          <Option value={item.subjectid} key={item.subjectid}>{item.subjectname}</Option>
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
              label="班级名称"
            >
              {getFieldDecorator('className',{
                rules: [{ required: true, message: '请输入班级名称！' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="科目"
              key = "subject"
            >
              {getFieldDecorator('subject',{
                rules: [{ required: true, message: '请选择科目！' }],
              })(
                <Select style={{ width: '100%' }} onChange={this.handleChange.bind(this)}>
                  {subjectArr}
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
        subjectinfo: state.subjectinfo
    }
}

export default connect(
    mapStateToProps
)(Form.create()(AddClass))
