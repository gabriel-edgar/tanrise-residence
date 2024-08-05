import {Icon, Image, Text} from '@components';
import {BaseColor, Images, useTheme} from '@config';
import React, {Fragment, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/core';
import {useTranslation} from 'react-i18next';
import getUser from '../../selectors/UserSelectors';
import {useSelector} from 'react-redux';

const HeaderHome = props => {
  console.log('propsnotif', props);
  const {t} = useTranslation();
  const navigation = useNavigation();

  const {colors} = useTheme();
  const {onPressRight = () => {}, style = {}, ComponentRight} = props;
  const user = useSelector(state => getUser(state));
  console.log('user di header home', user);
  return (
    <Fragment>
      {user != null ? (
        // <Text>halo</Text>
        // <View style={[styles.header, style]}>
        //   <TouchableOpacity
        //     style={{position: 'relative'}}
        //     onPress={() => navigation.navigate('Profile')}>
        //     <Image source={{uri: `${user.pict}`}} style={styles.avatar} />
        //   </TouchableOpacity>
        //   <View style={styles.contentHeader}>
        //     <Text subhead light>
        //       {t('hello')}
        //     </Text>
        //     <Text body2>{user.name}</Text>
        //   </View>

        //   {ComponentRight ? (
        //     ComponentRight
        //   ) : (
        //     <TouchableOpacity
        //       // style={{position: 'relative'}}
        //       onPress={() => navigation.navigate('Notification')}>
        //       <View style={{flexDirection: 'row'}}>
        //         <View>
        //           <Icon
        //             name={'bell'}
        //             solid
        //             size={24}
        //             color={BaseColor.grayColor}></Icon>

        //           <View
        //             style={[
        //               styles.notyHeader,
        //               {
        //                 borderColor: BaseColor.whiteColor,
        //                 backgroundColor: colors.primary,
        //               },
        //             ]}></View>
        //         </View>

        //         <Text style={{fontWeight: 'bold', fontSize: 16, marginLeft: 5}}>
        //           0
        //         </Text>
        //       </View>
        //     </TouchableOpacity>
        //   )}
        // </View>
        <View>
          {/* <Image source={Images.trip4} style={{width: '100%', height: 135}} /> */}
          <Image
            source={require('../../assets/images/logo_at_home.jpeg')}
            style={{
              height: 50,
              width: 150,
              alignItems: 'center',
              // marginHorizontal: 100,

              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          />
        </View>
      ) : (
        // <View>
        //   {/* <Image source={Images.trip4} style={{width: '100%', height: 135}} /> */}
        //   <Image
        //     source={require('../../assets/images/logo_about_us.jpg')}
        //     style={{
        //       height: 50,
        //       width: 150,
        //       alignItems: 'center',
        //       // marginHorizontal: 100,

        //       flexDirection: 'row',
        //       justifyContent: 'center',
        //       alignSelf: 'center',
        //     }}
        //   />
        // </View>

        <Text>user null, login again</Text>
      )}
    </Fragment>
  );
};

export default HeaderHome;
