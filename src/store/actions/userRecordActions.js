export const updateUserRecord= (obj) => ({
    type: "updateUserRecord",
    key: obj.key,
    record: obj.record,
});
export const createNewUser= (user) => ({
    type: "createNewUser",
    user: user
});
