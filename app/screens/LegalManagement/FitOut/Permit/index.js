import {
  Header,
  Icon,
  ListTextButton,
  SafeAreaView,
  Tag,
  Image,
  Text,
  Button,
  CategoryGrid,
  CategoryBoxColor,
  ModalFilterLocation,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import {CheckBox} from 'react-native-elements';
import {FFriends} from '@data';
import {useNavigation} from '@react-navigation/native';
import {haveChildren} from '@utils';
import React, {useEffect, useState, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';

export default function TrackPermit() {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const [isExpanded, setExpanded] = useState(false);

  const handlePress = () => {
    // Toggle the expansion state
    setExpanded(!isExpanded);
  };

  const trackingData = [
    {id: 1, status: 'Order placed', date: '2023-09-25 10:00:00'},
    {id: 2, status: 'Processing', date: '2023-09-25 12:00:00'},
    {id: 3, status: 'Out for delivery', date: '2023-09-25 15:00:00'},
    {id: 4, status: 'Delivered', date: '2023-09-25 18:00:00'},
  ];
  console.log('trackingData ', trackingData);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={require('@assets/images/mypermit.png')}
          style={{
            height: 100,
            width: 100,
            // marginHorizontal: 100,
            // flexDirection: 'row',
            resizeMode: 'contain',
            // alignSelf: 'center',
          }}
        />
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
            My Permit
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '100',
              textAlign: 'center',
              flexWrap: 'wrap',
            }}>
            Track your permission request letter
          </Text>
        </View>

        <ScrollView
          style={{
            marginTop: 20,
            paddingHorizontal: 10,
            paddingVertical: 10
          }}>


          <TouchableOpacity
            style={
              Platform.OS === 'ios'
                ? styles.buttonPermitTopIos
                : styles.buttonPermitTop
            }
            onPress={handlePress}>
            {/* onPress={() => navigation.navigate('RenovationPermit')}> */}
            <View style={{padding: 5}}>
              <View
                style={{
                flexDirection: 'row', 
                justifyContent: 'space-between'
                }}>
                <View style={styles.contentTop}>
                  <Text style={{fontSize: 16, fontWeight: '400'}}>
                    Fitout#: 1290
                  </Text>
                  <Text style={{fontSize: 14, fontWeight: '300'}}>
                    Monday, 2 October 2023
                  </Text>
                </View>
                <Image
                  source={require('@assets/images/requested.png')}
                  style={{
                    height: 70,
                    width: 70,
                    // marginHorizontal: 100,
                    // flexDirection: 'row',
                    resizeMode: 'contain',
                    // alignSelf: 'center',
                  }}
                />
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{fontSize: 14, fontWeight: '500', color: '#315447'}}>
                  Completed
                </Text>
                <Text style={{fontSize: 14, fontWeight: '300'}}>
                  Renaldy Mukriyanto
                </Text>
              </View>
            </View>
            <View style={styles.lineStyle} />
            {isExpanded && (
              <View style={styles.additionalContent}>
                {/* Additional content goes here */}
                <Text style={{fontSize: 14, fontWeight: '500'}}>
                  Track Request
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <View
                      style={{
                        width: '50%',
                        alignItems: 'center',
                        padding: 50
                      }}>
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 15,
                          backgroundColor: '#315447',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#fff'}}>1</Text>
                      </View>
                      <View
                        style={{
                          width: 6,
                          height: 140,
                          backgroundColor: '#315447',
                        }}></View>
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 15,
                          backgroundColor: '#315447',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#fff'}}>2</Text>
                      </View>
                      <View
                        style={{
                          width: 6,
                          height: 140,
                          backgroundColor: '#315447',
                        }}></View>
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 15,
                          backgroundColor: '#315447',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#fff'}}>3</Text>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        padding: 50,
                        position: 'absolute',
                        top: 0,
                      }}>
                      {/* <View
                      style={{
                        width: 6,
                        height: progress1,
                        marginTop: 30,
                        backgroundColor: '#315447',
                      }}></View>

                    <View
                      style={{
                        width: 6,
                        height: progress2,
                        marginTop: 30,
                        backgroundColor: '#315447',
                      }}></View>

                    <View
                      style={{
                        width: 6,
                        height: progress3,
                        marginTop: 30,
                        backgroundColor: '#315447',
                      }}></View> */}
                    </View>
                  </View>

                  <View style={{
                        // borderWidth: 1,
                        // borderColor: 'red', 
                        alignItems: 'center',
                        flex: 2,
                        width: '100%',
                        alignItems: 'center'
                        }}>

                    <View
                      style={{
                        paddingTop: 60,
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 60,
                        // borderWidth: 1,
                        // borderColor: 'red',
                      }}>
                      <Text style={{fontSize: 14, fontWeight: '500', textAlign: 'center'}}>
                        Request Placed
                      </Text>
                      <Text style={{color: '#000', flexWrap: 'wrap', textAlign: 'center'}}>
                        We have received your order on 02/10/2023
                      </Text>
                    </View>

                    <View
                      style={{
                        paddingTop: 60,
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 60,
                        // borderWidth: 1,
                        // borderColor: 'red',
                      }}>
                      <Text style={{fontSize: 14, fontWeight: '500', textAlign: 'center'}}>
                        Request Confirmed
                      </Text>
                      <Text style={{color: '#000', flexWrap: 'wrap', textAlign: 'center'}}>
                        We have received your order on 02/10/2023
                      </Text>
                    </View>

                    <View
                      style={{
                        paddingTop: 50,
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 60,
                        // borderWidth: 1,
                        // borderColor: 'red',
                      }}>
                      <Text style={{color: '#315447', fontSize: 14, fontWeight: '500', textAlign: 'center'}}>
                        Request Approved
                      </Text>
                      <Text style={{color: '#315447', flexWrap: 'wrap', textAlign: 'center'}}>
                        We have received your order on 02/10/2023
                      </Text>
                    </View>

                  </View>
                </View>
                <View style={{marginHorizontal: 70, alignItems: 'center'}}>
                      <TouchableOpacity style={styles.buttonAttach} onPress={() => navigation.navigate('AttachFitOut')}>
                        <Text style={styles.fontAttach}>
                          Letter of Permit
                        </Text>
                      </TouchableOpacity>
                </View>
              </View>
            )}
          </TouchableOpacity>


          <TouchableOpacity
            style={
              Platform.OS === 'ios'
                ? styles.buttonPermitMidIos
                : styles.buttonPermitMid
            }
            // onPress={() => navigation.navigate('RenovationPermit')}
            >
            <View style={{padding: 5}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.contentTop}>
                  <Text style={{fontSize: 16, fontWeight: '400'}}>
                    Fitout#: 1291
                  </Text>
                  <Text style={{fontSize: 14, fontWeight: '300'}}>
                    Monday, 3 October 2023
                  </Text>
                </View>
                <Image
                  source={require('@assets/images/requested.png')}
                  style={{
                    height: 70,
                    width: 70,
                    // marginHorizontal: 100,
                    // flexDirection: 'row',
                    resizeMode: 'contain',
                    // alignSelf: 'center',
                  }}
                />
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{fontSize: 14, fontWeight: '500', color: '#315447'}}>
                  Requested
                </Text>
                <Text style={{fontSize: 14, fontWeight: '300'}}>
                  Renaldy Mukriyanto
                </Text>
              </View>
            </View>
            <View style={styles.lineStyle} />
          </TouchableOpacity>


          <TouchableOpacity
            style={
              Platform.OS === 'ios'
                ? styles.buttonPermitBottomIos
                : styles.buttonPermitBottom
            }
            // onPress={() => navigation.navigate('RenovationPermit')}
            >
            <View style={{padding: 5}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.contentTop}>
                  <Text style={{fontSize: 16, fontWeight: '400'}}>
                    Fitout#: 1292
                  </Text>
                  <Text style={{fontSize: 14, fontWeight: '300'}}>
                    Monday, 3 October 2023
                  </Text>
                </View>
                <Image
                  source={require('@assets/images/requested.png')}
                  style={{
                    height: 70,
                    width: 70,
                    // marginHorizontal: 100,
                    // flexDirection: 'row',
                    resizeMode: 'contain',
                    // alignSelf: 'center',
                  }}
                />
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{fontSize: 14, fontWeight: '500', color: '#315447'}}>
                  Requested
                </Text>
                <Text style={{fontSize: 14, fontWeight: '300'}}>
                  Renaldy Mukriyanto
                </Text>
              </View>
            </View>
            <View style={styles.lineStyle} />
          </TouchableOpacity>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
