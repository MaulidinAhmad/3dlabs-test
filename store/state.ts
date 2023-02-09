import { IGithubUser } from "@/services/users/usersType";

export interface GlobalStateType {
  userData?: IGithubUser;
}

// DEFAULT VALUE GLOBAL STATE
export const globalState: GlobalStateType = {
  userData: undefined,
};
