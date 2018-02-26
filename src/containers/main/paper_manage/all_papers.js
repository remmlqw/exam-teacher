import React from 'react'
import BreadcrumbCustom from '@components/BreadcrumbCustom'
import {Row,Col,Select,Input,Table, Icon, Divider,Button} from 'antd'
const Option = Select.Option;
const Search = Input.Search;

import {Link} from 'react-router-dom'
import {withRouter} from "react-router-dom";
import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class AllPapers extends React.Component {
  constructor(){
    super()
    this.state = {
      data : [],
      pagination : {
        pageSize : 10,
        current : 1,
        total : 0,
        defaultCurrent : 1,
      },
    }
  }

  //得到所有试卷
  getAllPapers(paperId,classId,managerId){
    httpServer({
      url : URL.get_all_papers
    },{
      className : 'QueryExamServiceImpl',
      page : this.state.pagination.current,
      rows : this.state.pagination.pageSize,
      type : 2,
      paperId : paperId,
      classId : classId,
      managerId : managerId,
    })
    .then((res)=>{
      const data = [];
      for (let i = 0; i < res.data.data.length; i++) {
        let status = res.data.data[i].status == '3' ? '已阅卷' : '未阅卷';
        data.push({
          key: i,
          name: res.data.data[i].name,
          stuId : res.data.data[i].stuId,
          statusId : res.data.data[i].status,
          statusName : status,
          instId : res.data.data[i].instId,
        });
      }

      this.state.pagination.total = res.data.total;

      this.setState({
        data:data,
        pagination : this.state.pagination
      })

    })
    .catch((err)=>{
      this.props.history.push('/main/paper_manage/scoring');
    })

  }

  //点击开始阅卷
  beginReading(){

  }

  componentWillMount(){
    this.getAllPapers(this.props.match.params.paperId,this.props.match.params.classId,this.props.match.params.managerId);
  }
  componentDidmount(){
  }

  componentWillReceiveProps(nextProps){
  }

  //阅卷老师选择
  handleChange(value) {
    console.log(`selected ${value}`);
  }

  //选择某一行
  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  //翻页
  handleTableChange(pagination, filters, sorter){
    const pager = this.state.pagination;
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;
    this.setState({
      pagination: pager,
    });
    if(this.turnStatus === "NORMAL") {
      this.getPageDate();
    }
    else {
      this.getSearchData();
    }

  }

  render(){
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '学号',
      dataIndex: 'stuId',
      key: 'stuId',
    }, {
      title: '状态',
      dataIndex: 'statusName',
      key: 'statusName',
    }, {
      title: '阅卷',
      key: 'action',
      render: (text, record) => (
        <span>
          {this.state.data[record.key].statusId == '3' ?
          <Button size="small" onClick={this.beginReading.bind(this)}>
            <Link
              to={`/main/paper_manage/scoring/all_papers/reading_paper/${this.props.match.params.paperId}/${this.props.match.params.classId}/${this.state.data[record.key].instId}`}
            >重新阅卷</Link>
          </Button> :
          <Button type="primary" size="small" onClick={this.beginReading.bind(this)}>
            <Link
              to={`/main/paper_manage/scoring/all_papers/reading_paper/${this.props.match.params.paperId}/${this.props.match.params.classId}/${this.state.data[record.key].instId}`}
            >开始阅卷</Link>
          </Button>
          }
        </span>
      ),
    }];

    let localeObj = {
      emptyText: '暂无数据'
    }

    return(
      <div>
        <BreadcrumbCustom pathList={['试卷管理',['在线阅卷'],['所有试卷']]}></BreadcrumbCustom>
        <div className="scoring-paper-content">
          <Row>
            <Button type="primary" className="f-r m-b-20"><Link to="/main/paper_manage/scoring"><Icon type="left" />返回</Link></Button>
          </Row>
          <Table
            // rowSelection={rowSelection}
            columns={columns}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            locale={localeObj}
            onChange={this.handleTableChange.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(AllPapers);
