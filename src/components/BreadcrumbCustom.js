import React from 'react';
import { Breadcrumb } from 'antd';

import { Link } from 'react-router-dom';

export default class BreadcrumbCustom extends React.Component {
  constructor(){
    super();
  }
  render(){
    let lis = this.props.pathList.map(function(item,index){
      return(
        <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
      );
    });

    return(
      <Breadcrumb>
        {lis}
      </Breadcrumb>
    )
  }
}
