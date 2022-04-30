import { apiAdoption } from "@/axios/apiUrl.js";

const modalAction = {
  updateStatus(adoPetNo, param, callback) {
    apiAdoption.updateAdoStatus(adoPetNo, param, res => {
      callback(res);
    });
  },
  getAllPets(param,callback) {
    apiAdoption.getAllPetsByStatus(param, res => {
      callback(res);
    });
  },
};

export default modalAction;
