import React from 'react'
import BreadcrumbCustom from '@components/BreadcrumbCustom'
import { Form } from 'antd';
import {Row,Col,Select,Input,Table, Icon, Divider,Button,Modal,message} from 'antd'
const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
const confirm = Modal.confirm;

import httpServer from '@components/httpServer.js';
import { connect } from 'react-redux'
import * as URL from '@components/interfaceURL.js'

class QueryClass extends React.Component {
  constructor(){
    super()
    this.state = {
      selectedRowKeys : [], //选择的行
      data : [],
      pagination : {
        pageSize : 10,
        current : 1,
        total : 0,
        defaultCurrent : 1,
      },
      visibleChangeModal : false,//修改框是否显示
      curSelectClass : {//当前所选的班级
        classId : 1,
        className : "西脱1711",
        key : 1,
        statusId : 1,
        statusName : "未毕业",
        subjectId : 2,
        subjectName : "Web前端"
      },
    }
    this.searchKey = "1";//默认按照班级搜索  1班级 2科目  3状态
    this.turnStatus = "NORMAL"; //NORMAL:正常翻页   SEARCH:搜索翻页
    this.searchContent = ""; //搜索内容
  }

  //得到一页数据
  getPageDate(){
    httpServer({
      url : URL.get_class
    },{
      className : 'ClassServiceImpl',
      page : this.state.pagination.current,
      rows : this.state.pagination.pageSize,
      type : 1,
    })
    .then((res)=>{
      const data = [];
      for (let i = 0; i < res.data.data.length; i++) {

        let statusName = res.data.data[i].status == '0' ? '已毕业' : '未毕业';
        let subjectName = "";
        this.props.subjectinfo.subjectArr.some((item)=>{
          if(item.subjectid == res.data.data[i].subjectId) {
            subjectName = item.subjectname;
            return true;
          }
          return false;
        })

        data.push({
          key: res.data.data[i].classId,
          className: res.data.data[i].className,
          classId : res.data.data[i].classId,
          subjectName : subjectName,
          subjectId : res.data.data[i].subjectId,
          statusName: statusName,
          statusId: res.data.data[i].status
        });
      }

      this.state.pagination.total = res.data.total;

      this.setState({
        data:data,
        pagination : this.state.pagination
      })
    })
  }

  //得到搜索的数据
  getSearchData(){
    httpServer({
      url : URL.search_class
    },{
      className : 'ClassServiceImpl',
      content : this.searchContent,
      searchType : this.searchKey,
      page : this.state.pagination.current,
      rows : this.state.pagination.pageSize,
      type : 1
    })
    .then((res)=>{
      const data = [];
      for (let i = 0; i < res.data.data.length; i++) {
        let statusName = res.data.data[i].status == '0' ? '已毕业' : '未毕业';
        let subjectName = "";
        this.props.subjectinfo.subjectArr.some((item)=>{
          if(item.subjectid == res.data.data[i].subjectId) {
            subjectName = item.subjectname;
            return true;
          }
          return false;
        })

        data.push({
          key: res.data.data[i].classId,
          className: res.data.data[i].className,
          classId : res.data.data[i].classId,
          subjectName : subjectName,
          subjectId : res.data.data[i].subjectId,
          statusName: statusName,
          statusId: res.data.data[i].status
        });
      }
      this.state.pagination.total = res.data.total;

      this.setState({
        data:data,
        pagination : this.state.pagination
      })

    })
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

  componentWillMount(){
    this.getPageDate();
  }

  //删除班级
  deleteClass(record){
    confirm({
      title: '你确定删除吗？',
      okText : '确定',
      cancelText : '取消',
      onOk:()=>{
        httpServer({
          url : URL.delete_class
        },{
          className : 'ClassServiceImpl',
          type : 4,
          classId : record.classId
        })
        .then((res)=>{
          this.getPageDate();//重新获取第一页
        })
      },
    });

  }

  //点击修改班级
  changeClass(record){
    this.setState({curSelectClass : record})
    const {form}=this.props;
    //重新设置修改模态框中三个选项的值
    form.setFieldsValue({'className': this.state.curSelectClass.className});
    form.setFieldsValue({'subject': this.state.curSelectClass.subjectId});
    form.setFieldsValue({'status': this.state.curSelectClass.statusId});
    this.setState({visibleChangeModal:true})
  }

  //取消修改
  changeCancel(){
    this.setState({visibleChangeModal:false})
  }

  //确认修改
  changeOk(){
    this.setState({visibleChangeModal:false})

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        httpServer({
          url : URL.change_class
        },{
          className : "ClassServiceImpl",
          type : 3,
          subjectId : values.subject,
          name : values.className,
          classId : this.state.curSelectClass.classId,
          status : values.status,
        })
      }
    });

  }

  //搜索类型选择
  handleChange(value) {
    this.searchKey = value;
  }

  //点击所有班级
  showAllClass(){
    this.turnStatus === "NORMAL";
    this.state.pagination.current = 1;//当前页置为第一页
    this.getPageDate();
  }

  //点击搜索
  searchClass(value) {
    if(value == "") {
      Modal.error({
        content: "搜索内容不能为空！",
        okText : '确定'
      });
      return;
    }
    this.turnStatus = "SEARCH";//把翻页状态置为搜索
    this.state.pagination.current = 1;//当前页置为第一页
    this.setState({pagination : this.state.pagination});
    this.searchContent = value;
    this.getSearchData();
  }

  //选择某一行
  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render(){
    const { getFieldDecorator } = this.props.form;

    const columns = [{
      title: '班级',
      dataIndex: 'className',
      key: 'className',
    }, {
      title: '科目',
      dataIndex: 'subjectName',
      key: 'subjectName',
    }, {
      title: '状态',
      dataIndex: 'statusName',
      key: 'statusName',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="danger" size="small" onClick={this.deleteClass.bind(this,record)}>删除</Button>
          <Divider type="vertical" />
          <Button size="small" onClick={this.changeClass.bind(this,record)}>修改</Button>
        </span>
      ),
    }];

    //行选择
    const rowSelection = {
      selectedRowKeys : this.state.selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
    };

    let localeObj = {
      emptyText: '暂无数据'
    }
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
        <BreadcrumbCustom pathList={['班级管理','查询班级']}></BreadcrumbCustom>
        <div className="class-manage-content">
          <Row>
            <Col span={24}>
              <Search
                className="f-r"
                placeholder="请输入关键字"
                onSearch={this.searchClass.bind(this)}
                enterButton
                style={{ width: 200 }}
              />
              <Select className="f-r m-r-20" defaultValue="1" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                <Option value="1">班级</Option>
                <Option value="2">科目</Option>
                <Option value="3">状态</Option>
              </Select>
              <Button type="primary" className="f-l" onClick={this.showAllClass.bind(this)}>所有班级</Button>
            </Col>
          </Row>
          <div className="m-t-20">
            <Table
              // rowSelection={rowSelection}
              columns={columns}
              dataSource={this.state.data}
              pagination={this.state.pagination}
              locale={localeObj}
              onChange={this.handleTableChange.bind(this)}
            />
          </div>
          <Modal
            title="修改班级"
            visible={this.state.visibleChangeModal}
            footer={null}
            onCancel={this.changeCancel.bind(this)}
            key={this.state.curSelectClass.key}
          >
            <Form onSubmit={this.changeOk.bind(this)}>
              <FormItem
                {...formItemLayout}
                label="班级名称"
                key = {this.state.curSelectClass.classId}
              >
                {getFieldDecorator('className',{
                  initialValue : this.state.curSelectClass.className
                  // setFieldsValue : this.state.curSelectClass.className
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
                  initialValue : this.state.curSelectClass.subjectId
                })(
                  <Select style={{ width: '100%' }} onChange={this.handleChange.bind(this)}>
                    {subjectArr}
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="状态"
                key = "status"
              >
                {getFieldDecorator('status',{
                  initialValue : this.state.curSelectClass.statusId
                })(
                  <Select style={{ width: '100%' }} onChange={this.handleChange.bind(this)}>
                    <Option value={1}>未毕业</Option>
                    <Option value={0}>已毕业</Option>
                  </Select>
                )}
              </FormItem>
              <Row>
                <Col span="24">
                  <Button type="primary" className="f-r" htmlType="submit">
                    确定
                  </Button>
                  <Button type="primary" className="f-r m-r-20" onClick={this.changeCancel.bind(this)}>
                    取消
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal>
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
)(Form.create()(QueryClass))
