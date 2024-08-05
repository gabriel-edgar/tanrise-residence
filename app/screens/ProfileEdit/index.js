import {
  Button,
  Header,
  Icon,
  Image,
  SafeAreaView,
  Text,
  TextInput,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
// Load sample data
import { UserData } from "@data";
import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, View, Alert } from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import {
  saveProfile,
  actionTypes,
  saveFotoProfil,
} from "../../actions/UserActions";
import { TouchableOpacity } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import ReactNativeBlobUtil from "react-native-blob-util";

const ProfileEdit = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const [images, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => getUser(state));
  console.log("user di profil", user);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.Handphone || user.handphone);
  const [emailuser, setEmail] = useState(user.user);
  const [datas, setData] = useState();
  const saveProfilerResult = useCallback(
    () => dispatch(saveProfile()),
    [dispatch]
  );

  useEffect(() => {
    if (user === null) {
      props.navigation.navigate("Auth");
    }
  });

  //   const onLogOut = useCallback(() => {
  //   Alert.alert(
  //     'Are you sure ?',
  //     'Press Ok if you want to log out!',
  //     [
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //       {text: 'OK', onPress: () => logoutUser()},
  //     ],
  //     {cancelable: false},
  //   );
  // }, [dispatch]);

  const saveProfiles = useCallback(
    () =>
      dispatch(
        saveProfile({
          emails: user.user,
          name,
          phone,
          genders: "Male",
        })
      ),
    // console.log('You clicked ', event);
    [{ emails: user.user, name, phone, genders: "Male" }, dispatch]
  );

  const handphonechanged = useCallback((value) => setPhone(value), []);
  const namechanged = useCallback((value) => setName(value), []);

  const savePhoto = useCallback(() =>
    dispatch(saveFotoProfil({ image: images, email: user.user }))
  );

  const handlePhotoPick = () => {
    console.log("datImage", images);
    Alert.alert(
      "Select a Photo",
      "Choose the place where you want to get a photo",
      [
        { text: "Gallery", onPress: () => fromGallery() },
        { text: "Camera", onPress: () => fromCamera() },
        {
          text: "Cancel",
          onPress: () => console.log("User Cancel"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const fromCamera = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: false,
    })
      .then((images) => {
        console.log("received image", images);

        setImage([
          {
            uri: images.path,
            width: images.width,
            height: images.height,
            mime: images.mime,
          },
        ]);
        // savePhoto();
        // uploadPhoto();
        // setImage(prevState => ({
        //   image: [
        //     ...prevState.image,
        //     {
        //       uri: image.path,
        //       width: image.width,
        //       height: image.height,
        //       mime: image.mime,
        //     },
        //   ],
        // }));
      })
      .catch((e) => console.log("tag", e));
  };

  const fromGallery = (cropping, mediaType = "photo") => {
    // let imageList = [];

    ImagePicker.openPicker({
      width: 500,
      height: 500,

      multiple: false,
    })
      .then((images) => {
        console.log("received images", images);
        setImage([
          {
            uri: images.path,
            width: images.width,
            height: images.height,
            mime: images.mime,
          },
        ]);
        // savePhoto();
        // uploadPhoto();
        // image.map(image => {
        //   imageList.push({
        //     uri: image.path,
        //     width: image.width,
        //     height: image.height,
        //     mime: image.mime,
        //   });
        // });
        // console.log('received images', image);
        // console.log('received images >', imageList);
        // setImage(imageList);
        // for (var i = 0; i < image.length; i++) {
        //   setImage({
        //     images: [
        //       {
        //         uri: image[i].path,
        //         width: image[i].width,
        //         height: image[i].height,
        //         mime: image[i].mime,
        //       },
        //     ],
        //   });
        // }
      })
      .catch((e) => console.log("tag", e));
  };

  useEffect(() => {
    images.length != 0 ? savePhoto() : null;
  }, [images]);

  const uploadPhoto = async () => {
    console.log("isi images", images[0].uri);
    let fileName = "profile.png";
    let fileImg = ReactNativeBlobUtil.wrap(
      images[0].uri.replace("file://", "")
    );
    console.log("fileimg", fileImg);
    ReactNativeBlobUtil.fetch(
      "POST",
      urlApi + "/c_profil/upload/" + this.state.email,
      {
        "Content-Type": "multipart/form-data",
        Token: this.state.token,
      },
      [{ name: "photo", filename: fileName, data: fileImg }]
    ).then((resp) => {
      let res = JSON.stringify(resp.data);
      console.log("res", resp);
      _storeData("@ProfileUpdate", true);
    });
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("edit_profile")}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {}}
      />
      <ScrollView>
        <View style={styles.contain}>
          <TouchableOpacity onPress={() => handlePhotoPick()}>
            <View>
              <Icon
                name="camera"
                size={22}
                color={colors.primary}
                enableRTL={true}
              />
            </View>
          </TouchableOpacity>
          <View>
            <Image source={{ uri: `${user.pict}` }} style={styles.thumb} />
          </View>

          {/* <View style={styles.contentTitle}>
            <Text headline semibold>
              {t('account')}
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={text => setName(text)}
            autoCorrect={false}
            placeholder={t('input_id')}
            // placeholder={user.name}
            placeholderTextColor={BaseColor.grayColor}
            value={name}
            selectionColor={colors.primary}
          /> */}
          <View style={styles.contentTitle}>
            <Text headline semibold>
              {t("name")}
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            // onChangeText={text => setName(text)}
            onChangeText={namechanged}
            autoCorrect={false}
            placeholder={t("input_name")}
            placeholderTextColor={BaseColor.grayColor}
            value={name}
            selectionColor={colors.primary}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              {t("email")}
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            // onChangeText={text => setEmail(text)}
            autoCorrect={false}
            editable={false}
            selectTextOnFocus={false}
            placeholder={t("input_email")}
            placeholderTextColor={BaseColor.grayColor}
            value={user.user}
            // value={emailuser}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              {t("Handphone")}
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            // onChangeText={text => setPhone(text)}
            onChangeText={handphonechanged}
            autoCorrect={false}
            placeholder={t("input_address")}
            placeholderTextColor={BaseColor.grayColor}
            value={phone}
            selectionColor={colors.primary}
          />
        </View>
      </ScrollView>
      <View style={{ padding: 20 }}>
        <Button
          loading={loading}
          full
          // onPress={() => {
          //   setLoading(true);
          //   setTimeout(() => {
          //     // navigation.goBack();
          //     saveProfiles();
          //   }, 500);
          // }}
          onPress={() => saveProfiles()}
        >
          {t("confirm")}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEdit;
