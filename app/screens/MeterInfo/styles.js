import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 0,
    },
    header: {
        paddingTop: 10,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
        paddingHorizontal: 20,
    },
    contentHeader: { paddingLeft: 8, flex: 1 },
    notyHeader: {
        position: "absolute",
        width: 10,
        height: 10,
        borderWidth: 1,
        borderRadius: 5,
        right: 0,
    },
    avatar: {
        height: 36,
        width: 36,
        borderRadius: 18,
    },
    titleList: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 10,
    },
    headerCard: {
        borderRadius: 10,
        height: 108,
        width: "100%",
        marginVertical: 15,
        backgroundColor: BaseColor.fieldColor,
        justifyContent: "center",
        padding: 15,
    },
    headerCardPrimary: {
        justifyContent: "center",
        alignItems: "center",
    },
    headerCardCenter: {
        backgroundColor: "transparent",
        alignItems: "center",
        height: "auto",
        marginVertical: 0,
    },
    paddingContent: {
        flex: 1,
        paddingHorizontal: 20,
    },
    contentPickDate: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        borderRadius: 8,
        backgroundColor: BaseColor.fieldColor,
        padding: 10,
    },
    itemPick: {
        flex: 1,
        justifyContent: "center",
    },
    linePick: {
        width: 1,
        backgroundColor: BaseColor.dividerColor,
        marginRight: 10,
    },
    total: {
        flex:1,
        borderRadius: 8,
        backgroundColor: BaseColor.fieldColor,
        padding: 10,
        marginRight: 15,
    },
    duration: {
        flex: 4,
        borderRadius: 8,
        backgroundColor: BaseColor.fieldColor,
        padding: 10,
    },
    contentQuest: {
        marginTop: 15,
        flexDirection: "row",
        marginBottom: 15,
    },
    contentModal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    contentCalendar: {
        borderRadius: 8,
        width: "100%",
        backgroundColor: "white",
    },
    contentActionCalendar: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    lineRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 20,
    },
    iconRight: {
        width: 100,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    contentFilterBottom: {
        width: "100%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 20,
        backgroundColor: BaseColor.whiteColor,
    },
    contentSwipeDown: {
        paddingTop: 10,
        alignItems: "center",
    },
    lineSwipeDown: {
        width: 30,
        height: 2.5,
        backgroundColor: BaseColor.dividerColor,
    },
    contentActionModalBottom: {
        flexDirection: "row",
        paddingVertical: 10,
        marginBottom: 10,
        justifyContent: "space-between",
        borderBottomColor: BaseColor.dividerColor,
        borderBottomWidth: 1,
    },
    Dropdown1: {
        // fontFamily: Fonts.type.sfuiDisplaySemibold,
        borderBottomWidth: 0,
        borderColor: '#DDD',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 18,
        width: 250,
        marginBottom: 10,
        marginLeft: 10,
        borderRadius: 5,
        textAlignVertical: 'top',
        color:'#777777',
        // paddingLeft: Fonts.moderateScale(10),
      },
      wrap: {
        marginHorizontal: 10,
        marginTop: 16,
        flex: 1,
      },
      subWrap: {
        marginVertical: 10,
      },
      subWrapTab: {
        marginVertical: 5,
      },
      subWrap2: {
        marginVertical: 10,
      },
      title: {
        fontSize: 25,
        fontFamily: 'Montserrat-SemiBold',
        color: '#333',
      },
      subTitle: {
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold',
        color: '#4E4E4E',
      },
      subTitle2: {
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        color: '#4E4E4E',
        marginTop: 15
      },
    
      card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    }

});
