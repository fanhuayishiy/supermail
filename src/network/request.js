import axios from "axios";

export function request(config){
    //  1、创建axios实例
    const instance = axios.create({
      baseURL:"http://152.136.185.210:7878/api/hy66",
      timeout:5000
    })
    //2、axios拦截器
  instance.interceptors.request.use(config=>{
    // console.log(config)
    return config;
  },error => {
    // console.log(error);
  })
  instance.interceptors.response.use(response=>{
    // console.log(response)
    return response.data
  },error=>{
    // console.log(error)
  })

    //3、调用返回这个返回的是Promise
    return instance(config)

}

