import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 bg-slate-900 justify-around items-center">
      <Text className="text-yellow-400 text-6xl font-bold">Hello World!</Text>
      <Text className="text-slate-50 text-4xl font-bold">
        Kenzie Academy Brasil
      </Text>
      <Text className="text-yellow-400 text-6xl font-bold">And</Text>
      <Text className="text-slate-50 text-4xl font-bold">Rocketseat</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#ffff",
    fontSize: 35,
    fontWeight: "700",
  },
});
