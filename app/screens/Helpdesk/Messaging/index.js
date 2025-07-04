// ChatScreen.js
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
// import {
//   Item,
//   Icon,
//   Button as ButtonNB,
//   Header,
//   Content,
//   Container,
//   Tabs,
//   Tab,
// } from "native-base";
import {
  Header,
  Icon,
  // ListTextButton,
  // SafeAreaView,
  // Tag,
  // Text,
  // Button,
  // CategoryGrid,
  // CategoryBoxColor,
  // ModalFilterLocation,
  // ButtonChooseProject,
} from "@/components";
import { useNavigation } from "@react-navigation/native";
//import Styles from "../../Themes/Style";
//import Colors from "../../Themes/Colors";
import { justifyContent } from "styled-system";
import { Actions } from "react-native-router-flux";
import { BaseColor, BaseStyle, useTheme } from "@/config";

const ChatScreen = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { username, targetPerson } = props.route.params;
  console.log("52 chat: ", JSON.stringify(props));
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  //console.log("34 target person: ", targetPerson);

  const flatListRef = useRef(null);
  // useEffect(() => {
  //   // Scroll to the bottom when messages change
  //   flatListRef.current?.scrollToEnd({ animated: true });
  // }, [messages]);
  useEffect(() => {
    // Use setTimeout to ensure scrolling happens after render
    const timer = setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 300); // Adjust the timeout duration as needed

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [messages]);

  useEffect(() => {
    // Listeners for keyboard events
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        console.log("Keyboard is shown");
        // Custom code when keyboard appears
        const timer = setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100); // Adjust the timeout duration as needed

        return () => clearTimeout(timer); // Cleanup the timer on unmount
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        console.log("Keyboard is hidden");
        // Custom code when keyboard hides
      }
    );

    // Clean up listeners on unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  dummyChat = [
    { id: "1725871996926", sender: "Management Admin IFCA4", text: "1hallo" },
    { id: "1725871998663", sender: "qwe", text: "2hallo" },
    { id: "1725872002009", sender: "Management Admin IFCA4", text: "3hallo" },
    { id: "1725872005708", sender: "qwe", text: "4hallo" },
    { id: "1725872021840", sender: "Management Admin IFCA4", text: "5hallo" },
    {
      id: "1725872052023",
      sender: "qwe",
      text: "6hallo0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    },
    {
      id: "1725872099402",
      sender: "Management Admin IFCA4",
      text: "7hallo6hallo0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    },
    { id: "1725872101567", sender: "Management Admin IFCA4", text: "8hallo" },
    {
      id: "1725872104167",
      sender: "Management Admin IFCA4",
      text: "9hallo",
    },
  ];

  const handleSend = () => {
    // Do not hide the keyboard
    //Keyboard.dismiss(); // If you want to hide the keyboard on button press, remove this line
    console.log("100 send");
    // if (inputRef.current) {
    //   inputRef.current.focus();
    // }

    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          text: message,
          sender: username,
          date: Date.now(),
        },
      ]);
      setMessage("");
      //Date.now(); = timestamp
    }
    console.log("28 messages", messages);
    // Optionally, you can keep the keyboard visible by refocusing the input
  };

  const handleTouchOutside = () => {
    // You can add specific logic here if needed when touching outside
    // For example, you might want to dismiss the keyboard in some scenarios:
    // Keyboard.dismiss();
    //handleSend();
    console.log("100 handleTouch");
    // if (inputRef.current) {
    //   inputRef.current.focus();
    // }
  };

  const timestampToFormat = (timestamp) => {
    // Create a Date object from the timestamp
    const dateObject = new Date(timestamp);

    // // Format the date using moment.js
    // // const formattedDate = moment(dateObject).format("MMMM Do YYYY, h:mm:ss a");
    // const formattedDate = moment(dateObject).format("Do MMMM YYYY, h:mm:ss a");
    // return formattedDate;
    // //Alternative with Intl.DateTimeFormat

    // Extract date and time components
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Months are 0-based
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    // Format date and time
    // const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    const formattedDate = `${hours}:${minutes}`;
    return formattedDate;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 50} // Adjust the offset as needed
    >
      {/* <Header style={Styles.navigation}>
        <StatusBar
          backgroundColor={Colors.statusBarOrange}
          animated
          barStyle="light-content"
        />
        <View style={Styles.actionBarLeft}>
          <ButtonNB
            transparent
            style={Styles.actionBarBtn}
            onPress={Actions.pop}
          >
            <Icon
              active
              name="arrow-left"
              style={Styles.textWhite}
              type="MaterialCommunityIcons"
            />
          </ButtonNB>
        </View>
        <View style={Styles.actionBarMiddle}>
          <Text style={Styles.actionBarText}>
            {targetPerson?.toUpperCase()}
          </Text>
        </View>
        <View style={Styles.actionBarRight}></View>
      </Header> */}
      <Header
        // title={t('choose_friend')}
        title={targetPerson} //belum ada lang translatenya
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
          navigation.goBack();
        }}
      />
      {/* <View style={styles.container}> */}
      {/* <View style={{ alignSelf: "flex-end" }}> */}
      {/* <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      > */}
      <FlatList
        ref={flatListRef}
        data={messages}
        //data={dummyChat}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              {
                position: "relative",
                padding: 10,
                borderRadius: 10,
                marginVertical: 5,
                maxWidth: "80%",
                paddingBottom: 20,
              },
              item.sender === username
                ? styles.userMessage
                : styles.receivedMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
            <Text
              style={
                item.sender === username
                  ? {
                      position: "absolute",
                      bottom: 4, // Adjust the position from the bottom of the message bubble
                      right: 10, // Adjust the position from the right edge of the message bubble
                      fontSize: 12,
                      color: "#888",
                    }
                  : {
                      position: "absolute",
                      bottom: 4, // Adjust the position from the bottom of the message bubble
                      left: 10, // Adjust the position from the right edge of the message bubble
                      fontSize: 12,
                      color: "#888",
                    }
              }
            >
              {timestampToFormat(item.date)}
            </Text>
          </View>
        )}
        //inverted
        contentContainerStyle={{
          paddingHorizontal: 5,
          flexGrow: 1,
          justifyContent: "flex-end", // Ensure content is aligned to the bottom
        }} // Ensure the content is aligned to the bottom
      />
      {/* </View> */}

      {/* </View> */}
      {/* </ScrollView> */}
      {/* <TouchableWithoutFeedback onPress={handleTouchOutside}> */}
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          // onSubmitEditing={handleSend} // Optionally handle Enter key press
          // returnKeyType="send" // Optionally set the return key type to "Send"
        />

        <TouchableOpacity
          //ref={inputRef}
          style={styles.sendButton}
          onPress={handleSend}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#e5ddd5", // WhatsApp-like background color
    backgroundColor: "white",
    //padding: 10,
    marginBottom: 20,
    //justifyContent: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
    backgroundColor: "#fff",
    padding: 10,
    //backgroundColor: "red",
    marginTop: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#34b7f1", // WhatsApp-like send button color
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#dcf8c6", // WhatsApp-like message background color
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: "80%",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: "80%",
    //borderWidth: 0.1,
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5, // For Android shadow
  },
  messageText: {
    fontSize: 16,
  },
});

export default ChatScreen;
