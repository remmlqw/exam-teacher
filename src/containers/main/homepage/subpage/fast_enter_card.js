import React from 'react'
import { Card,Icon } from 'antd';


export default class FastEnterCard extends React.Component {
  constructor(){
    super()
    this.state = {

    }
  }
  render(){
    return(
      <div>
        <Card>
          <div className="ta-c">
            <h1><Icon type={this.props.icon}></Icon></h1>
            <h1>{this.props.title}</h1>
          </div>
        </Card>
      </div>
    )
  }
}
