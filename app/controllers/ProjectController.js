import axios from 'axios';
import {setAuthStorage} from '../config/Storage';
import httpClient from './HttpClient';
import {API_URL_LOKAL} from '@env';

class ProjectController {
  constructor() {
    // this.basePath = '/login_mobile';
    this.basePath = API_URL_LOKAL;
  }

  data_project = async email => {
    console.log('email for project di controller', email);
    const data_app = 'O';

    try {
      const result = await httpClient.request({
        // url: '/notification',

        url: API_URL_LOKAL + `/getData/mysql/${email.emails}/${data_app}`,

        method: 'GET',
      });
      // alert(result.Pesan);
      console.log('vardums result project -->', result);
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

export default new ProjectController();
