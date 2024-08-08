import { Text, Button, Icon } from "@components";
import { View, TouchableOpacity, Modal, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import ImageViewing from "react-native-image-viewing";

import get from "lodash/get";
import React, { useState } from "react";
import ReactNativeBlobUtil from "react-native-blob-util";
import { BaseColor, Fonts } from "./theme";

const CustomAlert = (props) => {
  const { onPress, datas, icon, ...attrs } = props;
  // const [sukses, setSukses] = useState(false);
  // const [visib, setVisib] = useState(attrs.visible);
  // console.log('visib', visib);
  // console.log('attrs custom alert?', attrs);
  // console.log('datas images di custom alert', datas);

  const _saveImages = (uri) => {
    console.log("urii??", uri);
    let dirs = ReactNativeBlobUtil.fs.dirs;
    ReactNativeBlobUtil.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      addAndroidDownloads: {
        path: dirs.DownloadDir + "/" + "Promo",
        // path: dirs.DownloadDir + '/' + item.doc_no + '.' + extension, //ini pake extensi yang sama kayak url
        useDownloadManager: true,
        // Show notification when response data transmitted
        notification: true,
        // Title of download notification
        title: "Image Gallery Apps Paradise Mobiles",
        // File description (not notification description)
        description: "downloading content...",
        // mime: 'application/pdf',
        // Make the file scannable  by media scanner
        mediaScannable: true,
      },
    })
      .fetch("GET", uri, {
        //some headers ..
      })
      .then((res) => {
        // the temp file path
        console.log("The file saved to ", res.path());
        imageView = (
          <Image
            source={{
              uri:
                Platform.OS === "android"
                  ? "file://" + res.path()
                  : "" + res.path(),
            }}
          />
        );
        // setSukses(true);
        // console.log('attrs visible', attrs.visible);
        // attrs.visible = 'false';
        // setVisib(false);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      }}
    >
      <Modal
        {...attrs}
        animationType="slide"
        transparent={true}
        // onRequestClose={attrs.onRequestClose}
        // visible={attrs.visible}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // marginTop: 22,
          }}
        >
          <View
            style={{
              // margin: 20,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 20,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "DMSerifDisplay",
                fontSize: 12,
                color: BaseColor.corn70,
              }}
            >
              Do you want to save the image?
            </Text>
            <Text
              style={{
                fontFamily: "DMSerifDisplay",
                fontSize: 12,
                color: BaseColor.corn70,
              }}
            >
              This image will be saved on your phone.
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 25,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  marginHorizontal: 25,
                  alignItems: "flex-end",
                  flex: 1,
                }}
              >
                <TouchableOpacity onPress={() => _saveImages(datas.uri)}>
                  <Text
                    style={{
                      fontFamily: "DMSerifDisplay",
                      fontSize: 12,
                      color: BaseColor.greenStateColor,
                    }}
                  >
                    Save image
                  </Text>
                </TouchableOpacity>
              </View>

              <View>{icon}</View>
            </View>

            {/* <Text>ini akan jadi cutom modal</Text> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomAlert;
