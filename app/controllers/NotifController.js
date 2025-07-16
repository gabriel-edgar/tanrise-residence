import axios from "axios";
import { setAuthStorage } from "../config/Storage";
import httpClient from "./HttpClient";
import { baseURL as API_URL_LOKAL } from "@/controllers/HttpClient";

class NotifController {
  constructor() {
    // this.basePath = '/auth/login';
    // this.basePath = 'http://apps.pakubuwono-residence.com/apiwebpbi/api';
    this.basePath = API_URL_LOKAL;
  }

  notifikasi_nbadge = async (email, entity_cd, project_no) => {
    console.log("email for notif di controller", email);
    console.log("entity for notir", entity_cd);
    console.log("project no for notif", project_no);

    try {
      const result = await httpClient.request({
        // url: '/setting/notification',
        // url: `http://apps.pakubuwono-residence.com/apiwebpbi/api/setting/notification?email=${email}&entity_cd=${entity_cd}&project_no=${project_no}`,
        url:
          API_URL_LOKAL +
          `/setting/notification-badge?email=${email}&entity_cd=${entity_cd}&project_no=${project_no}`,
        // url: `http://apps.pakubuwono-residence.com/apiwebpbi/api/setting/notification?email=${email}&entity_cd=${entity_cd}&project_no=${project_no}`,
        method: "GET",
      });
      // alert(result.Pesan);
      console.log("vardums result notifikasi -->", result);
      // ini ada isreset dalemnya, sementara dihilangin, buat biar ga nyangkut insert token firebase
      if (result.Error) {
        return Promise.reject(result.Pesan);
      } else {
        return result;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export default new NotifController();
