export function login({ commit }, { user }) {
    return new Promise((resolve) => {
        commit("SET_USER", user);
        resolve();
    })
}

export function logout({ commit }) {
    return new Promise((resolve, reject) => {
        localStorage.removeItem("SET_USER")
        resolve();
    })
}
