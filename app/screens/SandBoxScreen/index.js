// import NotificationService from "../../service/NotificationService";
// import {
//   FlatList,
//   View,
//   Button,
//   TouchableHighlight,
//   TouchableOpacity,
//   Platform,
// } from "react-native";
// import React, { useCallback, useEffect, useState } from "react";
// import PushNotification from "react-native-push-notification";

// const NotificationRemote = () => {
//   useEffect(() => {
//     Platform.OS == "ios" ? PushNotification.requestPermissions() : null;
//   }, []);

//   const handleScheduleNotification = () => {
//     //Platform.OS == "ios" ? PushNotification.requestPermissions() : null;
//     NotificationService.scheduleNotification(
//       "Schedule Title",
//       "Schedule Message",
//       5000
//     );
//     alert("run ScheduleNotification");
//   };

//   const handleScheduleNotification2 = () => {
//     //Platform.OS == "ios" ? PushNotification.requestPermissions() : null;
//     NotificationService.scheduleNotification2();
//     alert("run ScheduleNotification2");
//   };

//   const handleStopAllNotification = () => {
//     //Platform.OS == "ios" ? PushNotification.requestPermissions() : null;
//     NotificationService.cancelAllScheduledNotifications();
//     alert("run stopAll");
//   };

//   const handleNotification1 = () => {
//     //Platform.OS == "ios" ? PushNotification.requestPermissions() : null;
//     NotificationService.localNotification1();
//     alert("run notif1");
//   };

//   const handleNotification2 = () => {
//     //Platform.OS == "ios" ? PushNotification.requestPermissions() : null;
//     NotificationService.localNotification2();
//     alert("run notif2");
//   };

//   return (
//     <View style={{ padding: 10 }}>
//       <View style={{ marginTop: 20 }}>
//         <Button
//           title="Schedule Notification"
//           onPress={handleScheduleNotification}
//         />
//       </View>
//       <View style={{ marginTop: 20 }}>
//         <Button
//           title="Schedule Notification2"
//           onPress={handleScheduleNotification2}
//         />
//       </View>
//       <View style={{ marginTop: 20 }}>
//         <Button title="Notification 1" onPress={handleNotification1} />
//       </View>

//       <View style={{ marginTop: 20 }}>
//         <Button title="Notification 2" onPress={handleNotification2} />
//       </View>
//       <View style={{ marginTop: 20 }}>
//         <Button
//           title="Stop All Notification"
//           onPress={handleStopAllNotification}
//         />
//       </View>
//     </View>
//   );
// };

// export default NotificationRemote;
