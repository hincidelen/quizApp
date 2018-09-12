export const updateUserRecord= (obj) => ({
    type: "updateUserRecord",
    key: obj.key,
    record: obj.record,
});
export const createNewUser= (user) => ({
    type: "createNewUser",
    user: user
});
export const resetUsers= (obj) => ({
    type: "resetUsers",
    key:obj.key,
});
export const deleteUser= (obj) => ({
    type: "deleteUser",
    key:obj.key,
    deleteKey:obj.deleteKey,
});
