// Comparison with useFocusEffect:
// useFocusEffect is ideal if you want to execute some logic whenever the screen is focused or unfocused (more for handling side effects directly).
// useIsFocused is more suited for when you need a simple flag (boolean) that indicates whether the screen is focused, and you can manually manage side effects, such as setting intervals.

import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

const useCustomTriggerOnFocus = (triggerFunction) => {
  useFocusEffect(
    useCallback(() => {
      // Run immediately
      triggerFunction();

      // Set an interval to call the function periodically
      const intervalId = setInterval(() => {
        triggerFunction();
      }, 10000); // 2000 milliseconds = 2 seconds

      // Clean up the interval when the screen loses focus
      return () => {
        clearInterval(intervalId);
        //console.log("Interval cleared as ScreenA lost focus");
      };
    }, [])
  );
};

export { useCustomTriggerOnFocus };
