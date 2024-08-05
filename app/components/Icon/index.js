import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconPro from "react-native-vector-icons/FontAwesome5Pro";
import styles from "./styles";

// icon pro is not obtained

export default function Index(props) {
  const { style, enableRTL, ...rest } = props;
  const layoutStyle = enableRTL ? styles.styleRTL : {};

  if (
    //rest.name != "phone-office"
    true
  ) {
    return <Icon style={StyleSheet.flatten([style, layoutStyle])} {...rest} />;
  } else {
    return (
      <IconPro style={StyleSheet.flatten([style, layoutStyle])} {...rest} />
    );
  }
}

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  enableRTL: PropTypes.bool,
};

Index.defaultProps = {
  style: {},
  enableRTL: false,
};
