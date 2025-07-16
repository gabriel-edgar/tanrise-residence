import axios from "axios";
import { setAuthStorage } from "../config/Storage";
import httpClient from "./HttpClient";
import { baseURL as API_URL_LOKAL } from "@/controllers/HttpClient";
import { store, persist } from "../store";

class ProjectController {
  constructor() {
    // this.basePath = '/auth/login';
    this.basePath = API_URL_LOKAL;
  }

  // data_project2 = async (email) => {
  //   const stateStore = store.getState();
  //   const token = stateStore.user.accessToken;
  //   console.log("15c_1 token: " + token);
  //   try {
  //     console.log("15c start try " + token);
  //     const result = await axios({
  //       url: API_URL_LOKAL + "/home/common-project/",
  //       method: "GET",
  //       params: { email: email },
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log("15c res: ", result);
  //     // if (!result.data.success) {
  //     //   return Promise.reject(result.data.message);
  //     // } else {
  //     return result.data.data;
  //     // }
  //   } catch (error) {
  //     console.log("15c error: ", error.response.data.message);
  //     alert(error.response.data.message);
  //     return Promise.reject(error);
  //   }
  // };

  data_unit = async (entity_cd, project_no, email) => {
    console.log("32 run data_unit");
    console.log("32 ", entity_cd, project_no, email);
    try {
      const result = await httpClient.request({
        url: "/home/common-unit",
        method: "GET",
        params: { entity_cd: entity_cd, project_no: project_no, email: email },
      });
      console.log("32 res: ", result.data);
      // if (!result.data.success) {
      //   return Promise.reject(result.data.message);
      // } else {
      return result.data.data;
      // }
    } catch (error) {
      console.log("32 error: ", error);
      Alert(error.response.data.message);
      return Promise.reject(error);
    }
  };
}

export default new ProjectController();
