export const isAuthenticated = state => {
    return !!state.user;
};

export const name = state => {
    let firstName = state.user.attributes.given_name;
    let lastName = state.user.attributes.family_name;
    return firstName + " " + lastName;
};