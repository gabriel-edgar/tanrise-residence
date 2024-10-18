import Icon from "@components/Icon";
import Text from "@components/Text";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Loading from "./Loading";
import { useSelector } from "react-redux";

const CategoryBoxColor = (props) => {
  const { title, icon, color, style, onPress, loading } = props;

  const stateReduxHelpdeskDot = useSelector(
    (state) => state.Dataproject.helpdesk_dot
  );

  if (loading) {
    return <Loading style={style} />;
  }

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View
        style={[
          styles.imageBackground,
          {
            backgroundColor: color,
          },
        ]}
        borderRadius={8}
      >
        {title == "Status" ? (
          stateReduxHelpdeskDot ? (
            <View
              style={{
                borderWidth: 1,
                borderColor: "white",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                width: 20,
                height: 20,
                backgroundColor: "red",
                top: -5,
                right: -5,
                borderRadius: 10,
              }}
            >
              {/* <Text whiteColor caption2>
            {finalCount < 0 ? 0 : finalCount}
          </Text> */}
            </View>
          ) : null
        ) : null}
        <View style={styles.viewIcon}>
          <Icon name={icon} size={18} style={styles.icon} />
        </View>
        <Text whiteColor bold style={styles.title}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

CategoryBoxColor.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
};

CategoryBoxColor.defaultProps = {
  onPress: () => {},
  style: {},
  title: "",
  icon: "book",
  color: "#FF8A65",
};

export default CategoryBoxColor;
