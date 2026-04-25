import { View, Text, Image, ScrollView, Pressable, Alert } from "react-native";
import { useAuth } from "@/contexts/auth-context";
import React, { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import axios from "@/api/axios";

type BlogProps = {
  id: number;
  title: string;
  image: string;
  description: string;
};

export default function Home() {
  const [blogs, setBlogs] = useState<BlogProps[]>([]);

  const getBlogs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/fetchBlogs");
      setBlogs(response.data);
    } catch (error) {
      console.log("Error fetching blogs:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getBlogs();
    }, [])
  );

  return (
    <ScrollView 
      className="flex-1 bg-gradient-to-b from-blue-50 to-indigo-100"
      showsVerticalScrollIndicator={false}
    >
      <View className="p-6">
        {/* Header Section */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-800">Fresh na mga Blogs</Text>
          <Text className="text-gray-500 text-sm mt-1">scroll lang diha para malingaw ka</Text>
        </View>

        {/* Create Blog Button */}
        <Pressable 
          onPress={() => router.navigate("/(default)/(pages)/home/create")} 
          className="mb-8"
        >
          <View className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-4 shadow-lg">
            <Text className="text-white text-lg font-bold text-center">+ Buhat ug blog post</Text>
          </View>
        </Pressable>

        {/* Blogs List */}
        <View className="gap-6">
          {blogs.map((blog) => (
            <Pressable 
              key={blog.id} 
              onPress={() => router.navigate(`/blogs/${blog.id}`)}
              className="mb-2"
            >
              <View className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                {/* Blog Image */}
                <Image
                  className="h-56 w-full"
                  source={{
                    uri: `http://127.0.0.1:8000/storage/${blog.image}`,
                  }}
                  style={{ resizeMode: 'cover' }}
                />
                
                {/* Blog Content */}
                <View className="p-4">
                  <Text className="text-xl font-bold text-gray-800 mb-2">
                    {blog.title}
                  </Text>
                  
                  <Text className="text-gray-600 text-base leading-6">
                    {blog.description.length > 120 
                      ? `${blog.description.substring(0, 120)}...` 
                      : blog.description}
                  </Text>
                  
                  {/* Read More Indicator */}
                  {/* <View className="flex-row items-center mt-3">
                    <Text className="text-blue-600 font-semibold text-sm">Read More</Text>
                    <Text className="text-blue-600 ml-1">→</Text>
                  </View> */}
                </View>
              </View>
            </Pressable>
          ))}
        </View>

      </View>
    </ScrollView>
  );
}