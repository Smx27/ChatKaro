import { UserData } from "@/models/interfaces/userData";
import {AsyncStorageService as cache} from "./AsyncStorage";
import { INITIAL_USER_DATA_KEY } from "@/constants/ApplicationConsents";


export const UserService = {
    GetInitialUserData: async () => {
        try {
            return await cache.getItem<UserData>(INITIAL_USER_DATA_KEY);
        } catch (error) {
            console.log('Failed to fetch initial user data')
        } 
    }

}
