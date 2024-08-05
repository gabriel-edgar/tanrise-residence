import CounterSelectCheckout from '@components/Form/CounterSelectCheckout';
import Text from '@components/Text';
import {BaseColor, Images, useTheme} from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Loading from './Loading';

const Checkout = ({
  description,
  title,
  style,
  image,
  salePrice,
  onPress,
  secondDescription,
  onDelete,
  onChange,
  loading = false,
  CurrentValue,
}) => {
  const {colors} = useTheme();

  // console.log('current value', CurrentValue);

  if (loading) {
    return <Loading style={style} />;
  }

  return (
    <View style={[styles.contain, style]} activeOpacity={0.9}>
      <TouchableOpacity onPress={onPress}>
        <ImageBackground
          // source={image}
          source={
            image
            // require('@assets/images/logo.png')
          }
          style={styles.imageBackgroundCard1}
          imageStyle={{borderRadius: 8}}
        />
      </TouchableOpacity>
      <View style={{flex: 1, paddingVertical: 4}}>
        <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
          <View style={{flex: 1, paddingBottom: 4}}>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={onPress}>
                <Text headline>{title}</Text>
              </TouchableOpacity>
              <Text footnote grayColor style={{marginTop: 4}}>
                {description}
              </Text>
            </View>
            <Text title3 semibold>
              {salePrice}
            </Text>
          </View>
          {/* <View>
            <CounterSelectCheckout
              style={{
                padding: 0,
                justifyContent: 'center',
              }}
              onChange={onChange}
              CurrentValue={CurrentValue}
            />
          </View> */}
        </View>

        {/* <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <Text footnote grayColor>
            Tax excluded {Math.round(secondDescription * 100) / 100}%
            
           
          </Text>
          <TouchableOpacity onPress={onDelete}>
            <Text footnote accentColor>
              Delete
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

Checkout.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  salePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  CurrentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  onDelete: PropTypes.func,
  onChange: PropTypes.func,
};

Checkout.defaultProps = {
  description: '',
  title: '',
  style: {},
  image: Images.eProduct,
  salePrice: '',
  CurrentValue: '',
  onPress: () => {},
  onDelete: () => {},
  onChange: () => {},
};

export default Checkout;
