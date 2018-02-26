//单选题
import React from 'react';
import ReactDOM from 'react-dom'

import { Form,Input,Select,Icon,Radio,Row,Col,Button,Upload,message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class QProgram extends React.Component {
  constructor(){
    super();
    this.state = {
      fileList : [],
      localCounter : 0
    }
  }

  //提交
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        //提交题目信息
        httpServer({
          url : URL.q_checkin
        },{
          className : 'QuestionInfoServiceImpl',
          gradeId : this.props.level,
          pointId : values.knowledgePoint,
          questionstem : values.tigan,
          imageSrc : '',
          type : 6,
        })

      }
    });
  }

  handleChange(value) {
    // console.log(`selected ${value}`);
  }

  //选项输入框改变
  optionInputChange(i,e){
    this.state.answerOptions[i].answer = e.target.value;
  }

  render(){
    //验证
    const { getFieldDecorator } = this.props.form;

    //表单项布局
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    //知识点列表
    let knowledgePoint = [];
    this.props.knowledgePoint.forEach((item,index)=>{
      knowledgePoint.push(
        <Option key={index} value={item.pointId}>{item.pointName}</Option>
      )
    })

    return(
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem
            {...formItemLayout}
            label="知识点"
          >
            {getFieldDecorator('knowledgePoint',{
              rules: [{ required: true, message: '知识点不能为空！'}],
            })(
              <Select style={{ width: 120 }}>
                {knowledgePoint}
              </Select>
            )}

          </FormItem>
          <FormItem
            {...formItemLayout}
            label="提干"
          >
            {getFieldDecorator('tigan',{
              rules: [{ required: true, message: '提干不能为空！'}],
            })(
              <Row>
                <Col span={24}>
                  <TextArea rows={4} />
                </Col>
              </Row>
            )}
          </FormItem>
          <FormItem
          >
            <Row>
              <Col sm={3} xs={0}>
              </Col>
              <Col sm={20} xs={24}>
                  <Button type="primary" htmlType="submit" className="f-r">保存</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
    )
  }

}

export default Form.create()(QProgram);
