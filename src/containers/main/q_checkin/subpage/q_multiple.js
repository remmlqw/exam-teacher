//单选题
import React from 'react';
import ReactDOM from 'react-dom'

import { Form,Input,Select,Icon,Radio,Row,Col,Button,Upload,message,Modal,Checkbox } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

let localCounter = 4;
class QMultiple extends React.Component {
  constructor(){
    super();
    this.state = {
      fileList : [],
      rightAnswer : [],
    }
  }

  //提交
  handleSubmit(e){
    e.preventDefault();


    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(this.state.rightAnswer.length === 0) {
          Modal.warning({
            content: '请选择正确答案',
            okText : '确定'
          });
          return;
        }
        let choice = [];
        for(let variable in values) {
          if (/^option/.test(variable)) {
            choice.push(values[variable]);
          }
        }

        //提交题目信息
        httpServer({
          url : URL.q_checkin
        },{
          className : 'QuestionInfoServiceImpl',
          gradeId : this.props.level,
          pointId : values.knowledgePoint,
          questionstem : values.tigan,
          imageSrc : '',
          type : 2,
          answer : this.state.rightAnswer,
          choice : choice,
          choiceType : 1
        })

      }
    });
  }

  //点击答案
  clickWhichAnswer(option){
    if(this.state.rightAnswer.indexOf(option) === -1) {
      this.state.rightAnswer.push(option);
    }
    else {
      this.state.rightAnswer = this.state.rightAnswer.filter(item=>item !== option);
    }

    this.state.rightAnswer = this.state.rightAnswer.sort();

    this.setState({rightAnswer : this.state.rightAnswer});
  }

  //增加选项
  addOption(){
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    let nextOptionCode = 'A'.charCodeAt(0);
    if(keys.length > 0) {
      let lastOptionCode = keys[keys.length - 1].option.charCodeAt(0);
      nextOptionCode = lastOptionCode+1;
    }

    keys.push({
      option : String.fromCharCode(nextOptionCode),
      key : ++localCounter
    });
    // this.setState({answerOptions : this.state.answerOptions})
    form.setFieldsValue({
      keys: keys,
    });
  }

  //删除选项
  deleteOption(key,i){

    this.state.rightAnswer = this.state.rightAnswer.filter(item=>item !== key);


    const { form } = this.props;
    let keys = form.getFieldValue('keys');
    // keys.splice(i,1);
    keys = keys.filter(item => item.option !== key)
    for(let j = i;j<keys.length;j++) {

      this.state.rightAnswer = this.state.rightAnswer.map((item)=>{
        if(keys[j].option === item) {
          return String.fromCharCode(keys[j].option.charCodeAt(0)-1);
        }
        return item;
      });

      keys[j].option = String.fromCharCode(keys[j].option.charCodeAt(0)-1);

      this.setState({rightAnswer : this.state.rightAnswer});

    }
    form.setFieldsValue({
      keys: keys,
    });
  }

  //选项输入框改变
  optionInputChange(i,e){
    this.state.answerOptions[i].answer = e.target.value;
  }


  render(){
    //验证
    const { getFieldDecorator,getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [{
      option : 'A',
      key : 0
    },{
      option : 'B',
      key : 1
    },{
      option : 'C',
      key : 2
    },{
      option : 'D',
      key : 3
    }] });
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

    //答案列表
    const keys = getFieldValue('keys');
    const answerList = keys.map((item, i) => {
      return (
        <Row key = {item.key}>
          <Col span={21}>
            <FormItem
              {...formItemLayout}
              label={'选项'+item.option}
            >
              {getFieldDecorator('option'+item.option)(
                  <Input addonAfter={<Checkbox onClick={this.clickWhichAnswer.bind(this,item.option)}>正确答案</Checkbox>}/>
              )}
            </FormItem>
          </Col>
          <Col span={2} offset={1}>
            <Button onClick={this.deleteOption.bind(this,item.option,i)}><Icon type="delete"></Icon></Button>
          </Col>
      </Row>
      )
    })

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
            {getFieldDecorator('knowledgePoint', {
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
            {getFieldDecorator('tigan', {
              rules: [{ required: true, message: '提干不能为空！' }],
            })(
              <Row>
                <Col span={24}>
                  <TextArea rows={4} />
                </Col>
              </Row>
            )}
          </FormItem>
          {answerList}
          <FormItem
          >
            <Row>
              <Col sm={3} xs={0}>
              </Col>
              <Col sm={20} xs={24}>
                <Row>
                  <Col sm={4} xs={4} offset={13}>
                    <Button type="primary" className="f-r" onClick={this.addOption.bind(this)}>新增选项</Button>
                  </Col>
                  <Col sm={4} xs={4}>
                    <Button type="primary" htmlType="submit" className="f-r">保存</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
    )
  }

}

export default Form.create()(QMultiple);
