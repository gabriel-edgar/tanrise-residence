import {Button, Header, Icon, SafeAreaView, TextInput, Text} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';
import {API_URL_LOKAL} from '@env';
const successInit = {
  email: true,
};
const ResetPassword = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(successInit);
  const [requiredEmail, setRequiredEmail] = useState(true);
  const [Alert_Visibility, setAlertVisibility] = useState(false);
  const [pesan, setPesan] = useState('');
  const [error, setError] = useState();

  const onReset = () => {
    if (email == '') {
      setSuccess({
        ...success,
        email: false,
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('SignIn');
      }, 500);
    }
  };

  const btnSend = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // const isValid = setRequiredEmail(true);
    // const isValid = validating({
    //   email: {require: true},
    // });
    // console.log('isvalid?', isValid);
    if (email != '') {
      if (reg.test(email) === true) {
        const emails = email;
        console.log('email', emails);
        fetch(API_URL_LOKAL + '/tenant-resetpass', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email}),
        })
          .then(response => response.json())
          .then(res => {
            // const resp = JSON.parse(res.Data);
            console.log('res forgot pass', res);
            setError(res.Error);
            if (!res.Error) {
              setLoading(true);
              const pesan = res.Pesan;
              alertFillBlank(true, pesan);
            } else if (res.Error) {
              setLoading(true);
              const pesan = res.Pesan;
              alertFillBlank(true, pesan);
              console.log('res pesan', res.Pesan);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        setLoading(true);
        // alert('Email not valid');
        const pesan = 'Email not valid';
        alertFillBlank(true, pesan);
      }
    } else {
      setLoading(true);
      // alert('Input email');
      const pesan = 'Input email please';
      alertFillBlank(true, pesan);
    }
  };

  const alertFillBlank = (visible, pesan) => {
    setAlertVisibility(visible);
    setPesan(pesan);
    setLoading(false);
  };

  const onCloseModal = () => {
    if (error == false) {
      setAlertVisibility(false);
      navigation.navigate('SignIn');
    } else {
      setAlertVisibility(false);
    }
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('reset_password')}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            padding: 20,
            width: '100%',
          }}>
          <TextInput
            style={[BaseStyle.textInput, {marginTop: 65}]}
            onChangeText={text => setEmail(text)}
            onFocus={() => {
              setSuccess({
                ...success,
                email: true,
              });
            }}
            autoCorrect={false}
            placeholder={t('email_address')}
            placeholderTextColor={
              success.email ? BaseColor.grayColor : colors.primary
            }
            value={email}
            selectionColor={colors.primary}
          />
          <View style={{width: '100%'}}>
            <Button
              full
              style={{marginTop: 20}}
              onPress={() => {
                // onReset();
                btnSend();
              }}
              loading={loading}>
              {t('reset_password')}
            </Button>
          </View>
        </View>
      </ScrollView>
      <View>
        <Modal
          isVisible={Alert_Visibility}
          style={{height: '100%'}}
          onBackdropPress={() => setAlertVisibility(false)}>
          <View
            style={{
              // flex: 1,

              // alignContent: 'center',
              padding: 10,
              backgroundColor: '#fff',
              // height: ,
              borderRadius: 8,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: colors.primary,
                  marginBottom: 10,
                }}>
                {'Alert'}
              </Text>
              <Text>{pesan}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <Button
                style={{
                  marginTop: 10,
                  // marginBottom: 10,

                  width: 70,
                  height: 40,
                }}
                onPress={() => onCloseModal()}>
                <Text style={{fontSize: 13}}>{t('OK')}</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;
