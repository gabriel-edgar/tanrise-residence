import axios from "axios";
import { API_URL } from "react-native-dotenv";
import { API_URL_LOKAL, API_URL_LIVE_WEBPBI, API_URL_LIVE_WEBIFCA } from "@env";

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

console.log("17 api url lokal", API_URL_LOKAL);
const client = axios.create({
  baseURL: API_URL_LOKAL,
  //baseURL: API_URL_LIVE_WEBPBI,
  //baseURL: API_URL_LIVE_WEBIFCA,
  //timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (response) => {
    return !response.data.Error
      ? response.data
      : Promise.reject(response.data.Pesan);
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

export default client;
