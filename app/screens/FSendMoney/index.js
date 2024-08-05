import {
  Button,
  Header,
  Icon,
  ProfileGridSmall,
  SafeAreaView,
  Tag,
  Text,
  TextInput,
  TextInputMoney,
} from '@components';
import {BaseColor, BaseStyle, Typography, useTheme} from '@config';
import {FRecentTransactions} from '@data';
import LabelUpper2Row from '@components/Label/Upper2Row';

import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Keyboard, View} from 'react-native';

const FBank = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [memo, setMemo] = useState('');
  const [add, setAdd] = useState(false);
  const item = FRecentTransactions[1];
  const [money, setMoney] = useState(32000);

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('transfer_amount')}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.text}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack('ModalProduct');
        }}
      />

      <View style={{paddingHorizontal: 20, alignItems: 'center', flex: 1}}>
        <ProfileGridSmall
          style={{marginVertical: 20}}
          image={item.image}
          name={item.name}
          onPress={() => navigation.navigate('FChooseFriend')}
        />
        <Text body2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          tristique urna diam. Nunc dolor risus, consequat sit amet dui quis,
          euismod rutrum ipsum. Integer finibus magna imperdiet urna iaculis
          dignissim.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            marginTop: 20,
            paddingHorizontal: 10,
          }}>
          <LabelUpper2Row
            style={{flex: 1}}
            label={t('Specialist')}
            value="Ball Bay"
          />
          <LabelUpper2Row
            style={{flex: 1}}
            label={t('Available')}
            value="Duration 1 hour"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            marginTop: 20,
            paddingHorizontal: 10,
          }}>
          <LabelUpper2Row
            style={{flex: 1}}
            label={t('Order Time')}
            value="2020-12-08"
          />
          <LabelUpper2Row
            style={{flex: 1}}
            label={t('Time')}
            value="09:00 - 10:00"
          />
        </View>
        <Button
          full
          style={{marginTop: 20}}
          onPress={() => navigation.navigate('FConfirmation')}>
          {t('Choose')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default FBank;
