import TabBg from "./TabBg";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabButton = ({ bgColor, ...props }) => {
  return (
    <View style={styles.container} pointerEvents="box-none">
      <TabBg color={bgColor} style={styles.background} />
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <Icon name="microphone" size={30} color="blue" />
      </TouchableOpacity>
    </View>
  );
};
