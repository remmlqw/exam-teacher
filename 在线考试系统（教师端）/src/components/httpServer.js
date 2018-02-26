import axios from 'axios'
import qs from 'qs'
import {Modal,message} from 'antd'

//添加一个请求拦截器
axios.interceptors.request.use(config => {
  //这里可以显示loading
  return config
}, error => {
  return Promise.reject(error)
})

//添加一个响应拦截器
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function successState(res) {
  //这里可以隐藏loading
  //统一判断后端返回的错误码
  if(res.data.respCode == "1"){
    if(res.data.respMsg) {
      message.success(res.data.respMsg);
    }
  }
  else {
    if(res.data.respMsg) {
      Modal.error({
        title: '出错了',
        content: res.data.respMsg,
        okText : '确定'
      });
    }
    else {
      Modal.error({
        title: '出错了',
        content: '服务器开小差了~请稍后再试',
        okText : '确定'
      });
    }

  }
}

function errorState(response) {
  //这里可以隐藏loading
  console.log(response)
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
      // 如果不需要除了data之外的数据，可以直接 return response.data
  }else{
    Modal.error({
      title: '提示',
      content: "网络异常，请稍后再试",
    });
  }

}

const httpServer = (opts, data) => {

  let Public = { //公共参数
  }

  let baseURL = "";

  if(!opts.method) {
    opts.method = "get";//默认提交方式
  }

  let httpDefaultOpts = {
    //http默认配置
    method: opts.method,
    baseURL,
    url: opts.url,
    timeout: 10000,
    params: Object.assign(Public, data),
    data: data,
    transformRequest: [function (data) {
		  let ret = ''
		  for (let it in data) {
        if(data[it] instanceof Array) {
          data[it].forEach((item)=>{
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(item) + '&'
          })
        }
        else {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
		  }
      console.log(ret);
		  return ret
		}],
    headers: opts.method == 'get'
      ? {
        'X-Requested-With': 'XMLHttpRequest',
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8"
      }
      : {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
  }

  if (opts.method == 'get') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
  }

  let promise = new Promise(function(resolve, reject) {
    axios(httpDefaultOpts).then((res) => {
      successState(res)
      resolve(res)
    }).catch((response) => {
      errorState(response)
      reject(response)
    })

  })
  return promise
}

export default httpServer
