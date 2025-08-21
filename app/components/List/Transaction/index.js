import Text from "@/components/Text";
import Icon from "@/components/Icon";
import { useTheme, BaseColor } from "@/config";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View, Pressable } from "react-native";
import styles from "./styles";
import numFormat from "../../numFormat";
import numFormattanpaRupiah from "../../numFormattanpaRupiah";
import CheckBox from "@react-native-community/checkbox";

const ListTransaction = ({
  style = {},
  icon = "",
  name = "",
  doc_no = "",
  descs = "",
  mbal_amt = "",
  trx_type = "",
  due_date = "",
  doc_date = "",
  tower = "",
  date = "",
  status = "",
  price = "",
  lot_no = "",
  debtor_acct = "",
  onPress = () => {},
  item = {},
  tab_id = 0,
  checkBoxValue = false,
  checkBoxOnValueChange = () => {},
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {/* <View style={[styles.image, {backgroundColor: colors.primaryLight}]}>
        <Icon name={icon} size={24} solid color={BaseColor.whiteColor} />
      </View> */}
      {tab_id == 1 ?<View
        style={{
          // backgroundColor:'blue',
          alignSelf: "center",
        }}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          <CheckBox
            value={checkBoxValue}
            onValueChange={()=>
              checkBoxOnValueChange()}
            disable={false}
          />
        </Pressable>
      </View>: null}
      <View style={{ flex: 0.7, marginLeft:10 }}>
        <Text subhead>{doc_no}</Text>
        <Text footnote style={{ marginTop: 5 }}>
          {tab_id == 2 ? "Paid" : "Rp " + numFormattanpaRupiah(item.mfinal_amt)}
          {/* - {debtor_acct} */}
        </Text>
      </View>
      <View style={{ flex: 1,  }}>
        <Text subhead style={{...styles.text}}>
          {doc_date}
        </Text>
        <Text footnote light style={{ ...styles.text,marginTop: 5 }}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

ListTransaction.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.string,
  name: PropTypes.string,
  descs: PropTypes.string,
  mbal_amt: PropTypes.string,
  due_date: PropTypes.string,
  doc_no: PropTypes.string,
  price: PropTypes.string,
  lot_no: PropTypes.string,
  onPress: PropTypes.func,
};

export default ListTransaction;
