import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { useAuth } from "@/contexts/auth-context";

export default function Profile() {
  const { logout } = useAuth();
  const { user } = useAuth();

  // Get initials from name for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-blue-50 to-indigo-100">
      <View className="flex-1 items-center justify-center px-6 py-12">
        {/* Profile Card */}
        <View className="bg-white/90 backdrop-blur-lg shadow-2xl w-full rounded-3xl border border-white/20 overflow-hidden" style={{ elevation: 20 }}>
          
          {/* Header Gradient */}
          <View className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 pt-8 pb-16 items-center">
            <Text className="text-white text-2xl font-bold">Akong Profile</Text>
          </View>
          
          {/* Avatar Section */}
          <View className="items-center -mt-12 mb-4">
            <View className="relative">
              {user?.profile_image ? (
                <Image
                  className="w-28 h-28 rounded-2xl border-4 border-white shadow-lg"
                  source={{
                    uri: `http://127.0.0.1:8000/storage/${user?.profile_image}`,
                  }}
                  style={{ backgroundColor: '#E5E7EB' }}
                />
              ) : (
                <View className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 items-center justify-center border-4 border-white shadow-lg">
                  <Text className="text-white text-3xl font-bold">
                    {user?.name ? getInitials(user.name) : "U"}
                  </Text>
                </View>
              )}
              
              {/* Online Status Badge */}
              <View className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
            </View>
          </View>

          {/* Information Cards */}
          <View className="px-6 py-4">
            <Text className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-4">
              Account Information
            </Text>
            
            {/* Email Card */}
            <View className="bg-gray-50 rounded-2xl p-4 mb-4 flex-row items-center border border-gray-100">
              <View className="w-10 h-10 bg-blue-100 rounded-xl items-center justify-center mr-3">
                <Text className="text-blue-600 text-lg">•</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Email Address</Text>
                <Text className="text-gray-800 text-base font-medium mt-1">
                  {user?.email || "user@example.com"}
                </Text>
              </View>
            </View>
            {/* Name Card */}
            <View className="bg-gray-50 rounded-2xl p-4 mb-4 flex-row items-center border border-gray-100">
              <View className="w-10 h-10 bg-blue-100 rounded-xl items-center justify-center mr-3">
                <Text className="text-blue-600 text-lg">•</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Name</Text>
                <Text className="text-gray-800 text-base font-medium mt-1">
                  {user?.name || "user@example.com"}
                </Text>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <View className="px-6 pb-6">
            <TouchableOpacity
              onPress={logout}
              className="h-12 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 items-center justify-center shadow-lg active:opacity-90"
              activeOpacity={0.9}
            >
              <Text className="text-white font-bold text-base">🚪 Mugawas</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}