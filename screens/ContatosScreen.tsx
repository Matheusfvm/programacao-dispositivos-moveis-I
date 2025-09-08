import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Alert
} from "react-native";
import * as Contacts from "expo-contacts";
import { SafeAreaView } from "react-native-safe-area-context";


import { Contato } from "../types/contatos";


export default function ContactsScreen() {
  const [contacts, setContacts] = useState<Contato[]>([]);

  const carregarContatos = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Não é possível acessar os contatos.");
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.FirstName, Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(data as Contato[]);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os contatos.");
    }
  };

  useEffect(() => {
    carregarContatos();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Button title="Recarregar Contatos" onPress={carregarContatos} />
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>
                {item.name ? item.name : "Sem nome"}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhum contato encontrado</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#222",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 6,
    borderRadius: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  phone: {
    fontSize: 16,
    color: "#333",
  },
  empty: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
});
