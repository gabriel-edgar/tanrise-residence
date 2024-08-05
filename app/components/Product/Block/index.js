import Icon from '@components/Icon';
import Tag from '@components/Tag';
import Text from '@components/Text';
import Image from '@components/Image';

import {BaseColor, Images, useTheme} from '@config';
import PropTypes from 'prop-types';
import {parseHexTransparency} from '@utils';

import React from 'react';
import {ImageBackground, Linking, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Loading from './Loading';
import Button from '@components/Button';

const Block = ({
  description,
  title,
  style,
  image,
  styleThumb,
  costPrice,
  salePrice,
  pict,
  images,
  price_descs,
  agent_name,
  onPress,
  subject,
  point,
  bed_room,
  land_area,
  avatar,
  publish_date,
  build_area,
  bath_room,
  email,
  isFavorite = false,
  salePercent,
  advID,
  user,
  hp_wa,
  loading = false,
  currency,
  price,
}) => {
  const {colors} = useTheme();

  const message =
    '\n Advertising ID : ' +
    `${advID}` +
    '\n Name : ' +
    Block.agent_name +
    '\n Email : ' +
    Block.email +
    '\n Phone Number : ' +
    Block.hp_wa +
    '\n Contact me for the details information.';

  if (loading) {
    return <Loading style={style} />;
  }

  // const [fotoprofil, setFotoProfil] = useState(
  //   user != null
  //     ? user.pict.replace('https', 'http')
  //     : require('../../assets/images/image-home/Main_Image.png'),
  // );

  return (
    <TouchableOpacity
      style={{
        borderColor: BaseColor.grayColor,
        borderBottomWidth: 1,
        marginVertical: 1,
      }}
      onPress={onPress}>
      {images.map((item, index) =>
        item.flag == 'Y' ? (
          <ImageBackground
            key={index}
            source={
              `${item.pict}` != null
                ? {uri: `${item.pict}`.replace('https', 'http')}
                : require('../../../assets/images/image-home/Main_Image.png')
            }
            // {
            // uri:
            //   `${item.pict}` != null
            //     ? `${item.pict}`.replace('https', 'http')
            //     : require('../../assets/images/image-home/Main_Image.png'),
            // }
            // }
            style={styles.imageBackground}>
            {/* <Icon
              name="heart"
              solid={isFavorite}
              size={24}
              color={isFavorite ? colors.primary : BaseColor.whiteColor}
              style={{position: 'absolute', top: 8, right: 8}}></Icon> */}
            {salePercent ? (
              <Tag small style={styles.salePercent}>
                {salePercent}
              </Tag>
            ) : null}
          </ImageBackground>
        ) : null,
      )}

      <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
        <Text title3 semibold>
          {subject}
        </Text>
        <Text title3 style={{marginTop: 10}}>
          {currency} {price}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Icon
            name="bath"
            size={14}
            style={{flexDirection: 'row', marginRight: 10}}>
            {bath_room}
          </Icon>
          <Icon
            name="bed"
            size={14}
            style={{flexDirection: 'row', marginRight: 10}}>
            {bed_room}
          </Icon>
          <Icon
            name="building"
            size={14}
            style={{flexDirection: 'row', marginRight: 10}}>
            {land_area}
          </Icon>
          <Icon
            name="map"
            size={14}
            style={{flexDirection: 'row', marginRight: 10}}>
            {build_area}
          </Icon>
          {/* <Icon
            name="clock"
            size={14}
            style={{
              flexDirection: 'row-reverse',
              marginRight: 60,
              color: BaseColor.grayColor,
            }}>
            {publish_date}
          </Icon> */}
        </View>
        <Text
          footnote
          grayColor
          numberOfLines={2}
          style={{
            paddingVertical: 15,
          }}>
          {description}
        </Text>

        <View style={styles.content}>
          {/* <View style={styles.right}>
            <Image source={{uri: `${avatar}`}} style={styles.thumb} />
          </View> */}
          {/* <View>
            <Text title4 semibold style={{marginTop: 5}}>
              {agent_name}
            </Text>
            <Text title4 light style={styles.contentRight}>
              {email}
            </Text>
          </View> */}

          {/* <TouchableOpacity onPress={() =>
              Linking.openURL(
                `mailto:${email}?subject=${subject}&body=Description`,
              )}
            >
          <Icon
            name="mail"
            size={14}
            style={{
              flexDirection: 'row-reverse',
              marginRight: 60,
              color: BaseColor.grayColor,
            }}/>
            </TouchableOpacity> */}

          {/* <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                `mailto:${email}?subject=${subject}&body=${message}`,
              )
            }
            style={[styles.contentRight]}>
            <View
              style={[
                styles.viewIcon,
                {
                  backgroundColor: parseHexTransparency(colors.primary, 30),
                },
              ]}>
              <Icon name="envelope" size={20} color={colors.primary} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                `whatsapp://send?text=${subject}\n${message}&phone=${hp_wa}`,
              )
            }
            style={[styles.contentRight]}>
            <View
              style={[
                styles.viewIcon,
                {
                  backgroundColor: parseHexTransparency(colors.primary, 30),
                },
              ]}>
              <Icon name="whatsapp" size={20} color={colors.primary} />
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

Block.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  currency: PropTypes.string,
  price: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  pict: PropTypes.node.isRequired,
  avatar: PropTypes.node.isRequired,
  costPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salePercent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  isFavorite: PropTypes.bool,
};

Block.defaultProps = {
  description: '',
  title: '',
  style: {},
  pict: '',
  currency: '',
  price: '',
  avatar: '',
  user: {},
  publish_date: '',
  image: Images.home,
  costPrice: '',
  salePrice: '',
  salePercent: '',
  onPress: () => {},
  isFavorite: false,
};

export default Block;
