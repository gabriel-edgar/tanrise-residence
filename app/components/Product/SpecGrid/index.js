import Text from "@components/Text";
import { useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";

const SpecGrid = ({ style, description, title }) => {
  const { colors } = useTheme();
  return (
    <View style={style}>
      <Text caption1 grayColor>
        {description}
      </Text>
      <Text body1 style={{ marginTop: 4 }}>
        {title}
      </Text>
    </View>
  );
};

SpecGrid.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  description: PropTypes.string,
  title: PropTypes.string,
};

SpecGrid.defaultProps = {
  style: {},
  title: "",
  description: "",
};

export default SpecGrid;
