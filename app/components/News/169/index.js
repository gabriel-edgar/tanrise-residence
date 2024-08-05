import ProfileAuthor from "@components/Profile/Author";
import Text from "@components/Text";
import { Images } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import styles from "./styles";
import Loading from "./Loading";

const News169 = (props) => {
  const { name, description, title, style, image, avatar, onPress, loading } = props;

  if (loading) {
    return <Loading style={style}/>;
  }

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <ImageBackground
        source={image}
        style={styles.imageBackground}
        borderRadius={8}
      />
      <ProfileAuthor image={avatar} name={name} description={description} />
      <Text title3 semibold>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

News169.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  avatar: PropTypes.node.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
};

News169.defaultProps = {
  style: {},
  image: Images.news,
  avatar: Images.profile2,
  name: "",
  description: "",
  title: "",
  onPress: () => {},
};

export default News169;
