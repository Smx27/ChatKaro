import { StyleSheet } from "react-native";
import { SafeAreaView, Text, View } from "@/components/Themed";
import TabHeader from "@/components/tabs/tabHeader";
import Search from "@/components/tabs/searchComponent";
import Status from "@/components/tabs/statusComponent";
import ContactComponent from "@/components/tabs/contactComponent";

export default function TabOneScreen() {
  const date3 = new Date("2024-08-04");
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.padding}>
          <TabHeader
            title="Chats"
            showAddButton={false}
            showNewChat
            showSelectButton
          />
        </View>
        <View style={styles.padding}>
          <Status />
        </View>
        <View style={styles.padding}>
          <Search onTextChange={() => {}} placeholder="Search people" />
        </View>

        <ContactComponent
          imagePath="https://wallpapers-clan.com/wp-content/uploads/2022/07/funny-cat-1.jpg"
          lastActive={date3}
          name="Sumit Maiti"
          subtext="Hello Good morning"
          unreadMessage={2}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  padding: {
    paddingVertical: 10,
  },
});
