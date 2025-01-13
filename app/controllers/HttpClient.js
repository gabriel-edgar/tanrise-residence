import axios from "axios";
import { API_URL } from "react-native-dotenv";
import { API_URL_LOKAL, API_URL_LIVE_WEBPBI, API_URL_LIVE_WEBIFCA } from "@env";

//import { useSelector, useDispatch } from "react-redux";
import { refreshTokenAction } from "../actions/UserActions";

//import { store, persist } from "../reducers";
import { store, persist } from "../store";
//import { refreshToken, logout } from "./actions/authActions";

/*
  Base client config for your application.
  Here you can define your base url, headers,
  timeouts and middleware used for each request.
*/

/*opsi
API_URL_LOKAL
API_URL_LIVE_WEBPBI
API_URL_LIVE_WEBIFCA
*/

// const myFunction = async () => {
//   //const stateRedux = useSelector((state) => state.user);
//   const stateStore = store.getState();
//   const refreshToken = stateStore.user.refreshToken;
//   console.log("2647 RT:", stateStore.user.refreshToken);
//   //console.log("2112345 stateRedux: ", stateRedux);

//   // Unauthorized
//   //const refreshToken = stateRedux.refreshToken;

//   if (refreshToken) {
//     try {
//       // Make a request to get a new access token
//       const { data } = await axios.post(API_URL_LOKAL + "/auth/refresh-token", {
//         token: refreshToken,
//       });

//       // Save the new tokens
//       //localStorage.setItem("accessToken", data.accessToken);
//       //localStorage.setItem("refreshToken", data.refreshToken);

//       // const dispatch = useDispatch();
//       // dispatch(refreshTokenAction(data.Token));
//       await store.dispatch(refreshTokenAction(data.Token));
//       console.log("2647 data.Token: ", data.Token);

//       // Retry the original request with the new token
//       const newConfig = {
//         ...config,
//         headers: {
//           ...config.headers,
//           Authorization: `Bearer ${data.Token}`,
//         },
//       };
//       return client(newConfig);
//     } catch (refreshError) {
//       // Handle token refresh error
//       console.error("2647 Refresh token failed: ", refreshError);
//       return Promise.reject(refreshError);
//     }
//   }
// };

console.log("17 api url lokal", API_URL_LOKAL);
// const stateStore = store.getState();
// const token = stateStore.user.accessToken;
//console.log("17 token: ", token);
const client = axios.create({
  baseURL: API_URL_LOKAL,
  //baseURL: API_URL_LIVE_WEBPBI,
  //baseURL: API_URL_LIVE_WEBIFCA,
  //timeout: 10000,
  // headers: {
  //   Authorization: "Bearer " + token,
  //   // Accept: "application/json",
  //   // "Content-Type": "application/json",
  // },
});

// client.interceptors.response.use(
//   (response) => {
//     return !response.data.Error
//       ? response.data
//       : Promise.reject(response.data.Pesan);
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// const client = axios.create({
//   baseURL: API_URL,
//   timeout: 100000,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json"
//   },
// });

// // Custom middleware for requests (this one just logs the error).
// client.interceptors.request.use(config => config, (error) => {
//   console.log('Failed to make request with error:');
//   console.log(error);
//   return Promise.reject(error);
// });

// // Custom middleware for responses (this one just logs the error).
// client.interceptors.response.use(response => response, (error) => {
//   console.log('Request got response with error:');
//   console.log(error);
//   return Promise.reject(error);
// });

//refreshToken 12 Aug 24

// Request interceptor to add the token to headers
client.interceptors.request.use(
  (config) => {
    //const token = localStorage.getItem("accessToken"); // Retrieve token from storage

    const stateStore = store.getState();
    const token = stateStore.user.accessToken;
    console.log("119 token: ", token, ", url: ", config.url);

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  }
  // (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
client.interceptors.response.use(
  (response) => response,

  // async (error) => {
  //   console.log("131 interceptors: ", error.response.status);
  //   return Promise.reject(error);
  // }

  async (error) => {
    //alert(error);
    //console.log("134 client.interceptors.response.use");
    console.log("148 error: ", error);
    if (error.message === "Network Error") {
      //alert("Network Error");
      return Promise.reject(error);
    }

    const {
      response: { config },
    } = error;

    // console.log(
    //   "131 interceptors: ",
    //   error.response.status,
    //   ", token: ",
    //   config.headers.Authorization
    // );

    if (
      error.response.data.message ==
      "Key material must be a string, resource, or OpenSSLAsymmetricKey"
    ) {
      console.log("Key material error detected");
      return client(config);
    }

    //if (error.response.status === 401)
    const refreshTokenFunc = async () => {
      //alert("131 interceptors: ", error.response.status);
      console.log(
        "131 interceptors: ",
        JSON.stringify(error.response)
        // ", config: ",
        // JSON.stringify(config)
        // ", accessToken: ",
        // config.headers.Authorization
      );
      //console.log("134 client.interceptors.response.use222");
      //myFunction();

      const stateStore = store.getState();
      const refreshToken = stateStore.user.refreshToken;
      //console.log("131 RT:", stateStore.user.refreshToken);

      // return;
      if (refreshToken) {
        try {
          // Make a request to get a new access token
          const { data } = await axios.post(
            API_URL_LOKAL + "/auth/refresh-token",
            {
              token: refreshToken,
            }
          );

          // Save the new tokens
          //localStorage.setItem("accessToken", data.accessToken);
          //localStorage.setItem("refreshToken", data.refreshToken);

          // const dispatch = useDispatch();
          // dispatch(refreshTokenAction(data.Token));
          console.log("131 data.Token: ", data.data.Token);
          await store.dispatch(refreshTokenAction(data.data.Token));

          // Retry the original request with the new token
          const newConfig = {
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${data.data.Token}`,
            },
          };
          return client(newConfig);
        } catch (refreshError) {
          // Handle token refresh error
          console.error(
            "131 Refresh token failed: ",
            refreshError,
            ", config: ",
            config
          );
          return Promise.reject(refreshError);
        }
      }

      // Redirect to login if refresh token is not available
      // window.location.href = '/login';
    };

    if (error.response.data.message == "Token is Invalid") {
      console.log("Token is Invalid error detected");
      refreshTokenFunc();
    }

    return Promise.reject(error);
    //return;
  }
);

export default client;
