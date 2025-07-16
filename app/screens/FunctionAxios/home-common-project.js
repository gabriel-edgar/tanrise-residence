// import { homeCommonProject } from "../FunctionAxios/home-common-project";
// ../FunctionAxios/home-common-project

//

import { baseURL as API_URL_LOKAL } from "@/controllers/HttpClient";
import axios from "axios";
import httpClient from "../../controllers/HttpClient";

const homeCommonProject = async (
  token,
  params,
  setDataDD,
  setArrDataTowerUser = () => {}
) => {
  // const config = {
  //   params: params,
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  // await axios
  //   .get(API_URL_LOKAL + `/home/common-project`, config)
  await httpClient
    .request({
      url: "/home/common-project",
      method: "GET",
      params: params,
    })
    .then((res) => {
      console.log("125 res: ", res.data.data);

      const arrDataTower = res.data.data;
      console.log("125 res: ", arrDataTower);

      const arrayDropDown = arrDataTower.map((item, index) => {
        return { label: item.descs, value: index };
      });

      console.log("125 arrayDropDown: ", arrayDropDown);
      setDataDD(arrayDropDown);

      setArrDataTowerUser(arrDataTower);

      //setSpinner(false);
      //return "finish";
    })
    .catch((error) => {
      console.log("125 FAxios home common error: ", error);
      //alert("125 error get: ", error);
      //return "error";
    });
};

export { homeCommonProject };

//
// ../FunctionAxios/home-common-project
/*

import { store, persist } from "../../store";
import { homeCommonProject } from "../FunctionAxios/home-common-project";

  const [arrDataProject, setArrDataProject] = useState([]);
  const [dataDD, setDataDD] = useState([]);

  const stateStore = store.getState();
  const token = stateStore.user.accessToken;

    const data = {
      email: stateStore.user.user.userData.email,
    };

  await homeCommonProject(token, data, setDataDD, setArrDataProject);

*/
