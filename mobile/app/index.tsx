import { Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 p-6">
      <View className="bg-white/90 backdrop-blur-lg shadow-2xl p-8 rounded-3xl items-center">
        <Text className="text-2xl font-bold text-gray-800 mb-6">Maayong Pag Abot</Text>
        
        <TouchableOpacity
          onPress={() => router.push("/login")}
          className="h-14 px-8 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 items-center justify-center shadow-lg"
          activeOpacity={0.9}
        >
          <Text className="text-white font-bold text-base">Tuploka Ni</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}