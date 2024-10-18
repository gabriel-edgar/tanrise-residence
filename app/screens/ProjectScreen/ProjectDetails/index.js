import { Text, Header, Icon, Button } from "@components";
// import data_dummy from '../Home/data_dummy.json';

//import { projectAsthanaDetail } from "../dummy.js";

import {
  View,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
  useWindowDimensions,
  Linking,
  RefreshControl,
  Platform,
} from "react-native";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { BaseStyle, Fonts, colors, useTheme } from "@config";
// import {
//   colors,
//   BaseStyle,
//   useTheme,
//   Typography,
//   FontWeight,
// } from "@config";
import { useTranslation } from "react-i18next";
import ButtonMenuHome from "../components/ButtonMenu/ButtonMenuHome";
import YoutubePlayer from "react-native-youtube-iframe";
import React, { useState, useCallback, useRef, useEffect } from "react";

import IframeRenderer, { iframeModel } from "@native-html/iframe-plugin";
//import RenderHTML from 'react-native-render-html';
//import {WebView} from 'react-native-webview';

import Features from "./Modals/Features";
import Gallery from "./Modals/Gallery";

import { data_gallery } from "./data_gallery.json";
import { data_floorplan } from "./data_floorplan.json";
import Floorplan from "./Modals/Floorplan";
import Surrounding from "./Modals/Surrounding";
import axios from "axios";
//import { API_URL } from "@env";
import { useSelector, useDispatch, connect } from "react-redux";
import getUser from "../../../selectors/UserSelectors";
//import MapView from 'react-native-maps';
//import {Marker} from 'react-native-maps';
import RenderHtml, { defaultSystemFonts } from "react-native-render-html";
import CustomAlert2 from "../components/CustomAlert2";
import { API_URL_LOKAL } from "@env";
//import { downloadFile } from "./downloadFile";
import { ActivityIndicator } from "react-native-paper";
import httpClient from "../../../controllers/HttpClient";

const ProjectDetails = (props) => {
  const { colors } = useTheme();
  //console.log("61 Platform.OS: ", JSON.stringify(Platform));
  //console.log("61 colors: ", colors);
  const { t } = useTranslation();
  const { navigation } = props;
  const [playing, setPlaying] = useState(false);

  const paramsDetail = props.route.params;
  const entity_cd = paramsDetail.entity_cd;
  const project_no = paramsDetail.project_no;
  console.log("paramsdetail projek detail", paramsDetail);
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState(false);
  const [visibleGallery, setVisibleGallery] = useState(false);
  const [visibleFloorplan, setVisibleFloorplan] = useState(false);
  const [visibleSurrounding, setVisibleSurrounding] = useState(false);
  //const source_video = "https://www.youtube.com/watch?v=R8JLo2EB3Wk&t=8s";
  // const gallery = data_gallery;
  const [gallery, setGallery] = useState(data_gallery);
  const [floorplan, setFloorplan] = useState(data_floorplan);
  const user = useSelector((state) => getUser(state));

  const stateRedux = useSelector((state) => state);
  console.log("74 stateRedux: ", stateRedux);

  const [dataProjectDetail, setDataProjectDetail] = useState([]);
  const [galleryProject, setGalleryProject] = useState([]);
  const [overviewProject, setOverviewProject] = useState([]);
  const [featureProject, setFeatureProject] = useState([]);
  const [planProject, setPlanProject] = useState([]);
  const [surroundingProject, setSurroundingProject] = useState([]);
  const [downloadProject, setDownloadProject] = useState([]);
  const [projectAddress, setProjectAddress] = useState([]);
  const { width } = useWindowDimensions().width;
  // const {widthRender} = useWindowDimensions();
  const { width: contentWidth } = useWindowDimensions();
  const systemFonts = [
    ...defaultSystemFonts,

    "Arial Black",
    "Comic-Sans MS",
    "Courier New",
    "Lato-Bold",
    "Lato-Regular",
    "Lato-Black",
    "Lato-Italic",
  ];

  const [itemsOverview, setItemsOverview] = useState([]);
  const [webViewKey, setwebViewKey] = useState(1);
  const [regionChange, setRegion] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isDAlertVisible, setDAlertVisible] = useState(false);
  const [loadData, setLoadData] = useState(true);

  // const onStateChange = useCallback((state) => {
  //   if (state === "ended") {
  //     setPlaying(false);
  //     Alert.alert("Video has finished playing");
  //   }
  // }, []);

  // const togglePlaying = useCallback(() => {
  //   setPlaying((prev) => !prev);
  // }, []);

  // const renderers = {
  //   iframe: IframeRenderer,
  // };

  // const customHTMLElementModels = {
  //   iframe: iframeModel,
  // };

  const clik = () => {
    console.log("cek vis", visibleFeatures);
    setVisibleFeatures(true);
  };

  useEffect(() => {
    setLoadData(true);
    //alert("153 test");
    //setLoadData(true);
    // const pasing = projectAsthanaDetail;
    // console.log("122 data di project", pasing);
    // setDataProjectDetail(pasing);
    // setGalleryProject(pasing.gallery);
    // setOverviewProject(pasing.overview);
    // setFeatureProject(pasing.feature);
    // setPlanProject(pasing.plan);
    // setSurroundingProject(pasing.surrounding);
    // setDownloadProject(pasing.download);
    // setProjectAddress(pasing.project);

    loadDataProject();
  }, []);

  const loadDataProject = async () => {
    await getProjectDetails();
  };

  const getProjectDetails = async () => {
    console.log("149 user: ", user);
    try {
      // const config = {
      //   method: "get",
      //   // url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/groupMenu?approval_user=MGR',
      //   url: API_URL_LOKAL + "/modules/project/show-details",
      //   headers: {
      //     "content-type": "application/json",
      //     // 'X-Requested-With': 'XMLHttpRequest',
      //     Authorization: `Bearer ${stateRedux.user.accessToken}`,
      //   },
      //   params: { entity_cd: entity_cd, project_no: project_no },
      // };
      // console.log("formdaata get project", config);

      //await axios(config)
      await httpClient
        .request({
          url: "/modules/project/show-details",
          method: "GET",
          params: { entity_cd: entity_cd, project_no: project_no },
        })
        .then((result) => {
          const pasing = result.data.data;
          console.log("137 data di project", pasing);
          setDataProjectDetail(pasing);
          setGalleryProject(pasing.gallery);
          setOverviewProject(pasing.overview);
          setFeatureProject(pasing.feature);
          setPlanProject(pasing.plan);
          setSurroundingProject(pasing.surrounding);
          setDownloadProject(pasing.download);
          setProjectAddress(pasing.project);
          setLoadData(false);
        })
        .catch((error) => {
          console.log("Error getProject" + error.response.data.message);
          alert("Error getProject" + error.response.data.message);
          setLoadData(false);
        });
      // .finally(); //setLoadData(false)
      //setLoadData(false);
    } catch (error) {
      console.log("ini konsol eror", error);
      //setLoadData(false);
    }
  };

  const showModalOverview = (item) => {
    setModalVisible(true);
    setItemsOverview(item);
  };

  // const onRegionChange = (region) => {
  //   setRegion(region);
  // };

  // const htmlContent = `
  //   <html>
  //       <body>
  //           <div class="section">
  //               <div class="wrapper">
  //                   <h1>The TITLE</h1>
  //                   <div class="post-wrapper">
  //                       <div class="post-rich-text w-richtext">
  //                           <p>Check out this video to see it in action.</p>
  //                           <iframe allowfullscreen="true" frameborder="0" scrolling="no" src="https://www.youtube.com/embed/OfLV5h-1rRI?si=JJiTuK-IPjJWeG9o" width="300" height="200"></iframe>
  //                           <p>And there’s even more to come... </p>
  //                       </div>
  //                   </div>
  //               </div>
  //           </div>
  //       </body>
  //   </html>`;

  const onRefresh = useCallback(() => {
    // setRefreshing(true);
    // //getProjectDetails();
    // loadDataProject();
    // setTimeout(() => {
    //   setRefreshing(false);
    // }); //1000);
  });

  // const handleLinking = () => {
  //   downloadProject[0]?.url ? Linking.openURL(downloadProject[0]?.url) : null;
  // };

  // return (
  //   <SafeAreaView
  //     edges={["right", "top", "left"]}
  //     style={[
  //       BaseStyle.safeAreaView,
  //       { backgroundColor: colors.whiteColor },
  //     ]}
  //   >
  //     <Header
  //       //   title={t('project_details')}
  //       title={t("")}
  //       renderLeft={() => {
  //         return (
  //           <Icon
  //             // name="angle-left"
  //             name="arrow-left"
  //             size={18}
  //             color={colors.corn70}
  //             enableRTL={true}
  //           />
  //         );
  //       }}
  //       style={{ height: 80, borderRadius: 40 }}
  //       onPressLeft={() => {
  //         navigation.goBack();
  //       }}
  //     />
  //     <Text
  //       style={{
  //         fontFamily: "DMSerifDisplay",
  //         color: colors.corn90,
  //         marginVertical: 10,
  //         fontSize: 18,
  //         // marginHorizontal: 3,
  //       }}
  //     >
  //       {paramsDetail.descs}
  //     </Text>
  //     <Icon name="arrow-left" size={18} color={colors.corn90} />
  //     <ButtonMenuHome
  //       onPress={() => clik()}
  //       title={"Features"}
  //       nameicon={"gem"}
  //     ></ButtonMenuHome>
  //     <Features
  //       onRequestClose={() => {
  //         setVisibleFeatures(false);
  //       }}
  //       visible={visibleFeatures}
  //       icon={
  //         <TouchableOpacity onPress={() => setVisibleFeatures(false)}>
  //           <Icon name="arrow-left" size={18} color={colors.corn90} />
  //         </TouchableOpacity>
  //       }
  //       datas={featureProject}
  //     ></Features>
  //     <Gallery
  //       onRequestClose={() => {
  //         setVisibleGallery(false);
  //       }}
  //       visible={visibleGallery}
  //       icon={
  //         <TouchableOpacity onPress={() => setVisibleGallery(false)}>
  //           <Icon name="arrow-left" size={18} color={colors.corn90} />
  //         </TouchableOpacity>
  //       }
  //       datas={galleryProject}
  //     ></Gallery>
  //   </SafeAreaView>
  // );

  // return (
  //   <YoutubePlayer
  //     //key={index}
  //     height={500}
  //     //play={playing}
  //     //videoId={text}
  //     //videoId="OfLV5h-1rRI"
  //     //videoId="y7qXPaoFsac"
  //     //videoId="mLQ5_q7WFFI&t=14s"
  //     videoId="mLQ5_q7WFFI"
  //     //sonChangeState={onStateChange}
  //     //style={{ borderRadius: 40 }}
  //     //useLocalHTML={false}
  //   />
  // );

  //console.log("319 load data: ", loadData);

  // return (
  //   <>
  //     <View style={{ borderWidth: 10, backgroundColor: "blue" }}>
  //       <Text>abc</Text>
  //     </View>
  //   </>
  // );

  return (
    <SafeAreaView
      edges={["right", "top", "left"]}
      style={[BaseStyle.safeAreaView, { backgroundColor: colors.background }]}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ImageBackground
          source={{ uri: paramsDetail.picture_url }}
          // source={require('@assets/images/home/slider-project/sudirmansuite.jpeg')}
          // width={100}
          // height={100}
          imageStyle={{
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            //   borderRadius: 20,
          }}
          style={{
            resizeMode: "contain",
            width: Dimensions.get("screen").width,

            height: 350,
          }}
        >
          <Header
            //   title={t('project_details')}
            title={t("")}
            renderLeft={() => {
              return (
                <Icon
                  // name="angle-left"
                  name="arrow-left"
                  size={18}
                  //color={colors.corn70}
                  color={colors.primary}
                  enableRTL={true}
                />
              );
            }}
            style={{ height: 80, borderRadius: 40 }}
            onPressLeft={() => {
              navigation.goBack();
            }}
          />
          <View
            style={{
              position: "absolute",
              backgroundColor: "white",
              // top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              // height: 80,

              marginHorizontal: 25,
              marginVertical: 20,
              borderRadius: 20,
              opacity: 0.8,
              // justifyContent: 'center',
              // alignItems: 'center',
            }}
          >
            <View style={{ marginVertical: 10, marginHorizontal: 25 }}>
              <Text
                style={{
                  fontFamily: "DMSerifDisplay",
                  color: "black", //colors.corn90,
                  marginVertical: 10,
                  fontSize: 18,
                  // marginHorizontal: 3,
                  fontWeight: "bold",
                }}
              >
                {/* {item.project_name} */}
                {/* Project name */}
                {/* {paramsDetail.project_descs} */}
                {paramsDetail.descs}
              </Text>

              <Text
                style={{
                  fontFamily: "DMSerifDisplay",
                  color: "black",
                  marginVertical: 5,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {/* {item.location} */}
                {/* lokasi */}
                {paramsDetail.caption_address}
              </Text>
            </View>
          </View>
        </ImageBackground>
        {loadData === true ? (
          <ActivityIndicator style={{ marginTop: 30 }} />
        ) : (
          <>
            {/* brosur ----  */}
            <TouchableOpacity
              onPress={() => {
                //alert("435 test");
                navigation.navigate("DownloadBrochure", {
                  downloadProject,
                  descs: paramsDetail.descs,
                });
                //setDAlertVisible(true)}
              }}
            >
              <View
                style={{
                  marginTop: "10%",
                  backgroundColor: colors.primary,
                  borderRadius: 15,

                  height: 50,
                  marginBottom: 10,
                  marginHorizontal: 20,
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "DMSerifDisplay",
                    fontSize: 14,
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                >
                  Download Brochure
                </Text>
              </View>
            </TouchableOpacity>
            {/* -- overview  */}
            <View style={{ marginHorizontal: 20, marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "DMSerifDisplay",
                  color: colors.text,
                  marginVertical: 5,
                  fontWeight: "bold",
                }}
              >
                Overview
              </Text>
              {overviewProject.length != 0 ? (
                overviewProject.map((item, index) => (
                  // <View>

                  // <RenderHTML
                  //   contentWidth={width}
                  //   source={{
                  //     html: item.overview_info,
                  //   }}
                  // />

                  // </View>

                  <View key={index} style={{ flex: 1 }}>
                    <RenderHtml
                      key={index}
                      contentWidth={contentWidth}
                      source={{
                        html: `
                                        <div style="text-align: justify;">
                                        ${item.overview_info}
                                        </div>
                                        `,
                      }}
                      systemFonts={systemFonts}
                      defaultTextProps={{ allowFontScaling: false }}
                      enableExperimentalMarginCollapsing={true}
                      ignoredStyles={["fontSize"]}
                      tagsStyles={{
                        em: {
                          color: colors.text,
                          // fontSize: 12,
                          fontFamily: "DMSerifDisplay",
                          // fontFamily: Fonts.type.ComicSansMS,
                          // textAlign: 'justify',
                          fontStyle: "normal",
                        },
                        strong: {
                          color: colors.text,
                          // fontSize: 12,
                          // fontFamily: "DMSerifDisplay",
                          fontWeight: "600",
                          ...(Platform.OS === "android" && {
                            fontWeight: "600",
                            fontFamily: "DMSerifDisplay",
                          }),
                        },
                        b: {
                          color: colors.text,
                          // fontSize: 12,
                          // fontFamily: "DMSerifDisplay",
                          fontWeight: "600",
                          ...(Platform.OS === "android" && {
                            fontWeight: "600",
                            fontFamily: "DMSerifDisplay",
                          }),
                        },

                        p: {
                          color: colors.text,
                          fontSize: 13,
                          fontFamily: "DMSerifDisplay",
                          // fontFamily: Fonts.type.ComicSansMS,
                          //textAlign: 'justify',
                        },
                        span: {
                          color: colors.text,
                          fontSize: 13,
                          fontFamily: "DMSerifDisplay",
                          // fontFamily: Fonts.type.ComicSansMS,
                          //textAlign: 'justify',
                        },
                        li: {
                          // color: isDarkMode ? 'blue' : 'red',
                          color: colors.text,
                          // fontSize: 12,
                          fontFamily: "DMSerifDisplay",
                        },
                        div: {
                          textAlign: "justify",
                          color: colors.text,
                        },
                      }}
                    />
                    {/* <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "DMSerifDisplay",
                    color: colors.corn90,
                    marginVertical: 5,
                  }}>
                  {item.overview_info
                    .replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '')
                    .replace(/(&nbsp;)/g, ' ')
                    .replace(/(&ndash;)/g, '-')
                    .replace(/(&amp;)/g, `&`)}
                </Text> */}
                    <TouchableOpacity onPress={() => showModalOverview(item)}>
                      <View
                        style={{
                          flexDirection: "row",
                          marginVertical: 5,

                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: "DMSerifDisplay",
                            color: colors.text,
                            marginBottom: 2,
                            marginRight: 5,
                            alignSelf: "center",
                            // alignContent: 'center',
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderBottomColor: colors.text,
                          }}
                        >
                          Show more
                        </Text>
                        <Icon
                          style={
                            {
                              // alignSelf: 'center',
                              // alignContent: 'center',
                              // justifyContent: 'center',
                              // alignItems: 'center',
                            }
                          }
                          // name="angle-left"

                          name="chevron-right"
                          size={14}
                          color={colors.primary}
                          enableRTL={true}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "DMSerifDisplay",
                    color: colors.text,
                    marginVertical: 5,
                  }}
                >
                  No data overview
                </Text>
              )}
            </View>
            {/* --- grid features dll  */}
            <View style={{ marginHorizontal: 20, marginTop: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 30,
                }}
              >
                <ButtonMenuHome
                  onPress={() => clik()}
                  title={"Features"}
                  nameicon={"gem"}
                ></ButtonMenuHome>
                <ButtonMenuHome
                  onPress={() => setVisibleGallery(true)}
                  title={"Gallery"}
                  nameicon={"images"}
                ></ButtonMenuHome>
                <ButtonMenuHome
                  onPress={() => setVisibleFloorplan(true)}
                  title={"Unit Plan"}
                  nameicon={"houzz"}
                ></ButtonMenuHome>
                <ButtonMenuHome
                  onPress={() => setVisibleSurrounding(true)}
                  title={"Surrounding"}
                  nameicon={"map-marker-alt"}
                  // onPress={() =>
                  //   navigation.navigate('CalculatorScreen')
                  // }
                ></ButtonMenuHome>
              </View>
            </View>
            {/* /// VIDEO  */}
            <View
              style={{
                marginHorizontal: 20,
                // borderRadius: 15,
                marginTop: 15,
                // backgroundColor: 'yellow',
                marginBottom: 0,
              }}
            >
              <Text
                style={{
                  fontFamily: "DMSerifDisplay",
                  fontSize: 14,
                  color: colors.text,
                  marginVertical: 15,
                  fontWeight: "bold",
                }}
              >
                Video
              </Text>

              {overviewProject.length != 0 ? (
                overviewProject.map((item, index) => {
                  console.log("529 item: " + item.youtube_link);
                  let text = item.youtube_link + "";
                  text = text.replace("https://www.youtube.com/embed/", "");
                  text = text.split("&")[0];
                  console.log("532 item: " + text);
                  return (
                    <View style={{ borderRadius: 15, overflow: "hidden" }}>
                      <YoutubePlayer
                        key={index}
                        height={200}
                        play={playing}
                        videoId={text}
                        //videoId="OfLV5h-1rRI"
                        //videoId="y7qXPaoFsac"
                        //videoId="mLQ5_q7WFFI&t=14s"
                        //videoId="mLQ5_q7WFFI"
                        //onChangeState={onStateChange}
                        //style={{ borderRadius: 50 }}
                        useLocalHTML={false}
                      />
                    </View>
                  );
                })
              ) : (
                <Text>No Url Id Youtube</Text>
              )}

              {/* <Button
            onPress={() => togglePlaying}
            style={{backgroundColor: 'red'}}>
            <Text>{playing ? 'Pause' : 'Play'}</Text>
          </Button> */}
              {/* <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} /> */}
            </View>
            {/* /// contact  */}
            <View
              style={{
                marginHorizontal: 20,
                // borderRadius: 15,
                marginTop: 15,
                // backgroundColor: 'yellow',
                marginBottom: 0,
              }}
            >
              <Text
                style={{
                  fontFamily: "DMSerifDisplay",
                  fontSize: 14,
                  color: colors.text,
                  marginVertical: 15,
                  fontWeight: "bold",
                }}
              >
                Contact
              </Text>

              {projectAddress.map((item, index) => (
                <View>
                  <View
                    style={{
                      backgroundColor: colors.primaryLight,
                      borderRadius: 15,
                      padding: 10,
                      marginBottom: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "DMSerifDisplay",
                        color: "black", //colors.text,
                        fontSize: 12,
                        textAlign: "center",
                      }}
                    >
                      Address: {"\n"}
                      {item.coordinat_address}
                      {"\n"}
                    </Text>

                    <Text
                      style={{
                        fontFamily: "DMSerifDisplay",
                        color: "black", //colors.text,
                        fontSize: 12,
                        textAlign: "center",
                        marginLeft: 3,
                      }}
                    >
                      Phone: {"\n"}
                      {item.wa_no}
                      {"\n"}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "DMSerifDisplay",
                        color: "black", //colors.text,
                        fontSize: 12,
                        textAlign: "center",
                      }}
                    >
                      Email: {"\n"}
                      {item.email_add}
                    </Text>
                  </View>

                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "DMSerifDisplay",
                      color: colors.text,
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    ARE YOU INTERESTED? IT'S TIME TO DISCOVER YOUR HOME
                  </Text>

                  <View
                    style={{
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    {/* <WebView
                                    scalesPageToFit={true}
                                    bounces={false}
                                    javaScriptEnabled
                                    style={{
                                        height: 250,
                                        width: 300,
                                        // backgroundColor: 'blue',
                                    }}
                                    source={{
                                        html: `
                  <!DOCTYPE html>
                  <html>
                    <head></head>
                    <body>
                      <div id="baseDiv">

<iframe src="${item.coordinat_project}"
             width="960" height="800" style="border:0;" allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                      </div> --- 
                    </body>
                  </html>
            `,
                                    }}
                                    automaticallyAdjustContentInsets={false}
                                /> */}

                    <Button
                      style={{
                        backgroundColor: colors.primary,
                        width: "50%",
                        height: 40,
                      }}
                      onPress={() => {
                        console.log(
                          "628 item.coordinat_project: ",
                          item.coordinat_project
                        );
                        return item.coordinat_project == null
                          ? Alert.alert("No available location project")
                          : Linking.openURL(item.coordinat_project);
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          //backgroundColor: colors.primary,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "DMSerifDisplay",
                            color: "white",
                            fontSize: 12,
                            paddingRight: 5,
                            fontWeight: "bold",
                          }}
                        >
                          Find Location
                        </Text>
                        <Icon name="location-arrow" color={"white"} size={14} />
                      </View>
                    </Button>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
        {/* /// LOCATION  */}
        {/* <View>
          <View
            style={{
              marginHorizontal: 20,

              // borderRadius: 15,
              marginTop: 15,
              // backgroundColor: 'yellow',
              marginBottom: 0,
            }}> */}
        {/* <Text
              style={{
                fontFamily: "DMSerifDisplay",
                fontSize: 14,
                color: colors.corn70,
                marginVertical: 15,
              }}>
              Location
            </Text> */}
        {/* <View>
              <MapView
                //             {markers.map((marker, index) => (
                //   <Marker
                //     key={index}
                //     coordinate={marker.latlng}
                //     title={marker.title}
                //     description={marker.description}
                //   />
                // ))}
                // region={regionChange}
                // onRegionChange={onRegionChange}
                style={{width: '100%', height: 300}}
                initialRegion={{
                  latitude: -6.2092,
                  longitude: 106.85138,
                  latitudeDelta: 0.04,
                  longitudeDelta: 0.05,
                }}>
                <Marker
                  coordinate={{latitude: -6.2092, longitude: 106.85138}}
                  image={{uri: 'custom_pin'}}
                  style={{width: 50, height: 50}}
                />
              </MapView>
            </View> */}
        {/* <WebView
              javaScriptEnabled={true}
              domStorageEnabled={true}
              map
              style={{flex: 1}}
              allowsPreserveOrigin
              webPolicies={{
                forms: 'https://*.other-domain.com',
              }}
              source={{uri: 'https://google.com/'}}
            /> */}
        {/* <RenderHTML
              javaScriptEnabled={true}
              domS
              renderers={renderers}
              WebView={WebView}
              contentWidth={Dimensions.get('window').width - 35}
              customHTMLElementModels={customHTMLElementModels}
              source={{
                html: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.742481636988!2d106.85165925!3d-6.206128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4711cac0e99%3A0x47c98448b038a7d8!2sManggarai!5e0!3m2!1sid!2sid!4v1700646090231!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
              }}></RenderHTML> */}
        {/* </View>
        </View> */}
        {/* // --- modal project detail overview */}
        <View>
          <CustomAlert2
            visible={isDAlertVisible}
            message="Are you sure you want to download?"
            onConfirm={() => {
              setDAlertVisible(false);
              //handleLinking();
              console.log(
                "949 confirm: ",
                downloadProject[0]?.url,
                "Brochure " + paramsDetail.descs + ".pdf"
              );
              // downloadFile(
              //   downloadProject[0]?.url,
              //   "Brochure " + paramsDetail.descs + ".pdf"
              // );
              ProjectDetails;
            }}
            onCancel={() => {
              setDAlertVisible(false);
            }}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View
              style={[
                styles.centeredView,
                {
                  backgroundColor: colors.background,
                  borderTopRightRadius: 25,
                  borderTopLeftRadius: 25,
                },
              ]}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    marginHorizontal: 20,
                    marginVertical: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <View>
                      <Icon
                        name="arrow-left"
                        size={18}
                        color={colors.primary}
                      />
                    </View>
                  </TouchableOpacity>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "DMSerifDisplay",
                        color: colors.text,
                        fontSize: 16,
                      }}
                    >
                      Overview
                    </Text>
                  </View>
                </View>
                {/* --- border  */}
                <View
                  style={{
                    borderWidth: 0.3,
                    borderColor: colors.text,
                    borderStyle: "solid",
                  }}
                ></View>
              </View>
              {/* <View style={styles.modalView}> */}
              {itemsOverview.length != 0 ? (
                <View
                  style={{
                    marginHorizontal: 30,
                    marginVertical: 20,
                  }}
                >
                  <RenderHtml
                    contentWidth={contentWidth}
                    source={{
                      html: `
                                        <div style="text-align: justify;">
                                        ${itemsOverview.overview_info}
                                        </div>
                                        `,
                    }}
                    systemFonts={systemFonts}
                    defaultTextProps={{
                      allowFontScaling: false,
                    }}
                    ignoredStyles={["fontSize", "color", "backgroundColor"]}
                    enableExperimentalMarginCollapsing={true}
                    tagsStyles={{
                      em: {
                        color: colors.text,
                        // fontSize: 12,
                        fontFamily: "DMSerifDisplay",
                        // fontFamily: Fonts.type.ComicSansMS,
                        // textAlign: 'justify',
                        fontStyle: "normal",
                      },
                      strong: {
                        color: colors.text,
                        // fontSize: 12,
                        // fontFamily: "DMSerifDisplay",
                        fontWeight: "600",
                        ...(Platform.OS === "android" && {
                          fontWeight: "600",
                          fontFamily: "DMSerifDisplay",
                        }),
                      },
                      b: {
                        color: colors.text,
                        // fontSize: 12,
                        // fontFamily: "DMSerifDisplay",
                        fontWeight: "600",
                        ...(Platform.OS === "android" && {
                          fontWeight: "600",
                          fontFamily: "DMSerifDisplay",
                        }),
                      },

                      p: {
                        color: colors.text,
                        fontSize: 13,
                        fontFamily: "DMSerifDisplay",
                        // fontFamily: Fonts.type.ComicSansMS,
                        textAlign: "justify",
                      },
                      span: {
                        color: colors.text,
                        fontSize: 13,
                        fontFamily: "DMSerifDisplay",
                        // fontFamily: Fonts.type.ComicSansMS,
                        textAlign: "justify",
                      },
                      li: {
                        // color: isDarkMode ? 'blue' : 'red',
                        color: colors.text,
                        // fontSize: 12,
                        fontFamily: "DMSerifDisplay",
                      },
                      div: {
                        textAlign: "justify",
                        color: colors.text,
                      },
                      font: {
                        textAlign: "justify",
                        color: colors.text,
                      },
                    }}
                  />
                  {/* <Text
                    numberOfLines={0}
                    style={{
                      textAlign: 'justify',
                      fontFamily: "DMSerifDisplay",
                    }}>
                    {itemsOverview.overview_info
                      .replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '')
                      .replace(/(&nbsp;)/g, ' ')
                      .replace(/(&ndash;)/g, '-')
                      .replace(/(&amp;)/g, `&`)}
                  </Text> */}
                  {/* <Text style={styles.modalText}>Hello World!</Text>
                <Button
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Button> */}
                </View>
              ) : (
                <Text>No data overview</Text>
              )}
            </View>
          </Modal>
        </View>
        {/* // modal features */}
        <Features
          onRequestClose={() => {
            setVisibleFeatures(false);
          }}
          visible={visibleFeatures}
          icon={
            <TouchableOpacity onPress={() => setVisibleFeatures(false)}>
              <Icon name="arrow-left" size={18} color={colors.primary} />
            </TouchableOpacity>
          }
          datas={featureProject}
        ></Features>
        {/* // modal gallery  */}
        <Gallery
          onRequestClose={() => {
            setVisibleGallery(false);
          }}
          visible={visibleGallery}
          icon={
            <TouchableOpacity onPress={() => setVisibleGallery(false)}>
              <Icon name="arrow-left" size={18} color={colors.primary} />
            </TouchableOpacity>
          }
          datas={galleryProject}
        ></Gallery>
        <Floorplan
          onRequestClose={() => {
            setVisibleFloorplan(false);
          }}
          visible={visibleFloorplan}
          icon={
            <TouchableOpacity onPress={() => setVisibleFloorplan(false)}>
              <Icon name="arrow-left" size={18} color={colors.primary} />
            </TouchableOpacity>
          }
          datas={planProject}
        ></Floorplan>
        <Surrounding
          onRequestClose={() => {
            setVisibleSurrounding(false);
          }}
          visible={visibleSurrounding}
          icon={
            <TouchableOpacity onPress={() => setVisibleSurrounding(false)}>
              <Icon name="arrow-left" size={18} color={colors.primary} />
            </TouchableOpacity>
          }
          datas={surroundingProject}
        ></Surrounding>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProjectDetails;
