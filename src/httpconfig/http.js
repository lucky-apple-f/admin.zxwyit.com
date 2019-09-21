import axios from "axios"
import url from "./api"
import router from '../router'

axios.defaults.baseURL = url;
axios.interceptors.request.use(function(config){
    config.headers['Authorization'] = sessionStorage.getItem("token")
    return config
},function(error){
    return Promise.reject(error);
})

axios.interceptors.response.use(function(response){
    return response;
},function(error){
    var url = error.config.url.toLocaleLowerCase();
    if(error.response.status === 401 && !url.endsWith("oauth/authenticate")){
        router.replace({'name':'login',query:{returnUrl:router.fullPath}})
    }
    return Promise.reject(error)
})

export default axios;