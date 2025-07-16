import axios from "axios";
// import { API_URL } from "react-native-dotenv";
import { API_URL_LOKAL, API_URL_LIVE, API_URL_TRAIN } from "@env";

import { refreshTokenAction } from "../actions/UserActions";

import { store, persist } from "../store";

// const baseURL = API_URL_LOKAL;
// const baseURL = API_URL_TRAIN;
const baseURL = API_URL_LIVE;
console.log("baseURL: ", baseURL);

const client = axios.create({
  baseURL: baseURL,
  //timeout: 10000,
  // headers: {
  //   Authorization: "Bearer " + token,
  //   // Accept: "application/json",
  //   // "Content-Type": "application/json",
  // },
});
export { baseURL };

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

  async (error) => {
    if (error.message === "Network Error") {
      //alert("Network Error");
      return Promise.reject(error);
    }

    const {
      response: { config },
    } = error;

    if (
      error.response.data.message ==
      "Key material must be a string, resource, or OpenSSLAsymmetricKey"
    ) {
      console.log("Key material error detected");
      return client(config);
    }

    //if (error.response.status === 401)
    const refreshTokenFunc = async () => {
      const stateStore = store.getState();
      const refreshToken = stateStore.user.refreshToken;

      // return;
      if (refreshToken) {
        try {
          // Make a request to get a new access token
          const { data } = await axios.post(baseURL + "/auth/refresh-token", {
            token: refreshToken,
          });

          // Save the new tokens
          //localStorage.setItem("accessToken", data.accessToken);
          //localStorage.setItem("refreshToken", data.refreshToken);

          // const dispatch = useDispatch();
          // dispatch(refreshTokenAction(data.Token));
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
  }
);

export default client;
