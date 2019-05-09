import { Auth } from "aws-amplify";

export function getSession({ commit, getters }) {
    return new Promise((resolve, reject) => {
      Auth.currentAuthenticatedUser()
        .then(user => {
          if (!getters.isAuthenticated) {
            commit("SET_USER", user);
          }
        })
        .catch(err => {
          console.log(err);
          if (getters.isAuthenticated) {
            commit("SET_USER");
          }
          reject();
        });
    });
  }