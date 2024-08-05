import {
  Button,
  Header,
  Icon,
  Image,
  ProductColorPicker,
  ProductSize,
  ProductSpecGrid,
  SafeAreaView,
  StarRating,
  Tag,
  Text,
} from '@components';
import {BaseColor, BaseStyle, Images, useTheme} from '@config';
import {EFilterColors, EFilterSizes} from '@data';
import * as Utils from '@utils';
import React, {useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Animated,
  I18nManager,
  ScrollView,
  Share,
  TouchableOpacity,
  View,
} from 'react-native';
import ModalProduct from './ModalProduct';
import styles from './styles';
import Swiper from 'react-native-swiper';
import {PlaceholderLine, Placeholder} from '@components';
import moment from 'moment';
import numFormat from '../../components/numFormat';

let imagesInit = [
  {
    id: 1,
    image: Images.productView,
  },
  {
    id: 2,
    image: Images.productGrid01,
  },
  {
    id: 3,
    image: Images.productGrid04,
  },
  {
    id: 4,
    image: Images.productGrid03,
  },
  {
    id: 5,
    image: Images.productGrid05,
  },
  {
    id: 6,
    image: Images.productGrid06,
  },
];

const itemInit = {
  price: 60,
  image: Images.eProduct,
  category: 'Burberry',
  rating: 4.5,
  review: 1,
  status: 'In Stock',
  salePrice: '',
  costPrice: '$70.00',
  taxStatus: 'Tax included',
  sku: 'AV01-D-32',
  style: 'High-neck',
  measurement: 'Wearing Size: 24',
  washCare: 'Machine Wash',
  fabricComposition: 'Lightweight',
  menOrWomen: 'For Men',
  season: 'Summer, Spring',
  returnsPolicy:
    "Returns and exchanges don't need to be a dreaded part of ecommerce. Here's how to write a return policy that creates a win-win situation.",
  shipping:
    'A Shipping Policy is where you let your customers know important details about how you ship your goods if your business sells goods that get shipped to your customers',
};

const EProductDetail = props => {
  const {navigation, route} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {item} = route.params;
  const [loading, setLoading] = useState(true);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [modalVisible, setModalVisible] = useState(false);
  const [eColors, setEcolors] = useState(EFilterColors);
  const [eSizes, setESizes] = useState(EFilterSizes);
  const [colorChoosed, setColorChoosed] = useState(EFilterColors[0]);
  const [sizeChoosed, setSizeChoosed] = useState(EFilterSizes[0]);
  const [isFavourite, setIsFavourtie] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const productData = {...item};
  const {
    id,
    description,
    title,
    style,
    image,
    maid_bedroom,
    styleThumb,
    costPrice,
    salePrice,
    pict,
    agent_name,
    onPress,
    point,
    bed_room,
    subject,
    floor,
    land_area,
    publish_date,
    build_area,
    property_type,
    bath_room,
    price,
    price_descs,
    status,
    certificate,
    electrical_power,
    parking,
    avatar,
    market_type,
  } = productData;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const images = [{id: 0, image: image}].concat(imagesInit);

  const goPostDetail = item => () => {
    navigation.push('PostDetail', {item: item});
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'http://pakubuwonoview.com/',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //For header background color from transparent to header color
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [BaseColor.whiteColor, colors.text],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  //For header image opacity
  const headerImageOpacity = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader - 20],
    outputRange: [1, 0],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  //artist profile image position from top
  const heightViewImg = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader],
    outputRange: [250, heightHeader],
    useNativeDriver: true,
  });

  const onSelect = indexSelected => {};

  const renderPlaceholder = () => {
    let holders = Array.from(Array(5));

    return (
      <Placeholder>
        <View style={{padding: 20}}>
          {holders.map((item, index) => (
            <PlaceholderLine key={index} width={100} />
          ))}
        </View>
      </Placeholder>
    );
  };

  const renderContent = () => {
    return (
      <View style={{paddingHorizontal: 20}}>
        <View style={styles.contentDescription}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 4,
            }}>
            <Text title3>Rp. {price_descs}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Icon
            name="bath"
            size={14}
            style={{flexDirection: 'row', marginRight: 10}}>
            {' '}
            {bath_room}
          </Icon>
          <Icon
            name="bed"
            size={14}
            style={{flexDirection: 'row', marginRight: 10}}>
            {' '}
            {bed_room}
          </Icon>
          <Icon
            name="building"
            size={14}
            style={{flexDirection: 'row', marginRight: 10}}>
            {' '}
            {land_area}
          </Icon>
          <Icon
            name="map"
            size={14}
            style={{flexDirection: 'row', marginRight: 10}}>
            {' '}
            {build_area}
          </Icon>
          <Icon
            name="clock"
            size={14}
            style={{
              flexDirection: 'row-reverse',
              marginRight: 60,
              color: BaseColor.grayColor,
            }}>
            {' '}
            {moment(publish_date).format('H:mm:ss')}
          </Icon>
        </View>
        <View>
          <Text headline style={{marginTop: 20}}>
            {t('Descriptions')}
          </Text>
          <Text
            light
            style={{
              paddingVertical: 15,
            }}>
            {description}
          </Text>
        </View>

        <Text headline style={{marginTop: 20}}>
          {t('specifications')}
        </Text>

        <View style={styles.specifications}>
          <ProductSpecGrid
            style={{flex: 1}}
            description={'Property Type'}
            title={property_type}
          />
          <ProductSpecGrid
            style={{flex: 1}}
            description={'Price'}
            title={'Rp ' + `${price}`}
          />
        </View>
        <View style={styles.specifications}>
          <ProductSpecGrid
            style={{flex: 1}}
            description={'Bed Room'}
            title={bed_room}
          />

          <ProductSpecGrid
            style={{flex: 1}}
            description={'Main Bedroom'}
            title={maid_bedroom}
          />
        </View>
        <View style={styles.specifications}>
          <ProductSpecGrid
            style={{flex: 1}}
            description={'Building Area'}
            title={build_area}
          />
          <ProductSpecGrid
            style={{flex: 1}}
            description={'Bathroom'}
            title={bath_room}
          />
        </View>
        <View style={styles.specifications}>
          <ProductSpecGrid
            style={{flex: 1}}
            description={'Landing Area'}
            title={land_area}
          />
          <ProductSpecGrid
            style={{flex: 1}}
            description={'Floor'}
            title={floor}
          />
        </View>
        <View style={styles.specifications}>
          <ProductSpecGrid
            style={{flex: 1}}
            description={'Certificate'}
            title={certificate}
          />
          <ProductSpecGrid
            style={{flex: 1}}
            description={'Status'}
            title={status}
          />
        </View>
        <View style={styles.specifications}>
          <ProductSpecGrid
            style={{flex: 1}}
            description={'Electrical Power'}
            title={electrical_power}
          />
          <ProductSpecGrid
            style={{flex: 1}}
            description={'Parking'}
            title={parking}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always', bottom: 'always'}}>
        <Header title={subject} />
        <ScrollView
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
          style={{zIndex: 10}}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {y: scrollY},
                },
              },
            ],
            {
              useNativeDriver: false,
            },
          )}>
          <View style={{height: 230 - heightHeader}} />
          <View
            style={{
              marginVertical: 10,
              paddingHorizontal: 20,
            }}>
            <Text title3 style={{marginVertical: 10, marginVertical: 4}}>
              {subject}
            </Text>
          </View>

          {loading ? renderPlaceholder() : renderContent()}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          <Button full style={{flex: 1}} onPress={() => setModalVisible(true)}>
            {t('I am Interested')}
          </Button>
        </View>
      </SafeAreaView>
      <Animated.View
        style={[
          styles.headerImageStyle,
          {
            opacity: headerImageOpacity,
            height: heightViewImg,
          },
        ]}>
        <Swiper
          dotStyle={{
            backgroundColor: BaseColor.dividerColor,
            marginBottom: 8,
          }}
          activeDotStyle={{
            marginBottom: 8,
          }}
          paginationStyle={{bottom: 0}}
          loop={false}
          activeDotColor={colors.primary}
          removeClippedSubviews={false}
          onIndexChanged={index => onSelect(index)}>
          {images.map((item, key) => {
            return (
              <TouchableOpacity
                key={key}
                style={{flex: 1}}
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('PreviewImage', {images: images})
                }>
                <Image
                  key={key}
                  style={{flex: 1, width: '100%'}}
                  source={item.image}
                />
              </TouchableOpacity>
            );
          })}
        </Swiper>

        <TouchableOpacity
          style={[
            styles.viewIcon,
            {
              backgroundColor: isFavourite
                ? BaseColor.whiteColor
                : colors.primaryLight,
              borderColor: BaseColor.whiteColor,
            },
          ]}
          onPress={() => setIsFavourtie(!isFavourite)}>
          {/* <Icon
              solid
              name="heart"
              size={20}
              color={isFavourite ? colors.primaryLight : BaseColor.whiteColor}
            /> */}
          <Text>{market_type}</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.headerStyle, {position: 'absolute'}]}>
        <SafeAreaView
          style={{width: '100%'}}
          forceInset={{top: 'always', bottom: 'never'}}>
          <Header
            title=""
            renderLeft={() => {
              return (
                <Animated.Image
                  resizeMode="contain"
                  style={[
                    styles.icon,
                    {
                      transform: [
                        {
                          scaleX: I18nManager.isRTL ? -1 : 1,
                        },
                      ],
                      tintColor: headerBackgroundColor,
                    },
                  ]}
                  source={Images.angleLeft}
                />
              );
            }}
            renderRight={() => {
              return (
                <Animated.Image
                  resizeMode="contain"
                  style={[
                    styles.icon,
                    {
                      tintColor: headerBackgroundColor,
                    },
                  ]}
                  source={Images.shareAltSolid}
                />
              );
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            onPressRight={onShare}
          />
        </SafeAreaView>
      </Animated.View>
      <ModalProduct
        colorChoosedInit={colorChoosed}
        sizeChoosedInit={sizeChoosed}
        item={productData}
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        onApply={() => {
          setModalVisible(false);
          navigation.navigate('ECart');
        }}
      />
    </View>
  );
};

export default EProductDetail;
