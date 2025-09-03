import { Header, Icon, Image, SafeAreaView, Text } from "@/components";
import { BaseColor, BaseStyle, Images, useTheme } from "@/config";
import React, { useState } from "react";
import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";
import styles from "./styles";
import { FontWeight } from "../../config";
import ImageZoom from "react-native-image-pan-zoom";
const { width, height } = Dimensions.get("window");

const imagesInit = [
  { id: "1", image: Images.location1, selected: true },
  { id: "2", image: Images.location2 },
  { id: "3", image: Images.location3 },
  { id: "4", image: Images.location4 },
  { id: "5", image: Images.location5 },
  { id: "6", image: Images.location6 },
  { id: "7", image: Images.location7 },
];

export default function PreviewImageHome({ navigation, route }) {
  const { colors } = useTheme();
  const imagesParam = route?.params?.images ?? "";
  const title = route?.params?.title;
  let flatListRef = null;
  let swiperRef = null;

  const [image, setImage] = useState(imagesParam);

  const [indexSelected, setIndexSelected] = useState(0);

  console.log("images preview", image); //string

  const onTouchImage = (touched) => {
    if (touched == indexSelected) return;
    swiperRef.scrollBy(touched - indexSelected, false);
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { backgroundColor: "black" }]}
      edges={["top", "right", "bottom", "left"]}
    >
      <Header
        style={{ backgroundColor: "black", color: "white" }}
        title=""
        renderRight={() => {
          return <Icon name="times" size={20} color={BaseColor.whiteColor} />;
        }}
        onPressRight={() => {
          navigation.goBack();
        }}
        barStyle="light-content"
      />
      {/* <Text
        style={{
          color: "white",
          padding: 20,
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 17,
        }}
      >
        {title}
      </Text> */}
      {/* <Image
          // key={key}
          style={{ width: "100%", height: "90%" }}
          resizeMode="contain"
          source={{ uri: image }}
        /> */}
      <ImageZoom
        cropWidth={Dimensions.get("window").width}
        cropHeight={Dimensions.get("window").height}
        imageWidth={Dimensions.get("window").width}
        imageHeight={650}
      >
        <Image
          style={{ width: Dimensions.get("window").width, height: 500 }}
          resizeMode="contain"
          source={{ uri: image }}
        />
      </ImageZoom>
    </SafeAreaView>
  );
}
