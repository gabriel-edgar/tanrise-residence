import axios from "axios";
import { setAuthStorage } from "../config/Storage";
import httpClient from "./HttpClient";
import ReactNativeBlobUtil from "react-native-blob-util";
import { API_URL_LOKAL as API_URL_LOKAL } from "@env";

class UserController {
  constructor() {
    // this.basePath = '/login_mobile';
    this.basePath = API_URL_LOKAL;
  }

  login = async (email, password, token_firebase) => {
    //var anyString = '';
    //var functionToText = anyString + httpClient;
    console.log(
      "16 api request: \n email:",
      email,
      "\n password:",
      password,
      "\n token_firebase:",
      token_firebase
    );
    try {
      console.log("25 try controller login begin");
      console.log("API: " + API_URL_LOKAL);
      const result = await httpClient.request({
        url: "/login_mobile",
        method: "POST",
        data: {
          email,
          password,
          token: "",
          device: "ios",
          mac: "mac",
          token_firebase: token_firebase,
        },
      });
      // alert(result.Pesan);
      console.log("39 after try");
      console.log("31 login response -->", result);
      // ini ada isreset dalemnya, sementara dihilangin, buat biar ga nyangkut insert token firebase
      if (result.Error) {
        console.log("34 first pesan", result.Pesan);
        return Promise.reject(result.Pesan);
      } else {
        console.log("37 if succes", result);
        return result;
      }
    } catch (error) {
      console.log("41 if errorz", error);
      return Promise.reject(error);
    }
  };

  resetPassword = async (conPass, newPass, email) => {
    try {
      const result = await httpClient.request({
        url: `${this.basePath}/Resetpass`,

        method: "POST",
        data: {
          conpass: conPass,
          newpass: newPass,
          email: email,
        },
      });
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  logout = () => {
    try {
      //  const result = await httpClient.request({
      //    url: '/login_mobile',
      //    method: 'POST',
      //    data: {
      //      email,
      //      password,
      //      token: '',
      //      device: 'ios',
      //      mac: 'mac',
      //      token_firebase,
      //    },
      //  });
      //  // alert(result.Pesan);

      //  if (result.Error) {
      //    return Promise.reject(result.Pesan);
      //  } else {
      //    return result;
      //  }
      console.log("logout");
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // logout = () => null;

  saveProfile = async (data) => {
    console.log("save profile daata controler", data);
    try {
      const result = await httpClient.request({
        url: API_URL_LOKAL + `/changeprofile_mobile`,

        method: "POST",
        data: {
          email: data.emails,
          name: data.name,
          hp: data.phone,
          gender: data.genders,
        },
      });
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  saveFotoProfil = async (data) => {
    console.log("data akan save foto profil", data);
    console.log("isi images", data.image[0].uri);
    let fileName = "profile.png";
    let fileImg = ReactNativeBlobUtil.wrap(
      data.image[0].uri.replace("file://", "")
    );
    // const b64 = fileImg.base64;
    const b64 = await ReactNativeBlobUtil.fs.readFile(
      data.image[0].uri,
      "base64"
    );
    console.log("fileimg", fileImg);
    // console.log('yeyeyelalala', b64);

    // const data_tes = [{email: data.email, dataPhoto: b64}];
    // console.log('daata_tes', data_tes);
    // ReactNativeBlobUtil.fetch(
    //   'POST',
    //   'http://apps.pakubuwono-residence.com/apiwebpbi/api/changephoto_mobile',
    //   {
    //     'Content-Type': 'application/octet-stream',
    //     // Token: this.state.token,
    //   },
    //   [{email: data.email, dataPhoto: b64}],
    // )
    //   .then(resp => {
    //     let res = JSON.stringify(resp.data);
    //     console.log('res', resp);
    //   })
    //   .catch(error => {
    //     console.log('error api save foto profil', error);
    //     // alert('error get');
    //   });
    // console.log('save foto profil data controler', data);
    try {
      const result = await httpClient.request({
        url: API_URL_LOKAL + `/changephoto_mobile`,
        // url: `/changephoto_mobile`,
        method: "POST",
        data: {
          dataPhoto: "data:image/png;base64," + b64,
          email: data.email,
        },
      });

      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export default new UserController();
