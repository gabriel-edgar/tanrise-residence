import { Text, Button, Icon } from "@components";
import {
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  useWindowDimensions,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { ButtonMenuHome } from "@components";
import { BaseStyle, Fonts, BaseColor } from "@config";
import dummy_feature from "./dummy_features.json";
import RenderHtml, { defaultSystemFonts } from "react-native-render-html";

const Features = (props) => {
  const { onPress, datas, visibleMod, icon, ...attrs } = props;
  console.log("attrs ?", attrs);
  console.log("datas nya", datas);
  console.log("visiblemodal", visibleMod);
  const [visibleModal, setVisibleModal] = useState(visibleMod);
  console.log("visiblemodaldifeature", visibleModal);
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
  const { width } = useWindowDimensions().width;
  // const [dataFeatures, setDataFeatures] = useState(dummy_feature.data);
  const [dataFeatures, setDataFeatures] = useState(datas);
  const isDarkMode = useColorScheme() === "dark";

  console.log("datafeature", dataFeatures);
  const close = () => {
    setVisibleModal(false);
  };
  return (
    <Modal {...attrs} animationType="slide" transparent={false}>
      <View
        style={[
          styles.centeredView,
          {
            backgroundColor: BaseColor.whiteColor,
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
            {icon}

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
                  color: BaseColor.corn70,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Features
              </Text>
            </View>
          </View>
          {/* --- border  */}
          {/* <View
            style={{
              borderWidth: 0.3,
              borderColor: BaseColor.corn70,
              borderStyle: "solid",
            }}
          ></View> */}

          <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
            {/* <FlatList
              keyExtractor={item => item.key}
              numColumns={4}
              horizontal={false}
              data={dataFeatures}
              renderItem={({item, index}) => {
                return (
                  <View>
                    <ButtonMenuHome
                      disabled={true}
                      style={{
                        margin: 7,
                        backgroundColor: BaseColor.whiteColor,
                        borderWidth: 0.5,
                        borderColor: BaseColor.corn30,
                        borderStyle: 'solid',
                      }}
                      // onPress={() => clik()}
                      // disabled={disabled}
                      title={item.title}
                      typeIcon={'MCI'}
                      nameicon={item.icon}></ButtonMenuHome>
                  </View>
                );
              }}></FlatList> */}
            {datas.map((item, index) => (
              // <Text>{item.feature_info}</Text>

              <RenderHtml
                key={index}
                contentWidth={width}
                source={{ html: item.feature_info }}
                systemFonts={systemFonts}
                ignoredStyles={["fontSize", "fontFamily", "color"]}
                tagsStyles={{
                  em: {
                    color: BaseColor.corn70,
                    // fontSize: 12,
                    fontFamily: "DMSerifDisplay",
                    // fontFamily: Fonts.type.ComicSansMS,
                    // textAlign: 'justify',
                    fontStyle: "normal",
                  },
                  strong: {
                    color: BaseColor.corn70,
                    // fontSize: 12,
                    // fontFamily: "DMSerifDisplay",
                    fontWeight: "600",
                    ...(Platform.OS === "android" && {
                      fontWeight: "600",
                      fontFamily: "DMSerifDisplay",
                    }),
                  },
                  b: {
                    color: BaseColor.corn70,
                    // fontSize: 12,
                    // fontFamily: "DMSerifDisplay",
                    fontWeight: "600",
                    ...(Platform.OS === "android" && {
                      fontWeight: "600",
                      fontFamily: "DMSerifDisplay",
                    }),
                  },

                  a: {
                    // color: BaseColor.corn70,
                    // fontSize: 12,
                    fontFamily: "DMSerifDisplay",
                    // fontFamily: Fonts.type.ComicSansMS,
                    // textAlign: 'justify',
                  },
                  p: {
                    color: BaseColor.corn70,
                    // fontSize: 12,
                    fontFamily: "DMSerifDisplay",
                    // fontFamily: Fonts.type.ComicSansMS,
                    textAlign: "justify",
                  },
                  span: {
                    color: BaseColor.corn70,
                    // fontSize: 12,
                    fontFamily: "DMSerifDisplay",
                    // fontFamily: Fonts.type.ComicSansMS,
                    textAlign: "justify",
                  },
                  li: {
                    // color: isDarkMode ? 'blue' : 'red',
                    color: BaseColor.corn70,
                    // fontSize: 12,
                    fontFamily: "DMSerifDisplay",
                  },
                }}
              />

              // <Text
              //   key={index}
              //   style={{
              //     fontFamily: "DMSerifDisplay",
              //     color: BaseColor.corn70,
              //     fontSize: 12,
              //   }}>
              //   {item.feature_info
              //     .replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '')
              //     .replace(/(&nbsp;)/g, ' ')
              //     .replace(/(&ndash;)/g, '-')
              //     .replace(/(&amp;)/g, `&`)}
              // </Text>
            ))}
          </View>
        </View>
      </View>

      {/* <Button onPress={() => close()} style={{backgroundColor: 'red'}}>
        <Text>close</Text>
      </Button> */}
    </Modal>
  );
};

export default Features;
