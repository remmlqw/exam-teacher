import axios from 'axios'
import * as URL from '@components/interfaceURL.js'

//用户登录
export const axiosLogin = function(params,success,error){
  axios.get(URL.login,{
    params:{
      className : params.className,
      loginType : params.loginType,
      managerId : params.managerId,
      password : params.password
    }
  })
  .then((res)=>{
    success(res.data);
  })
  .catch(function (err) {
      error(err);
  });
}


// export const axiosLogin = function(params,success,error){
//
//   // 发送请求前处理request的数据
//   axios.defaults.transformRequest = [function (data) {
//     let newData = ''
//     for (let k in data) {
//     newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
//     }
//     return newData
//   }]
//
//   axios.post('/sxt_exam/Servlet',{
//       className : params.className,
//       loginType : params.loginType,
//       managerId : params.managerId,
//       password : params.password
//   },{
//     headers : {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   })
//   .then((res)=>{
//     success(res.data);
//   })
//   .catch(function (err) {
//       error(err);
//   });
// }
