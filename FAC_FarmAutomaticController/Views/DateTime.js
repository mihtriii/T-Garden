import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

// export default function DateTime() {
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);

//   const toggleDatePicker = () => {
//     setShowPicker(!showPicker);
//   };

//   const onChange = ({ type }, selectedDate) => {
//     if (type == "set") {
//       const currentDate = selectedDate;
//       setDate(currentDate);

//       if (Platform.OS === "android") {
//         toggleDatePicker();
//       }
//     } else {
//       toggleDatePicker();
//     }
//   };

//   return (
//     <View>
//       <Text>DateTime</Text>

//       {showPicker && (
//         <DateTimePicker
//           mode="time"
//           display="spinner"
//           value={date}
//           onChange={onChange}
//         />
//       )}

//       {!showPicker && (
//         <TouchableOpacity onPress={toggleDatePicker}>
//           <Text>Timer</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// }

export default class DateTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: new Date(),
      showPicker: false,
    };
  }

  toggleDatePicker = () => {
    this.setState((prevState) => ({ showPicker: !prevState.showPicker }));
  };

  onChange = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || this.state.date;
      this.setState({ date: currentDate });
      if (Platform.OS === "android") {
        this.toggleDatePicker();
      }
    } else {
      this.toggleDatePicker();
    }
  };

  render() {
    const { dateTime, showPicker } = this.state;
    return (
      <View>
        <Text>DateTime</Text>
        {showPicker && (
          <DateTimePicker
            mode="time"
            display="spinner"
            value={dateTime}
            onChange={this.onChange}
          />
        )}
        <TouchableOpacity onPress={this.toggleDatePicker}>
            <Text>Timer</Text>
          </TouchableOpacity>
      </View>
    );
  }
}
