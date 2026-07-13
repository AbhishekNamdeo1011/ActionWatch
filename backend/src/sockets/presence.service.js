const onlineUsers = new Map();

/*
Map Structure

userId
    ↓
{
    userId,
    username,
    role,
    sockets: Set(socketIds)
}
*/

export const addOnlineUser = (user, socketId) => {

    const userId = user._id.toString();

    if (!onlineUsers.has(userId)) {

        onlineUsers.set(userId, {
            userId,
            username: user.username,
            role: user.role,
            sockets: new Set()
        });

    }

    onlineUsers
        .get(userId)
        .sockets
        .add(socketId);

   

};

export const removeOnlineUser = (userId, socketId) => {

    userId = userId.toString();

    if (!onlineUsers.has(userId)) {
        return false;
    }

    const user = onlineUsers.get(userId);

    user.sockets.delete(socketId);

    if (user.sockets.size === 0) {

        onlineUsers.delete(userId);

        return true;
    }


    return false;
};

export const isUserOnline = (userId) => {

    return onlineUsers.has(userId.toString());

};

export const getOnlineUsers = () => {

    return [...onlineUsers.values()].map(user => ({
        userId: user.userId,
        username: user.username,
        role: user.role
    }));

};

export const getOnlineUserCount = () => {

    return onlineUsers.size;

};

export const clearPresence = () => {

    onlineUsers.clear();

};