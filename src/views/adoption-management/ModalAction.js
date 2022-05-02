import { apiAdoption } from "@/axios/apiUrl.js";

const modalAction = {
  updateStatus(adoPetNo, param, callback) {
    apiAdoption.updateAdoStatus(adoPetNo, param, res => {
      callback(res);
    });
  },
  confirm(adoPetNo, callback) {
    apiAdoption.confirmApplication(adoPetNo, res => {
      callback(res);
    });
  },
  getAllPets(param,callback) {
    apiAdoption.getAllByStatus(param, res => {
      callback(res);
    });
  },
};

export default modalAction;
