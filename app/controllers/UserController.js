import axios from "axios";
import { setAuthStorage } from "../config/Storage";
import httpClient from "./HttpClient";
import ReactNativeBlobUtil from "react-native-blob-util";
import { API_URL_LOKAL as API_URL_LOKAL } from "@env";
import { Alert, Platform } from "react-native";
import { store, persist } from "../store";

class UserController {
  constructor() {
    // this.basePath = '/auth/login';
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
        url: "/auth/login",
        method: "POST",
        data: {
          email,
          // email: "m.hafid@ifca.co.id",
          password,
          device: Platform.OS,
          mac: "mac",
          token_firebase: token_firebase,
          apps_type: "S",
        },
      });
      // alert(result.Pesan);
      console.log("25 after try: ", JSON.stringify(result));
      //console.log("25 login response -->", result.data.data.userData);
      // ini ada isreset dalemnya, sementara dihilangin, buat biar ga nyangkut insert token firebase
      // if (result.Error) {
      //   console.log("34 first pesan", result.Pesan);
      //   return Promise.reject(result.Pesan);
      // } else {
      //   console.log("37 if succes", result);
      //   return result;
      // }

      if (result.data.success == false) {
        Platform.OS == "android"
          ? Alert.alert("Sorry! ", JSON.stringify(result.data.message))
          : alert(JSON.stringify(result.data.message)); //Alert.prompt("Sorry!", msgPesan);
      } else {
        //alert("55 success", result.message);
        return result.data;
        // const dummyData = {
        //   success: true,
        //   message: "success",
        //   data: {
        //     Token:
        //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVkZW50aWFscyI6eyJlbWFpbCI6Im0uaGFmaWRAaWZjYS5jby5pZCIsInBhc3N3b3JkIjoicGFzczEyMzQifX0.FqNcCroF5bpDPcjcStwGbYyV__kfbzg1DGJI4_yMX6s",
        //     refreshToken:
        //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVkZW50aWFscyI6eyJlbWFpbCI6Im0uaGFmaWRAaWZjYS5jby5pZCIsInBhc3N3b3JkIjoicGFzczEyMzQifX0.FqNcCroF5bpDPcjcStwGbYyV__kfbzg1DGJI4_yMX6s",
        //     userData: {
        //       rowID: "13",
        //       email: email,
        //       password: "4B455C53E01C17FDEDBB716DFF8A7B72",
        //       name: email,
        //       userID: email,
        //       Group_Cd: "RSD",
        //       gender: "Male",
        //       pict: "https://dev.ifca.co.id:4414/no-image.png",
        //       Handphone: "0857732872",
        //       Status: "Y",
        //       isResetLogin: "0",
        //       web_admin: "N",
        //       resident_apps: "Y",
        //       audit_user: "MGR",
        //       audit_date: "2025-02-11 15:32:08.000",
        //       engineer_apps: "Y",
        //     },
        //   },
        // };
        // return dummyData;
      }
    } catch (error) {
      error?.message == "Network Error" ? alert("Network Error") : null;

      console.log("25 if errorz: ", error);
      //Alert(error.response.data.message);
      !error.response.data?.message ? alert(error.message) : Platform.OS == "android"
        ? Alert.alert("Sorry! ", JSON.stringify(error.response.data.message))
        :  alert(JSON.stringify(error.response.data.message));
      //return Promise.reject(error);

      if (error.response) {
        // Request made and server responded with a status code
        // that falls out of the range of 2xx
        console.log("25 Error Status:", error.response.status); // 404
        console.log("25 Error Data:", error.response.data); // Response data if available
        console.log("25 Error Headers:", error.response.headers); // Response headers if available
      }
    }
  };

  resetPassword = async (conPass, newPass, email) => {
    try {
      const result = await httpClient.request({
        url: `${this.basePath}/auth/reset-pass`,

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

  logout = async (email) => {
    console.log("102 run res: ");
    const stateStore = store.getState();
    const accessToken = stateStore.user.accessToken;
    try {
      const result = await httpClient.request({
        url: API_URL_LOKAL + `/auth/logout`,
        method: "POST",
        data: {
          email: email,
          apps_type: "S",
          device: "ios",
          token: accessToken,
          // name: data.name,
          // hp: data.phone,
          //gender: data.gender,
          // device: "ios",
          // mac: "mac",
          // token_firebase: token_firebase,
          // apps_type: "S",
        },
      });
      console.log("102 res: ", result);
      console.log("logout");
      return "success";
    } catch (error) {
      console.log("102 error: ", error.response.data.message);
      return Promise.reject(error);
    }
  };

  // logout = () => null;

  saveProfile = async (data) => {
    console.log("save profile data controler", data);
    try {
      const result = await httpClient.request({
        url: API_URL_LOKAL + `/auth/change-profile`,
        method: "POST",
        data: {
          email: data.email,
          name: data.name,
          hp: data.phone,
          //gender: data.gender,
        },
      });
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  saveFotoProfil = async (data) => {
    console.log("data akan save foto profil", data);
    //console.log("isi images", data.image[0].uri);
    // let fileName = "profile.png";
    // let fileImg = ReactNativeBlobUtil.wrap(
    //   data.image[0].uri.replace("file://", "")
    // );
    // const b64 = fileImg.base64;
    const b64 = await ReactNativeBlobUtil.fs.readFile(data.uri, "base64");
    // console.log("fileimg", fileImg);
    // console.log('yeyeyelalala', b64);

    // const data_tes = [{email: data.email, dataPhoto: b64}];
    // console.log('daata_tes', data_tes);
    // ReactNativeBlobUtil.fetch(
    //   'POST',
    //   'http://apps.pakubuwono-residence.com/apiwebpbi/api/auth/change-photo',
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
        url: API_URL_LOKAL + `/auth/change-photo`,
        // url: `/auth/change-photo`,
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
