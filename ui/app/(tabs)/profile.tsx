import { StyleSheet } from "react-native";

import { Text, View, SafeAreaView } from "@/components/Themed";
import TabHeader from "@/components/tabs/tabHeader";
import ContactComponent from "@/components/tabs/contactComponent";
import { UserService } from "@/services/UserServices";
import ProfileLinks from "@/components/profile/profileLinks";
import Separator from "@/components/Separator";
import UserProfile from "@/components/profile/userProfile";

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
        {/* <View style={styles.testcontainer}>
          <ContactComponent
            imagePath={imagePath}
            lastActive={lastActive}
            name="Sumit Maiti"
            subtext="+91 9134567890"
          />
        </View> */}
        <View style={styles.linkContainer}>
          <UserProfile imagePath={imagePath} lastActive={lastActive} title="Sumit Maiti" subtext="+91 9134567890" />
          <ProfileLinks
            iconName="user-o"
            redirectLink={"/modal"}
            title="Account"
          />
          <ProfileLinks
            iconName="comment-o"
            redirectLink={"/modal"}
            title="Chats"
          />
          <Separator  />
          <ProfileLinks
            iconName="lightbulb-o"
            redirectLink={"/modal"}
            title="Appearance"
          />
          <ProfileLinks
            iconName="bell-o"
            redirectLink={"/modal"}
            title="Notification"
          />
          <ProfileLinks
            iconName="shield"
            redirectLink={"/modal"}
            title="Privacy"
          /> 
          <ProfileLinks
            iconName="folder-o"
            redirectLink={"/modal"}
            title="Data Usage"
          />
          <Separator />
          <ProfileLinks
            iconName="question-circle-o"
            redirectLink={"/modal"}
            title="Help"
          />
           <ProfileLinks
            iconName="envelope-o"
            redirectLink={"/modal"}
            title="Invite Your Friends"
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
  linkContainer: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "flex-start",
  },
});
