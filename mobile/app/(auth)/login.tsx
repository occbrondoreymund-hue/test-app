import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, ActivityIndicator } from "react-native";
import { router } from "expo-router";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string[]; password?: string[] }>({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    const newErrors: { email?: string[]; password?: string[]; } = {};

    if (!email) {
      newErrors.email = ["Email is required"];
    }

    if (!password) {
      newErrors.password = ["Password is required"];
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    
    try {
      await login({ email, password });
    } catch (error) {
      // Handle error if needed
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-indigo-100">
      <View className="bg-white/90 backdrop-blur-lg shadow-2xl p-8 w-full rounded-3xl border border-white/20" style={{ elevation: 20 }}>
        {message && (
          <View className="mb-4 px-4 py-3 bg-green-500/10 rounded-2xl border border-green-500/20">
            <Text className="text-green-600 text-center font-semibold">
              {message}
            </Text>
          </View>
        )}
        
        <View className="items-center mb-6">
          <View className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
            <Text className="text-3xl">🔐</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-800">Maayong Pagbalik</Text>
          <Text className="text-gray-500 text-sm mt-1">Pag butang para mo sumpay</Text>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 font-semibold mb-2 text-sm">Email Address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="h-14 px-5 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 text-base"
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!isLoading}
            />
            {errors.email && (
              <View className="mt-2 flex-row items-center">
                <Text className="text-red-500 text-xs">⚠️ </Text>
                <Text className="text-red-500 text-xs">{errors.email[0]}</Text>
              </View>
            )}
          </View>

          <View>
            <Text className="text-gray-700 font-semibold mb-2 text-sm">Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              className="h-14 px-5 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 text-base"
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              editable={!isLoading}
            />
            {errors.password && (
              <View className="mt-2 flex-row items-center">
                <Text className="text-red-500 text-xs">⚠️ </Text>
                <Text className="text-red-500 text-xs">{errors.password[0]}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className={`h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 items-center justify-center shadow-lg active:opacity-90 ${isLoading ? 'opacity-70' : ''}`}
            activeOpacity={0.9}
          >
            {isLoading ? (
              <View className="flex-row items-center">
                <ActivityIndicator size="small" color="white" />
                <Text className="text-white font-bold text-base ml-2">Signing In...</Text>
              </View>
            ) : (
              <Text className="text-white font-bold text-base">Mosulod</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center items-center mt-4">
            <Text className="text-gray-600 text-sm">Wala kay account? </Text>
            <Pressable onPress={() => router.navigate({ pathname: "/register" })} disabled={isLoading}>
              <Text className="text-blue-600 font-semibold text-sm">
                Pag Buhat!
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}