import Image from "@components/Image";
import Text from "@components/Text";
import { useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
export default function ListThumbCircleNotif(props) {
  const { colors } = useTheme();
  const {
    style,
    imageStyle,
    image,
    txtLeftTitle1,
    txtLeftTitle2,
    txtContent,
    txtRight,
    onPress,
    disabled,
  } = props;

  console.log("22 colors: ," + JSON.stringify(colors));

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.contain,
        { borderBottomWidth: 1, borderBottomColor: colors.border },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* <Image source={image} style={[styles.thumb, imageStyle]} /> */}
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.content}>
          <View style={styles.left}>
            <Text text2 semibold numberOfLines={1}>
              {txtLeftTitle1} - {txtLeftTitle2}
            </Text>
          </View>
          <View style={styles.right}>
            <Text caption2 grayColor numberOfLines={1}>
              {txtRight}
            </Text>
          </View>
        </View>
        <Text
          note
          numberOfLines={1}
          footnote
          grayColor
          style={{ paddingTop: 5 }}
        >
          {txtContent}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

ListThumbCircleNotif.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  imageStyle: PropTypes.object,
  image: PropTypes.node.isRequired,
  txtLeftTitle1: PropTypes.string,
  txtLeftTitle2: PropTypes.string,
  txtContent: PropTypes.string,
  txtRight: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

ListThumbCircleNotif.defaultProps = {
  style: {},
  imageStyle: {},
  image: "",
  txtLeftTitle1: "",
  txtLeftTitle2: "",
  txtContent: "",
  txtRight: "",
  onPress: () => {},
  disabled: false,
};
