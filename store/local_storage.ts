import { IGithubUser } from "@/services/users/usersType";
const LOCALSTORAGE_KEYNAME = "store";

export interface PersistentState {
  userData?: IGithubUser;
}

export const persistentState: PersistentState = {};

export const getLocalStorage = () => {
  if (localStorage) {
    const storage = localStorage.getItem(LOCALSTORAGE_KEYNAME);
    if (storage) {
      // decrypt hash

      try {
        return JSON.parse(storage) as PersistentState;
      } catch (err) {
        // return default value when decrypt is failed
        return persistentState;
      }
    } else return persistentState;
  }
  return null;
};

export const setToLocalStorage = (state: Partial<PersistentState>) => {
  const newStore: PersistentState = {
    ...getLocalStorage(),
    ...state,
  };
  // encrypt localStorage object to hash
  const data = JSON.stringify(newStore);
  localStorage.setItem(LOCALSTORAGE_KEYNAME, data);
};
