import React from 'react'

import { Form,Input,Select,Row,Col,Button,DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import { connect } from 'react-redux'

import BreadcrumbCustom from '@components/BreadcrumbCustom'
import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class CreateExam extends React.Component {
  constructor(){
    super()
    this.state = {
      pathList : ['考试管理','创建考试'],//面包屑路径
      classId : 0,
      levelId : 0,
      paperIdList : [],
    }
    this.havePaperName = 0;
  }

  //选择班级
  handleChange(value) {
    this.classId = value;
    this.havePaperName ++;
    if(this.havePaperName == 2) {
      this.havePaperName = 0;
      httpServer({
        url : URL.get_paperId
      },{
        className : 'GetPaperIdImpl',
        classId : this.classId,
        gradeId : this.levelId,
      })
      .then((res)=>{
        let respData = res.data.data;
        this.setState({paperIdList : respData})
      })
    }
  }

  //选择等级
  changeLevel(value){
    this.levelId = value;
    this.havePaperName ++;
    if(this.havePaperName == 2) {
      this.havePaperName = 0;
      httpServer({
        url : URL.get_paperId
      },{
        className : 'GetPaperIdImpl',
        classId : this.classId,
        gradeId : this.levelId,
      })
      .then((res)=>{
        let respData = res.data.data;
        this.setState({paperIdList : respData})
      })
    }
  }

  //表单提交
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        httpServer({
          url : URL.create_exam
        },{
          className : 'CreateTestImpl',
          classId : values.classId,
          paperId : values.paperId,
          startTime : values.startTime.format('YYYY-MM-DD HH:mm:ss'),
          endTime : values.endTime.format('YYYY-MM-DD HH:mm:ss'),
          examName : values.examName,
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

    //班级信息
    let classtArr = [];
    if(this.props.classinfo.classArr) {
      classtArr = this.props.classinfo.classArr.map((item)=>{
        return (
          <Option value={item.classId} key={item.classId}>{item.className}</Option>
        )
      })
    }

    //试卷编号
    let paperIdList = [];
    paperIdList = this.state.paperIdList.map((item)=>{
      return(
        <Option value={item} key={item}>{item}</Option>
      )
    })

    return(
      <div>
        <BreadcrumbCustom pathList={this.state.pathList}></BreadcrumbCustom>
        <div className="change-password-content">
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormItem
              {...formItemLayout}
              label="班级"
            >
              {getFieldDecorator('classId')(
                <Select style={{ width: '100%' }} onChange={this.handleChange.bind(this)}>
                  {classtArr}
                </Select>
              )}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="考试名称"
            >
              {getFieldDecorator('examName')(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="级别"
            >
              {getFieldDecorator('level')(
                <Select style={{ width: '100%' }} onChange={this.changeLevel.bind(this)}>
                  <Option value={1}>初级</Option>
                  <Option value={2}>中级</Option>
                  <Option value={3}>高级</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="试卷编号"
            >
              {getFieldDecorator('paperId')(
                <Select notFoundContent="请选择班级和级别" style={{ width: '100%' }}>
                  {paperIdList}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="开始时间"
            >
              {getFieldDecorator('startTime')(
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="选择时间"
                  style={{width:'100%'}}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="结束时间"
            >
              {getFieldDecorator('endTime')(
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="选择时间"
                  style={{width:'100%'}}
                />
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

function mapStateToProps(state) {
    return {
        classinfo: state.classinfo
    }
}

export default connect(
    mapStateToProps
)(Form.create()(CreateExam))
