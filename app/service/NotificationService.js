// // NotificationService.js
// import PushNotification from "react-native-push-notification";

// const NotificationService = {
//   configure: () => {
//     PushNotification.configure({
//       onNotification: function (notification) {
//         console.log("888 NOTIFICATION: ", notification);
//       },
//       requestPermissions: true,
//     });
//   },

//   // Function to trigger a local notification
//   showLocalNotification: () => {
//     PushNotification.localNotification({
//       /* Android Only Properties */
//       channelId: "your-channel-id", // (required for Android) channel ID
//       id: 1, // (optional) Valid unique ID
//       autoCancel: true, // (optional) remove notification from notification tray after user taps it

//       /* iOS and Android properties */
//       title: "Hello", // (optional)
//       message: "This is a local notification", // (required)
//       playSound: true, // (optional) default: true
//       soundName: "default", // (optional) Sound to play when the notification is displayed
//     });
//   },

//   localNotification1: () => {
//     PushNotification.localNotification({
//       channelId: "default-channel-id", // For the default channel
//       title: "Regular Notification",
//       message: "This is a notification from the default channel.",
//     });
//   },

//   localNotification2: () => {
//     PushNotification.localNotification({
//       channelId: "high-priority-channel-id", // For the high priority channel
//       title: "High Priority Notification",
//       message: "This is a notification from the high priority channel.",
//     });
//   },

//   scheduleNotification: (title, message, interval) => {
//     const notificationDate = new Date(Date.now() + interval);
//     PushNotification.localNotificationSchedule({
//       // (optional) channelId, if the device is Android 8.0 or higher
//       channelId: "default-channel-id",
//       title: title,
//       message: message,
//       // Repeat every interval
//       repeatType: "time",
//       repeatTime: interval, // in milliseconds
//       date: notificationDate,
//       // You can also set other options here, such as smallIcon, largeIcon, etc.
//     });
//   },

//   scheduleNotification2: () => {
//     PushNotification.localNotificationSchedule({
//       channelId: "default-channel-id",
//       id: 2,
//       autoCancel: true,
//       title: "Scheduled Notification",
//       message: "This notification is scheduled for the future.",
//       date: new Date(Date.now() + 5 * 1000), // Schedule for 5 seconds from now
//       //repeatType: "day", // Optional, can be 'day', 'week', etc.
//       playSound: true,
//       soundName: "default",
//     });
//   },

//   cancelScheduledNotification: (notificationId) => {
//     PushNotification.cancelLocalNotifications({ id: notificationId });
//   },

//   cancelAllScheduledNotifications: () => {
//     PushNotification.cancelAllLocalNotifications();
//   },
// };

// export default NotificationService;
