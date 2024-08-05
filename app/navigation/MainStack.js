import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import AboutUs from "@screens/AboutUs";
import ResetScreen from "../screens/ResetPassword";
import ChangeLanguage from "@screens/ChangeLanguage";
import ChangePassword from "@screens/ChangePassword";
import Setting from "@screens/Setting";
import ImageDetail from "@screens/ImageDetail";
import ContactUs from "@screens/ContactUs";
import ThemeSetting from "@screens/ThemeSetting";
import ProfileEdit from "@screens/ProfileEdit";
import Review from "@screens/Review";
import SelectFontOption from "@screens/SelectFontOption";
import FCategory from "@screens/FCategory";

import { BottomTabNavigatorMazi, tabBarIcon } from "./components";
import Billing from "../screens/Billing";
import AttachmentBilling from "../screens/Billing/AttachmentBilling";
import BillingHistory from "../screens/BillingHistory";
import HistoryBilling from "../screens/BillingHistory/HistoryBilling";
import PDFAttach from "../screens/Billing/PDFAttach";
import Facility from "../screens/Facility";
import Announce from "../screens/Announce";
import AnnounceDetail from "../screens/AnnouceDetail";
import PreviewImages from "../screens/AnnouceDetail/PreviewImages";
import News from "../screens/News";
import Rent from "../screens/Rent";
import EProductDetail from "../screens/EProductDetail";
import PostDetail from "../screens/PostDetail";
import MeterInfo from "../screens/MeterInfo";
import MeterInfoX from "../screens/MeterInfoX";
import Search from "../screens/Search";
import PreviewImage from "../screens/PreviewImage";
import NewsAnnounce from "../screens/NewsAnnouncement";

import SelectDarkOption from "../screens/SelectDarkOption";
import EProductPageNotFound from "../screens/EProductPageNotFound";

import ModalLocation from "../screens/Helpdesk/ModalLocation";
import Package from "../screens/Package";
import PackageDetail from "../screens/Package/PackageDetail";
import Privacy from "../screens/Privacy";
import Skip from "../screens/Skip";
import Emergency from "../screens/Emergency";

import Helpdesk from "@screens/Helpdesk";
import SpecHelpDesk from "@screens/Helpdesk/SpecHelpDesk";
import CategoryHelp from "@screens/Helpdesk/CategoryHelp";
import SelectCategory from "@screens/Helpdesk/SelectCategory";
import SubmitHelpdesk from "../screens/Helpdesk/Submit";
import StatusHelp from "../screens/Helpdesk/StatusHelp";
import ViewHistoryStatus from "../screens/Helpdesk/ViewHistoryStatus";
import ViewHistoryDetail from "../screens/Helpdesk/ViewHistoryDetail";
import PreviewImageHelpdesk from "../screens/Helpdesk/PreviewImageHelpdesk";

import HouseRoles from "../screens/HouseRoles";

import Notification from "@screens/Notification";
import NotificationDetail from "../screens/Notification/notifDetail";
import DetailFacility from "../screens/Facility/DetailFacility";
import BookingFacility from "../screens/Facility/BookingFacility";
import BookingDetail from "../screens/Facility/BookingDetail";
import FSendMoney from "../screens/FSendMoney";
import ModalProduct from "../screens/Facility/ModalProduct";
import TermsConditions from "../screens/Facility/TermsCondition";

import BookingList from "../screens/Facility/BookingList";
import BookingListDetail from "../screens/Facility/BookingListDetail";

import ChoosePartner from "../screens/Facility/ChoosePartner";
import ChooseEditPartner from "../screens/Facility/ChooseEditPartner";

import { tabBarIconHaveNoty } from "./components";
import ScreenSignature from "../screens/Helpdesk/ScreenSignature";
import Store from "../screens/Store";
import EProduct from "../screens/EProduct";
import ECart from "../screens/ECart";
import EShipping from "../screens/EShipping";
import EPayment from "../screens/EPayment";
import EConfirmed from "../screens/EConfirmed";
import EMyOrder from "../screens/EMyOrder";

import EProductDetailStore from "../screens/EProductDetailStore";
import PreviewImageHome from "../screens/Home/PreviewImageHome";
import AnnounceDetailHome from "../screens/AnnouceDetailHome";
import PreviewImagesAnnounceHome from "../screens/AnnouceDetailHome/PreviewImagesAnnounceHome";
import PinchZoom from "../screens/Home/PinchZoom";

import ComingSoon from "../screens/ComingSoon";
import EventResto from "../screens/EventResto";
import ClubFacilities from "../screens/ClubFacilities";

import ItemStore from "../screens/Store/ItemStore";
import CartStore from "../screens/Store/CartStore";
import DeliveryAndPayment from "../screens/Store/DeliveryAndPayment";
import RiwayatPesanan from "../screens/Store/RiawayatPesanan";
import FChooseFriend from "../screens/FChooseFriend";
import Troffice from "../screens/Troffice";
import SpecTroffice from "../screens/Troffice/SpecTroffice";
import SpecTrofficeHouse from "../screens/Troffice/SpecTrofficeHouse";
import SpecTrofficeWaterHeater from "../screens/Troffice/SpecTrofficeWaterHeater";
import StatusHelpTROffice from "../screens/Troffice/StatusHelpTROffice";
import StatusHelpHouse from "../screens/Troffice/StatusHelpHouse";
import StatusHelpHouseNeo from "../screens/Troffice/StatusHelpHouseNeo";
import ViewHistoryDetailTRO from "../screens/Troffice/ViewHistoryDetailTRO";
import ViewHistoryStatusTRO from "../screens/Troffice/ViewHistoryStatusTRO";
import SeatBooking from "../screens/Troffice/SeatBooking";
import SeatBokings from "../screens/Troffice/SeatBokings";
import SeatBokingsWaterHeater from "../screens/Troffice/SeatBokingsWaterHeater";
import ScreenSignatureTRO from "../screens/Troffice/ScreenSignatureTRO";
import SelectType from "../screens/Troffice/SelectType";
import SpecTrofficeUnitCleaning from "../screens/Troffice/HouseKeeping/SpecTrofficeUnitCleaning";
import PriceList from "../screens/Troffice/HouseKeeping/PriceList";
import TermsCondition from "../screens/Troffice/HouseKeeping/TermsCondition";
import SeatBokingsPest from "../screens/Troffice/PestControl/SeatBokingsPest";
import SpecTrofficePestControl from "../screens/Troffice/PestControl/SpecTrofficePestControl";
import PriceListPest from "../screens/Troffice/PestControl/PriceListPest";
import PDFAttachStore from "../screens/Store/RiawayatPesanan/PDFAttachStore";

import TableBeforeSignatureWO from "../screens/Helpdesk/TableBeforeSignatureWO";
import TableAfterSignatureWO from "../screens/Helpdesk/TableAfterSignatureWO";

import LegalManagement from "@screens/LegalManagement";
import RenovationPermit from "@screens/LegalManagement/Renovation";
import FitOut from "@screens/LegalManagement/FitOut";
import EntryExit from "@screens/LegalManagement/EntryExit";
import FormPermitRenovation from "@screens/LegalManagement/Renovation/Form";
import FormPermitFitOut from "@screens/LegalManagement/FitOut/Form";
import FormPermitEntryExit from "@screens/LegalManagement/EntryExit/Form";
import TenantInformation from "@screens/LegalManagement/FitOut/Form/TenantInformation";
import TrackPermit from "@screens/LegalManagement/FitOut/Permit";
import ContractorPermit from "@screens/LegalManagement/Renovation/Form/Contract";
import TrackPermitRenov from "@screens/LegalManagement/Renovation/Permit";
import ContractorPermitExit from "@screens/LegalManagement/EntryExit/Form/Contract";
import TrackExitEntry from "@screens/LegalManagement/EntryExit/Permit";
import AttachExitEntry from "@screens/LegalManagement/EntryExit/Permit/PDFAttach";
import AttachFitOut from "@screens/LegalManagement/FitOut/Permit/PDFAttach";
import AttachRenov from "@screens/LegalManagement/Renovation/Permit/PDFAttach";

import SuratIzinKerja from "@screens/LegalManagement/SuratIzinKerja";
import SuratIzinKeluarMasukBarang from "@screens/LegalManagement/SuratIzinKeluarMasukBarang";

const Stack = createStackNavigator();

export const WalletTabScreens = {
  HomeScreen: {
    component: HomeScreen,
    options: {
      title: "home",
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: "home" }),
    },
  },
  EmegerncyScreen: {
    component: Emergency,
    options: {
      title: "Emergency",
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: "phone" }),
    },
  },
  NotificationScreen: {
    component: Notification,
    options: {
      title: "Notification",
      tabBarIcon: ({ color }) => tabBarIconHaveNoty({ color, name: "bell" }),
    },
  },
  ProfileScreen: {
    component: ProfileScreen,
    options: {
      title: "account",
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: "cog" }),
    },
  },
};

export const WalletMenu = () => (
  <BottomTabNavigatorMazi tabScreens={WalletTabScreens} />
);

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={WalletMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
        creenOptions={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Skip"
        component={Skip}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Package"
        component={Package}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangeLanguage"
        component={ChangeLanguage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ImageDetail"
        component={ImageDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ThemeSetting"
        component={ThemeSetting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Review"
        component={Review}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SelectFontOption"
        component={SelectFontOption}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FCategory"
        component={FCategory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Billing"
        component={Billing}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Helpdesk"
        component={Helpdesk}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SpecHelpDesk"
        component={SpecHelpDesk}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SelectCategory"
        component={SelectCategory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ModalLocation"
        component={ModalLocation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategoryHelp"
        component={CategoryHelp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SubmitHelpdesk"
        component={SubmitHelpdesk}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StatusHelp"
        component={StatusHelp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewHistoryStatus"
        component={ViewHistoryStatus}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewHistoryDetail"
        component={ViewHistoryDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PreviewImageHelpdesk"
        component={PreviewImageHelpdesk}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MeterInfo"
        component={MeterInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MeterInfoX"
        component={MeterInfoX}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Facility"
        component={Facility}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ModalProduct"
        component={ModalProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FSendMoney"
        component={FSendMoney}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailFacility"
        component={DetailFacility}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookingFacility"
        component={BookingFacility}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookingDetail"
        component={BookingDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Announce"
        component={Announce}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="News"
        component={News}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Rent"
        component={Rent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EProductDetail"
        component={EProductDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AnnouceDetail"
        component={AnnounceDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PreviewImage"
        component={PreviewImage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SelectDarkOption"
        component={SelectDarkOption}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HouseRoles"
        component={HouseRoles}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotificationDetail"
        component={NotificationDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookingList"
        component={BookingList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookingListDetail"
        component={BookingListDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChoosePartner"
        component={ChoosePartner}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChooseEditPartner"
        component={ChooseEditPartner}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsConditions"
        component={TermsConditions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PackageDetail"
        component={PackageDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PreviewImages"
        component={PreviewImages}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AttachmentBilling"
        component={AttachmentBilling}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PDFAttach"
        component={PDFAttach}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BillingHistory"
        component={BillingHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HistoryBilling"
        component={HistoryBilling}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScreenSignature"
        component={ScreenSignature}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Store"
        component={Store}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EProduct"
        component={EProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ECart"
        component={ECart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EMyOrder"
        component={EMyOrder}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EShipping"
        component={EShipping}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EPayment"
        component={EPayment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EConfirmed"
        component={EConfirmed}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EProductDetailStore"
        component={EProductDetailStore}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewsAnnounce"
        component={NewsAnnounce}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PreviewImageHome"
        component={PreviewImageHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AnnounceDetailHome"
        component={AnnounceDetailHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PreviewImagesAnnounceHome"
        component={PreviewImagesAnnounceHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PinchZoom"
        component={PinchZoom}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ComingSoon"
        component={ComingSoon}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventResto"
        component={EventResto}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClubFacilities"
        component={ClubFacilities}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ItemStore"
        component={ItemStore}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CartStore"
        component={CartStore}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeliveryAndPayment"
        component={DeliveryAndPayment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RiwayatPesanan"
        component={RiwayatPesanan}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FChooseFriend"
        component={FChooseFriend}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TROffice"
        component={Troffice}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SpecTroffice"
        component={SpecTroffice}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SelectType"
        component={SelectType}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SeatBooking"
        component={SeatBooking}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SeatBokings"
        component={SeatBokings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SeatBokingsWaterHeater"
        component={SeatBokingsWaterHeater}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SpecTrofficeWaterHeater"
        component={SpecTrofficeWaterHeater}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SpecTrofficeUnitCleaning"
        component={SpecTrofficeUnitCleaning}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StatusHelpTROffice"
        component={StatusHelpTROffice}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StatusHelpHouse"
        component={StatusHelpHouse}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StatusHelpHouseNeo"
        component={StatusHelpHouseNeo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewHistoryStatusTRO"
        component={ViewHistoryStatusTRO}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewHistoryDetailTRO"
        component={ViewHistoryDetailTRO}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScreenSignatureTRO"
        component={ScreenSignatureTRO}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SpecTrofficeHouse"
        component={SpecTrofficeHouse}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PriceList"
        component={PriceList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsCondition"
        component={TermsCondition}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SeatBokingsPest"
        component={SeatBokingsPest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SpecTrofficePestControl"
        component={SpecTrofficePestControl}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PriceListPest"
        component={PriceListPest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PDFAttachStore"
        component={PDFAttachStore}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TableBeforeSignatureWO"
        component={TableBeforeSignatureWO}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TableAfterSignatureWO"
        component={TableAfterSignatureWO}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LegalManagement"
        component={LegalManagement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RenovationPermit"
        component={RenovationPermit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FitOut"
        component={FitOut}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EntryExit"
        component={EntryExit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SuratIzinKerja"
        component={SuratIzinKerja}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SuratIzinKeluarMasukBarang"
        component={SuratIzinKeluarMasukBarang}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FormPermitRenovation"
        component={FormPermitRenovation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FormPermitFitOut"
        component={FormPermitFitOut}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TenantInformation"
        component={TenantInformation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TrackPermit"
        component={TrackPermit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContractorPermit"
        component={ContractorPermit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TrackPermitRenov"
        component={TrackPermitRenov}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FormPermitEntryExit"
        component={FormPermitEntryExit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContractorPermitExit"
        component={ContractorPermitExit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TrackExitEntry"
        component={TrackExitEntry}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AttachExitEntry"
        component={AttachExitEntry}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AttachFitOut"
        component={AttachFitOut}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AttachRenov"
        component={AttachRenov}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
