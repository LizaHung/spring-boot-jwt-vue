import { noAuthget, get, post, put, delhandle, patch} from "./axios";

export const apiAddEmp = (params, callback, errorCallback) => noAuthget('/api/empAuth/sign-in', callback, params, errorCallback )
export const apiGetBackFun = (callback) => get('/api/function', callback )
export const apiAdoption = {
    getAllPetsByStatus:  (adoPetNo,callback) => get(`/api/adoption/adopets/${adoPetNo}`, callback ),
    addAdopet:  (param, callback) => post('/api/adoption/adopets', callback, param ),
    updateAdopet:  (param, callback) => put('/api/adoption/adopets', callback, param ),
    deleteAdopet:  (adoPetNo, callback) => delhandle(`/api/adoption/adopets/${adoPetNo}`, callback ),
    updateAdoStatus:  (adoPetNo, param, callback) => patch(`/api/adoption/adopets/${adoPetNo}`, callback, param ),
}
