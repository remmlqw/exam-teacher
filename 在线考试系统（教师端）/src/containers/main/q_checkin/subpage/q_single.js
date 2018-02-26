//单选题
import React from 'react';
import ReactDOM from 'react-dom'

import { Form,Input,Select,Icon,Radio,Row,Col,Button,Upload,message,Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

let localCounter = 4;
class QSingle extends React.Component {
  constructor(){
    super();
    this.state = {
      fileList : [],
      rightAnswer : '',
    }
  }

  //提交
  handleSubmit(e){
    e.preventDefault();


    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(this.state.rightAnswer === '') {
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
          choiceType : 0
        })

      }
    });
  }

  //点击答案
  clickWhichAnswer(option){
    this.setState({rightAnswer : option})
    // console.log(this.state.rightAnswer)
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

    const { form } = this.props;
    let keys = form.getFieldValue('keys');
    if(i === keys.length-1) {
      //删除的是最后一个
      this.setState({rightAnswer : ''})
    }
    keys = keys.filter(item => item.option !== key)
    for(let j = i;j<keys.length;j++) {
      keys[j].option = String.fromCharCode(keys[j].option.charCodeAt(0)-1);
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

    // const props = {
    //   action: 'https://fe.daxiangw.com/upload/file',
    //   listType: 'picture',
    //   // defaultFileList: [...fileList],
    //   className: 'upload-list-inline',
    //   onChange : (info) => {
    //     // if (info.file.status !== 'uploading') {
    //     //   console.log(info.file, info.fileList);
    //     // }
    //     // if (info.file.status === 'done') {
    //     //   message.success(`${info.file.name} 图片上传成功！`);
    //     // } else if (info.file.status === 'error') {
    //     //   message.error(`${info.file.name} 图片上传失败`);
    //     // }
    //
    //     let fileList = info.fileList;
    //     //得到服务器的响应，得到图片地址
    //     fileList = fileList.map((file) => {
    //       if (file.response) {
    //         //
    //         // console.log(file.response.imageUrl);//服务器返回的url
    //         file.url = file.response.imageUrl;
    //       }
    //       return file;
    //     });
    //
    //     //根据服务器判断文件是否上传成功
    //     fileList = fileList.filter((file) => {
    //       if (file.response) {
    //         if(file.response.status) {
    //           message.success(`${info.file.name} 图片上传成功！`);
    //         }
    //         else {
    //           message.error(`${info.file.name} 图片上传失败`);
    //         }
    //         return file.response.status === true;
    //       }
    //       return true;
    //     });
    //     this.setState({ fileList });
    //   }
    // };

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
                  <Input addonAfter={<Radio checked={this.state.rightAnswer === item.option} onClick={this.clickWhichAnswer.bind(this,item.option)}>正确答案</Radio>}/>
              )}
            </FormItem>
          </Col>
          <Col span={2} offset={1}>
            <Button onClick={this.deleteOption.bind(this,item.option,i)}><Icon type="delete"></Icon></Button>
          </Col>
        </Row>
      )
    })

    // for(let i = 0; i<this.state.answerOptions.length;i++ ) {
    //   answerList.push(
    //     <FormItem
    //       {...formItemLayout}
    //       label={'选项'+this.state.answerOptions[i].option}
    //       key = {++localCounter}
    //     >
    //       {getFieldDecorator('option'+this.state.answerOptions[i].option)(
    //         <Input/>
    //       )}
    //
    //         {/* <Row>
    //           <Col span={21}>
    //             <Input defaultValue={this.state.answerOptions[i].answer} onChange={this.optionInputChange.bind(this,i)} addonAfter={<Radio checked={this.state.rightAnswer === this.state.answerOptions[i].option} onFocus={this.clickWhichAnswer.bind(this,this.state.answerOptions[i].option)}>正确答案</Radio>}/>
    //           </Col>
    //           <Col span={2} offset={1}>
    //             <Button onClick={this.deleteOption.bind(this,i)}><Icon type="delete"></Icon></Button>
    //           </Col>
    //         </Row> */}
    //     </FormItem>
    //   )
    // }

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

            {/* <Row>
              <Col span={24}>
                <Upload {...props}>
                  <Button><Icon type="upload"></Icon>上传图片</Button>
                </Upload>
              </Col>
            </Row> */}
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

export default Form.create()(QSingle);
