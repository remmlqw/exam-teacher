import React from 'react'
import BreadcrumbCustom from '@components/BreadcrumbCustom'
import {Row,Col,Select,Input,Table, Icon, Divider} from 'antd'
const Option = Select.Option;
const Search = Input.Search;

export default class ScoreSearch extends React.Component {
  constructor(){
    super()
  }

  //搜索类型选择
  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render(){
    const columns = [{
      title: '班级',
      dataIndex: 'class',
      key: 'class',
    }, {
      title: '科目',
      dataIndex: 'subject',
      key: 'subject',
    }, {
      title: '考试时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '阅卷老师',
      dataIndex: 'teacher',
      key: 'teacher',
    }];


    const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    class: 'web1707',
    subject : 'web前端',
    time: '2018-1-22',
    teacher : '谢智'
  });
}

    return(
      <div>
        <BreadcrumbCustom pathList={['试卷管理','试卷查询']}></BreadcrumbCustom>
        <div className="score-search-content">
          <Row>
            <Col span={24}>
              <Search
                className="f-r"
                placeholder="请输入关键字"
                onSearch={value => console.log(value)}
                enterButton
                style={{ width: 200 }}
              />
              <Select className="f-r m-r-20" defaultValue="name" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                <Option value="name">班级</Option>
                <Option value="id">科目</Option>
                <Option value="class">考试时间</Option>
                <Option value="class">阅卷老师</Option>
              </Select>
            </Col>
          </Row>
          <div className="m-t-20">
            <Table columns={columns} dataSource={data} />
          </div>

        </div>
      </div>
    )
  }
}
