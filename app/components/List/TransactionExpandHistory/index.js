import Text from '@components/Text';
import ListTransaction from '@components/List/Transaction';
import PropTypes from 'prop-types';
import React, {useState, Fragment} from 'react';
import {View, StyleSheet} from 'react-native';
import styles from './styles';
import {useTheme} from '@config';
import numFormat from '../../numFormat';
import TransactionHistory from '../TransactionHistory';
import {useNavigation, useRoute} from '@react-navigation/core';

const TransactionExpandHistory = ({
  style = {
    paddingTop: 5,
  },
  tradingPairTitle = '',
  tradingPairValue = '',
  priceTitle = '',
  price = '',
  name = '',
  doc_no = '',
  descs = '',
  mbal_amt = '',
  trx_type = '',
  due_date = '',
  doc_date = '',
  tower = '',
  feeTitle = '',
  feeValue = '',
  costTitle = '',
  costValue = '',
  changeTitle = '',
  changeValue = '',
  currentTitle = '',
  currentValue = '',
  debtor_acct = '',
  lot_no = '',
  mdoc_amt = '',
  entity_cd = '',
  project_no = '',
  ListTransactionProps = {
    icon: 'exchange-alt',
    name: name,
    tower: tower,
    entity_cd: entity_cd,
    project_no: project_no,
    descs: descs,
    due_date: due_date,
    doc_no: doc_no,
    mbal_amt: mbal_amt,
    mdoc_amt: mdoc_amt,
    debtor_acct: debtor_acct,
    disabled: true,
    lot_no: lot_no,
    trx_type: trx_type,
    doc_date: doc_date,
  },
  isExpandInit = false,
}) => {
  // console.log('propsss', ListTransactionProps);
  const {colors} = useTheme();
  const [isExpand, setIsExpand] = useState(isExpandInit);
  const navigation = useNavigation();

  return (
    <View style={style}>
      <TransactionHistory
        style={StyleSheet.flatten([
          {
            borderBottomWidth: 1,
            paddingBottom: 1,
            borderBottomColor: colors.background,
          },
          !isExpand && {
            borderBottomWidth: 1,
            paddingBottom: 1,
            borderBottomColor: colors.border,
          },
        ])}
        {...ListTransactionProps}
        onPress={() =>
          navigation.navigate('HistoryBilling', {...ListTransactionProps})
        }
      />
      {isExpand && (
        <View
          style={StyleSheet.flatten([
            {paddingBottom: 20},
            isExpand && {
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            },
          ])}>
          <View style={[styles.container, style.paddingTop]}>
            <View>
              <Text subhead blod style={styles.title}>
                {descs}
              </Text>
              <Text subhead thin style={styles.title}>
                {doc_date}
              </Text>
              <Text subhead thin style={styles.title}>
                {debtor_acct}
              </Text>
              <Text subhead thin style={styles.title}>
                {lot_no}
              </Text>
              <Text
                Bold
                footnote
                grayColor
                numberOfLines={2}
                style={styles.content}>
                {lot_no}
              </Text>
            </View>
            <View style={styles.viewRight}>
              <Text subhead Bold style={styles.title}>
                Total
              </Text>
              <Text headline>{mdoc_amt}</Text>
            </View>
          </View>

          {/* <View style={[styles.container, style]}>
            <View>
              <Text subhead light style={styles.title}>
                {feeTitle}
              </Text>
              <Text headline>{feeValue}</Text>
            </View>
            <View style={styles.viewRight}>
              <Text subhead light style={styles.title}>
                {costTitle}
              </Text>
              <Text headline>{costValue}</Text>
            </View>
          </View>
          <View style={[styles.container, style]}>
            <View>
              <Text subhead light style={styles.title}>
                {changeTitle}
              </Text>
              <Text headline>{changeValue}</Text>
            </View>
            <View style={styles.viewRight}>
              <Text subhead light style={styles.title}>
                {currentTitle}
              </Text>
              <Text headline>{currentValue}</Text>
            </View>
          </View> */}
        </View>
      )}
    </View>
  );
};

TransactionExpandHistory.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  tradingPairTitle: PropTypes.string,
  tradingPairValue: PropTypes.string,
  priceTitle: PropTypes.string,
  price: PropTypes.string,
  feeTitle: PropTypes.string,
  feeValue: PropTypes.string,
  costTitle: PropTypes.string,
  costValue: PropTypes.string,
  changeTitle: PropTypes.string,
  changeValue: PropTypes.string,
  currentTitle: PropTypes.string,
  currentValue: PropTypes.string,
};

export default TransactionExpandHistory;
