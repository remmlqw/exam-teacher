import React from 'react'
import { Form,Input,Select,Icon,Radio,Row,Col,Button,message,InputNumber,Card } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

let localCounter = 2;
class ChooseCard extends React.Component {
  constructor(){
    super()
    this.state = {
      num : 0
    }
  }

  //知识点下拉选择
  knowledgeChange(i,value) {
    if(typeof this.props.singleQuestion.knowledgePointInfo[i] === "undefined") {
      this.props.singleQuestion.knowledgePointInfo[i] = {};
    }
    this.props.singleQuestion.knowledgePointInfo[i].knowledge = value;
  }

  //个数比改变
  countChange(i,value){
    if(typeof this.props.singleQuestion.knowledgePointInfo[i] === "undefined") {
      this.props.singleQuestion.knowledgePointInfo[i] = {};
    }
    this.props.singleQuestion.knowledgePointInfo[i].count = value;

    let totalCount = 0;
    this.props.singleQuestion.knowledgePointInfo.forEach((item)=>{
       totalCount += item.count;
    })
    this.setState({num:totalCount});
    this.props.singleQuestion.num = totalCount;


  }

  //删除选项
  deleteOption(key,i){
    const { form } = this.props;
    let keys = form.getFieldValue('keys');
    keys = keys.filter(item => item !== key)
    form.setFieldsValue({
      keys: keys,
    });
  }

  //增加选项
  addOption(){
    const { form } = this.props;
    let keys = form.getFieldValue('keys');
    keys.push(++localCounter);
    form.setFieldsValue({
      keys: keys,
    });
  }

  // //个数改变
  // numChange(value){
  //   this.props.singleQuestion.num = value;
  // }

  //分值改变
  scoreChange(value){
    this.props.singleQuestion.score = value;
  }

  render(){
    // console.log(this.props.singleQuestion)

    const { getFieldDecorator,getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [0,1]});

    //表单项布局
    const formItemLayout = {
      labelCol: {
        sm: { span: 12 },
      },
      wrapperCol: {
        sm: { span: 12 },
      },
    };

    //知识点列表
    let knowledgePointInfo = [];
    if(this.props.knowledgePointInfo.length !== 0 ) {
      knowledgePointInfo = this.props.knowledgePointInfo.map((item)=>{
        return (
          <Option value={item.pointId} key={item.pointId}>{item.pointName}</Option>
        )
      })
    }

    const keys = getFieldValue('keys');
    const singlePointList = keys.map((item, i) => {
      return (
        <Row key = {item}>
          <Col span={10}>
            <FormItem
              label="知识点"
              {...formItemLayout}
            >
              <Select notFoundContent="请选择科目和级别" onChange={this.knowledgeChange.bind(this,i)}>
                {knowledgePointInfo}
              </Select>
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem
              label="个数"
              {...formItemLayout}
            >
              <InputNumber min={0} defaultValue={0} onChange={this.countChange.bind(this,i)}/>
            </FormItem>
          </Col>
          <Col span={2}>
            <Button className="f-r" onClick={this.deleteOption.bind(this,item)}><Icon type="delete"></Icon></Button>
          </Col>
        </Row>
      )
    })

    return(
      <Card title={this.props.title} bordered={false} style={{ width: '100%', marginBottom:'20px' }}>
        <Row>
          <Col span={10}>
            <FormItem
              label="总个数"
              {...formItemLayout}
              key="num"
            >
              <span>{this.state.num}</span>
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem
              label="分值"
              {...formItemLayout}
            >
              {getFieldDecorator('score',{
                initialValue : '0'
              })(
                <InputNumber min={0} onChange={this.scoreChange.bind(this)}/>
              )}
            </FormItem>
          </Col>
        </Row>
        {singlePointList}
        <Row>
          <Col span={22}>
            <FormItem>
              <Button className="f-r" type="primary" onClick={this.addOption.bind(this)}>新增知识点</Button>
            </FormItem>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default Form.create()(ChooseCard);
