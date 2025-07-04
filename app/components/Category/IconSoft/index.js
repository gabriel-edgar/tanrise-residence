import Icon from "@/components/Icon";
import Text from "@/components/Text";
import { BaseColor, useTheme } from "@/config";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import styles from "./styles";
import { parseHexTransparency } from "@/utils";
import Loading from "./Loading";
import { Image } from "react-native-elements";
import { useSelector } from "react-redux";

export default function CategoryIconSoft({
  style = "",
  icon = "",
  icon_url = "",
  title = "",
  onPress = () => {},
  loading = false,
  isNormal = true,
  isWhite = false,
  isRound = false,
  isBlack = false,
  maxWidth = 150,
  font,
}) {
  const { colors } = useTheme();
  const data = useSelector((state) => state.apiReducer.data);
  let sum = 0;
  data.map((item, index) => {
    sum += parseInt(item.IsRead);
  });

  const counter = useSelector((state) => state.counter);
  console.log("counter badge di tabbar", counter);
  const total = data.length;
  const finalCount = total - sum;

  const stateReduxHelpdeskDot = useSelector(
    (state) => state.Dataproject.helpdesk_dot
  );

  if (loading) {
    return <Loading style={style} />;
  }

  const getIconColor = () => {
    if (isWhite) {
      return BaseColor.whiteColor;
    }
    if (isBlack) {
      return colors.text;
    }
    return BaseColor.whiteColor;
  };

  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        styles.contain,
        isNormal && { backgroundColor: colors.backgroundColor },
        isWhite && { backgroundColor: BaseColor.grayColor },
        style,
      ])}
      onPress={onPress}
    >
      <View
        style={StyleSheet.flatten([
          styles.iconContent,
          // { width: 300, backgroundColor: "blue" },
          isNormal && {
            backgroundColor: parseHexTransparency(colors.primary, 100),
          },
          isWhite && {
            backgroundColor: parseHexTransparency(colors.whiteColor, 30),
          },
          isBlack && {
            backgroundColor: parseHexTransparency(BaseColor.grayColor, 30),
          },
          isRound && styles.isRound,
        ])}
      >
        {/* <Image
          source={icon_url}
          style={{borderRadius: 12, width: 75, height: 75}}></Image> */}
        <Icon
          name={icon}
          size={isRound ? 29 : 32}
          color={getIconColor()}
          solid
        />
        {title == "Helpdesk" ? (
          stateReduxHelpdeskDot ? (
            <View
              style={{
                borderWidth: 1,
                borderColor: BaseColor.whiteColor,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                width: 20,
                height: 20,
                backgroundColor: "red",
                top: 0,
                right: 0,
                borderRadius: 10,
              }}
            >
              {/* <Text whiteColor caption2>
            {finalCount < 0 ? 0 : finalCount}
          </Text> */}
            </View>
          ) : null
        ) : null}
      </View>

      <View
        style={{
          marginTop: 15, //maxWidth: maxWidth
        }}
      >
        <Text
          footnote
          numberOfLines={2}
          style={{
            textAlign: "center",
            fontSize: font == "monospace" ? 12 : 12,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

CategoryIconSoft.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.node.isRequired,
  icon_url: PropTypes.node.isRequired,
  title: PropTypes.string,
  onPress: PropTypes.func,
};

CategoryIconSoft.defaultProps = {
  style: {},
  icon: "",
  icon_url: "",
  title: "",
  onPress: () => {},
};
