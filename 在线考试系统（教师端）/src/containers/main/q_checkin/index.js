//试题录入
import React from 'react';
import { Breadcrumb,Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import { connect } from 'react-redux'

import QSingle from './subpage/q_single'
import QMultiple from './subpage/q_multiple'
import QtureOrFalse from './subpage/q_true_or_false'
import QFillIn from './subpage/q_fill_in'
import QShortAnswer from './subpage/q_short_answer'
import QProgram from './subpage/q_program'
import BreadcrumbCustom from '@components/BreadcrumbCustom'

import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class QCheckin extends React.Component {
  constructor(){
    super();
    this.state = {
      pathList : [],//面包屑路径
      q_checkin_type : 'single',//选项卡用户选择的题目类型
      knowledgePoint : [],
    }
  }

  //跟新面包屑路径
  setPathList(myProps){
    this.state.pathList = [];
    this.state.pathList.push('试题录入');

    //判断状态管理是否有值（subjectArr是否有值）
    if(myProps.subjectinfo.subjectArr) {
      myProps.subjectinfo.subjectArr.some((item)=>{
        if(myProps.match.params.type == item.subjectid) {
          this.state.pathList.push(item.subjectname);

          //获取知识点
          httpServer({
            url : URL.knowledge_point
          },{
            className : 'KnowledgePointInfoServiceImpl',
            subjectId : item.subjectid,
            gradeId : myProps.match.params.level
          })
          .then((res)=>{
            this.state.knowledgePoint = res.data.data;
            this.setState({knowledgePoint:this.state.knowledgePoint});
          })

          return true;
        }
        return false;
      })
    }

    switch(myProps.match.params.level) {
      case '1' :
        this.state.pathList.push('初级');
      break;
      case '2' :
        this.state.pathList.push('中级');
      break;
      case  '3' :
      this.state.pathList.push('高级');
      break;
    }
    this.setState({
      pathList : this.state.pathList
    });
  }

  componentWillMount(){
    this.setPathList(this.props);//更新面包屑

    if(sessionStorage.getItem("q_checkin_type")) {
      //设置选项卡的题目的类型
      this.setState({q_checkin_type : sessionStorage.getItem("q_checkin_type")})
    }

  }

  componentWillUpdate(nextProps){
    //在这里使用this.setState会导致无限触发
  }

  componentWillReceiveProps(nextProps){
      this.setPathList(nextProps);//更新面包屑
      if (nextProps.location.pathname != this.props.location.pathname) {
        this.setState({//面包屑改变 重置q_checkin_type
          q_checkin_type : 'single'
        });
        sessionStorage.setItem("q_checkin_type", 'single');
      }
  }

  callback(key) {
    this.setState({
      q_checkin_type : key
    });
    sessionStorage.setItem("q_checkin_type", key);//存储用户点击选项卡的题目类型
  }

  render(){

    return(
      <div className="q-checkin">
        <BreadcrumbCustom pathList={this.state.pathList}></BreadcrumbCustom>
        <div className="q-checkin-content">
          <div className="card-container">
            <Tabs type="card" defaultActiveKey={this.state.q_checkin_type} activeKey={this.state.q_checkin_type} onChange={this.callback.bind(this)}>
              <TabPane tab="单选题" key="single">
                <QSingle knowledgePoint={this.state.knowledgePoint} type={this.props.match.params.type} level={this.props.match.params.level}></QSingle>
              </TabPane>
              <TabPane tab="多选题" key="multiple">
                <QMultiple knowledgePoint={this.state.knowledgePoint} type={this.props.match.params.type} level={this.props.match.params.level}></QMultiple>
              </TabPane>
              <TabPane tab="判断题" key="true_or_false ">
                <QtureOrFalse knowledgePoint={this.state.knowledgePoint} type={this.props.match.params.type} level={this.props.match.params.level}></QtureOrFalse>
              </TabPane>
              <TabPane tab="填空题" key="4">
                <QFillIn knowledgePoint={this.state.knowledgePoint} type={this.props.match.params.type} level={this.props.match.params.level}></QFillIn>
              </TabPane>
              <TabPane tab="简答题" key="5">
                <QShortAnswer knowledgePoint={this.state.knowledgePoint} type={this.props.match.params.type} level={this.props.match.params.level}></QShortAnswer>
              </TabPane>
              <TabPane tab="程序题" key="6">
                <QProgram knowledgePoint={this.state.knowledgePoint} type={this.props.match.params.type} level={this.props.match.params.level}></QProgram>
              </TabPane>
            </Tabs>
          </div>
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
)(QCheckin)
