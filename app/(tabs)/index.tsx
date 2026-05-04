import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      {/* Background */}
      <Image
        source={images.bg}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      <FlatList
        scrollEnabled={true}
        className="mt-2 pb-32"
        data={movies || []}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginBottom: 15,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <View>
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-20 mb-5 mx-auto"
            />

            <SearchBar
              value=""
              onChangeText={() => {}}
              placeholder="Search for a movie"
              onPress={() => router.push("/search")}
              editable={false}
            />

            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies
            </Text>
          </View>
        }
        renderItem={({ item }) => <MovieCard {...item} />}
        ListEmptyComponent={
          moviesLoading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : moviesError ? (
            <Text className="text-white">Error: {moviesError.message}</Text>
          ) : null
        }
      />
    </View>
  );
}
