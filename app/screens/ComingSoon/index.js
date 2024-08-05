import {
  Button,
  Header,
  Icon,
  SafeAreaView,
  Text,
  TextInput,
  ComingSoon,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import {useTranslation} from 'react-i18next';

const ComingSoonScreen = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('Coming Soon')}
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
      <ComingSoon />
    </SafeAreaView>
  );
};

export default ComingSoonScreen;
