import { AuthActions } from "@actions";
import {
  Button,
  Icon,
  ProfileDetail,
  ProfilePerformance,
  SafeAreaView,
  Tag,
  Text,
  Header,
} from "@components";
import { BaseStyle, useTheme } from "@config";
// Load sample data
import { UserData } from "@data";
import React, { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, TouchableOpacity, View, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import { actionTypes, login, logout } from "../../actions/UserActions";
import getUser from "../../selectors/UserSelectors"; //s
import { BackgroundImage } from "react-native-elements/dist/config";
import {
  //data_project,
  //data_unit,
  choosed_unit,
  choosed_project,
  action_remove_redux_dot,
} from "../../actions/ProjectActions";

const { authentication } = AuthActions;

const Profile = (props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { navigation } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(UserData[0]);
  const user = useSelector((state) => getUser(state));
  // const [fotoprofil, setFotoProfil] = useState(
  //   user.pict != null ? user.pict.replace('https', 'http') : null,
  // );
  const [fotoprofil, setFotoProfil] = useState(user != null ? user.pict : null);
  //console.log("profiles", user.pict);

  const logoutUser2 = useCallback(
    () => dispatch(logout(user.email)),
    [dispatch]
  );

  const saveUnit = useCallback((unit) => dispatch(choosed_unit(unit)));
  const saveProject = useCallback((project) =>
    dispatch(choosed_project(project))
  );
  const clearReduxDot = useCallback(() => dispatch(action_remove_redux_dot()));

  const logoutUser = () => {
    setLoading(true);
    saveUnit({});
    saveProject("");
    clearReduxDot();
    logoutUser2();
  };

  // ------ coba dari youtube

  /**
   * @description Simple logout with Redux
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  // const onLogOut = () => {
  //   dispatch([actionTypes.LOGOUT]);
  // };

  useEffect(() => {
    setFotoProfil(user?.pict);
  }, [user]);

  useEffect(() => {
    if (user == null) {
      props.navigation.navigate("SignIn");
    }
  });

  // useEffect(() => {
  //   user;
  // });

  const onLogOut = useCallback(() => {
    Alert.alert(
      "Are you sure ?",
      "Press Ok if you want to log out!",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            //setLoading(true);
            return logoutUser();
          },
        },
        // {
        //   text: "OK",
        //   onPress: logoutUser(),
        // },
      ],
      { cancelable: false }
    );
  }, [dispatch]);

  // const

  const onLogIn = () => {
    navigation.navigate("SignIn");
  };

  const styleItem = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
  };

  return (
    <SafeAreaView
      style={[
        BaseStyle.safeAreaView,
        {
          //backgroundColor: "black",
          color: "white",
        },
      ]}
      edges={["right", "top", "left"]}
    >
      <View
        style={[BaseStyle.safeAreaView, { backgroundColor: colors.background }]}
        edges={["right", "top", "left"]}
      >
        <Header
          title={t("setting")}
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
        />

        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.contain}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {user && (
              <ProfileDetail
                // image={user.pict}
                image={fotoprofil}
                // image={{uri: `${user.pict}`}}
                textFirst={user.name}
                textSecond={user.email}
                onPress={() => {
                  navigation.navigate("ImageDetail", fotoprofil);
                }}
              />
            )}

            <View style={{ width: "100%" }}>
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate("Setting");
                }}
              >
                <Text body1>{t("setting")}</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{ marginLeft: 5 }}
                  enableRTL={true}
                />
              </TouchableOpacity>
              {login && (
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                    navigation.navigate("ProfileEdit");
                  }}
                >
                  <Text body1>{t("edit_profile")}</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{ marginLeft: 5 }}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              )}
              {login && (
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                    navigation.navigate("ChangePassword");
                  }}
                >
                  <Text body1>{t("change_password")}</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{ marginLeft: 5 }}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              )}

              {/* {login && (
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate('EBank');
                }}>
                <Text body1>{t('payments')}</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{marginLeft: 5}}
                  enableRTL={true}
                />
              </TouchableOpacity>
            )} */}

              {/* {login && (
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate('EAddress');
                }}>
                <Text body1>{t('billing_address')}</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{marginLeft: 5}}
                  enableRTL={true}
                />
              </TouchableOpacity>
            )} */}

              {/* {login && (
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate('EWishlist');
                }}>
                <Text body1>{t('product_wishlist')}</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{marginLeft: 5}}
                  enableRTL={true}
                />
              </TouchableOpacity>
            )} */}

              {/* <TouchableOpacity
              style={styleItem}
              onPress={() => {
                navigation.navigate('PreviewComponent');
              }}>
              <Text body1>{t('preview_component')}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{marginLeft: 5}}
                enableRTL={true}
              />
            </TouchableOpacity> */}
              {/* <TouchableOpacity
              style={styleItem}
              onPress={() => {
                navigation.navigate('ContactUs');
              }}>
              <Text body1>{t('contact_us')}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{marginLeft: 5}}
                enableRTL={true}
              />
            </TouchableOpacity> */}
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate("AboutUs");
                }}
              >
                <Text body1>{t("about_us")}</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{ marginLeft: 5 }}
                  enableRTL={true}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate("Privacy");
                }}
              >
                <Text body1>{t("Privacy Policy")}</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{ marginLeft: 5 }}
                  enableRTL={true}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View style={{ padding: 10 }}>
          <Button full loading={loading} onPress={() => onLogOut()}>
            {t("sign_out")}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
