import { StyleSheet } from "react-native";

import { Text, View, SafeAreaView } from "@/components/Themed";
import TabHeader from "@/components/tabs/tabHeader";
import ContactComponent from "@/components/tabs/contactComponent";
import { UserService } from "@/services/UserServices";

export default function TabTwoScreen() {
  const imagePath =
    "https://i3.wp.com/assets.tiltify.com/uploads/media_type/image/203025/blob-09636982-a21a-494b-bbe4-3692c2720ae3.jpeg";
  const lastActive = new Date(Date.now() - 3 * 60 * 1000); // 3 minutes ago
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.childContainer}>
        <TabHeader
          title="Profile"
          showAddButton={false}
          showNewChat={false}
          showSelectButton={false}
        />
        <View style={styles.testcontainer}>
          <ContactComponent
            imagePath={imagePath}
            lastActive={lastActive}
            name="Sumit Maiti"
            subtext="+91 9134567890"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  childContainer: {
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  testcontainer: {
    height: "100%",
    flexDirection: "column",
  },
});
