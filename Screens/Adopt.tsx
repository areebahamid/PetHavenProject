import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { fetchAnimalData, fetchUser } from '../UserFunctions'; 
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  AdoptAnimal: undefined;
  ChattingConcern: { OwnerId: string; AnimalId: string; userId: string };
};

const Adopt: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [animals, setAnimals] = useState<any[]>([]);
  const [animalIds, setAnimalIds] = useState<string[]>([]);
  const [imageUris, setImageUris] = useState<{ [key: string]: string | null }>({});
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const unsubscribe = fetchAnimalData(setAnimals, setAnimalIds);

    return () => {
      
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (animalIds.length > 0) {
      fetchImageUrls();
    }
  }, [animalIds]);

  const fetchImageUrls = async () => {
    const storage = getStorage();
    const newImageUris: { [key: string]: string | null } = {};

    for (const id of animalIds) {
      try {
        const storageRef = ref(storage, `AnimalMedia/${id}`);
        const downloadURL = await getDownloadURL(storageRef);
        newImageUris[id] = downloadURL;
      } catch (error) {
        if (error.code === 'storage/object-not-found') {
          console.log(`Image does not exist for ${id}`);
        } else {
          console.error('Error retrieving image download URL:', error);
        }
        newImageUris[id] = null;
      }
    }

    setImageUris(newImageUris);
    setLoading(false);
  };

  const goChat = async (OwnerId: string, AnimalId: string) => {
    const email = await AsyncStorage.getItem("Email");
    const user = await fetchUser(email);

    if (user.id !== OwnerId) {
      navigation.navigate("ChattingConcern", { OwnerId, AnimalId, userId: user.id });
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={[styles.activity, styles.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <View style={{ marginTop: 50, marginLeft: 5, marginRight: 5 }}>
          <TouchableOpacity ><Text>delete my donation</Text></TouchableOpacity>
          <FlatList
            style={{
              flexDirection: "row",
              borderRadius: 20,
              padding: 20,
              backgroundColor: "plum",
              margin: 20,
              alignSelf: "auto",
              flex:1
            }}
            data={animals}
            renderItem={({ item }) => (
              <View style={{ padding: 15, borderColor: "black" }}>
                {imageUris[item.id] && (
                  <Image
                    style={styles.tinyLogo}
                    source={{ uri: imageUris[item.id] }}
                  />
                )}
                <TouchableOpacity onPress={() => { goChat(item.OwnerId, item.id) }}>
                  <Text style={{ fontSize: 30 }}>{item.AnimalName}</Text>
                  <Text>Type: {item.AnimalType}</Text>
                  <Text>Breed: {item.AnimalBreed}</Text>
                  <Text>Age:  {item.AnimalAge}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activity: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    borderBottomColor: 'blue'
  },
});

export  {Adopt};
