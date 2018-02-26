import React from 'react'
import { Card,Icon } from 'antd';
import { Link  } from 'react-router-dom';
import FastEnterCard from './subpage/fast_enter_card.js'


export default class Homepage extends React.Component {
  constructor(){
    super()
    this.state = {

    }
  }
  render(){
    return(
      <div  className="homepage clearfix">
        <div className="fast-enter-card">
          <Link to="/main/q_checkin/java/primary">
            <FastEnterCard title="试题录入" icon="form"></FastEnterCard>
          </Link>
        </div>
        <div className="fast-enter-card">
          <Link to="/main/choose_questions">
            <FastEnterCard title="考试出卷" icon="profile"></FastEnterCard>
          </Link>
        </div>
        <div className="fast-enter-card">
          <Link to="/main/score_search">
            <FastEnterCard title="成绩查询" icon="search"></FastEnterCard>
          </Link>
        </div>
        <div className="fast-enter-card">
          <Link to="/main/student_manage/query_student">
            <FastEnterCard title="学生管理" icon="usergroup-add"></FastEnterCard>
          </Link>
        </div>

        <div className="fast-enter-card">
          <Link to="/main/teacher_manage/query_teacher">
            <FastEnterCard title="教师管理" icon="user-add"></FastEnterCard>
          </Link>
        </div>
        <div className="fast-enter-card">
          <Link to="/main/class_manage">
            <FastEnterCard title="班级管理" icon="layout"></FastEnterCard>
          </Link>
        </div>
        <div className="fast-enter-card">
          <Link to="/main/paper_manage/scoring">
            <FastEnterCard title="在线阅卷  " icon="desktop"></FastEnterCard>
          </Link>
        </div>
      </div>
    )
  }
}
