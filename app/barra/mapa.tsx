import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function MapaScreen() {
  const { busqueda } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Mapa según búsqueda: {busqueda}</Text>
    </View>
  );
}
