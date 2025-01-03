// Comparison with useFocusEffect:
// useFocusEffect is ideal if you want to execute some logic whenever the screen is focused or unfocused (more for handling side effects directly).
// useIsFocused is more suited for when you need a simple flag (boolean) that indicates whether the screen is focused, and you can manually manage side effects, such as setting intervals.

/*
import { useCustomTriggerOnFocus } from "../function/funcFocusEffect";

  const onRefresh = () => {
    //alert("run onRefresh");
    fetchData();
    fetchDataCurrent();
  };

  useCustomTriggerOnFocus(onRefresh);
*/

import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

const useCustomTriggerOnFocus = (triggerFunction = () => {}, time = 10000) => {
  // const triggerFunction = () => {
  //   //console.log("ScreenA has been focused, function triggered!");
  //   // Your custom logic here...
  // };

  // useFocusEffect(
  //   useCallback(() => {
  //     onRefresh();
  //   }, [])
  //   //onRefresh
  // );

  useFocusEffect(
    //   React.useCallback(() => {
    useCallback(() => {
      triggerFunction();
      // This will run when ScreenA is focused
      //console.log("ScreenA is focused!");

      // Set an interval to call the function periodically
      const intervalId = setInterval(async () => {
        //alert("alert Interval");
        await triggerFunction();
      }, time); // 2000 milliseconds = 2 seconds

      // Clean up the interval when the screen loses focus
      return () => {
        clearInterval(intervalId);
        //console.log("Interval cleared as ScreenA lost focus");
      };
    }, [])
  );
};

//   useEffect(() => {
//     onRefresh();
//   }, []);

//   const onRefresh = () => {
//     fetchData();
//   };

export { useCustomTriggerOnFocus };
