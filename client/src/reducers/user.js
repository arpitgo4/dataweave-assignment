
export const userReducer = (state = {}, action) => {

    switch (action.type) {

        case 'SAVE_USER': {
            let existing_users = [];
            if (state.users)
                existing_users = state.users;

            const new_user = action.payload.user;
            delete new_user.meta;
            delete new_user.__v;

            return {
                ...state,
                users: [
                    ...existing_users,
                    new_user,
                ]
            };
        };
        
        case 'SAVE_USERS': {
            const users = action.payload.users.map(u => {
                delete u.meta;
                delete u.__v;
                return u;
            });

            return {
                ...state,
                users,
            };
        };

        case 'UPDATE_USER': {
            const updatedUser = action.payload.user;
            delete updatedUser.meta;
            delete updatedUser.__v;

            return {
                ...state,
                users: state.users.map(user => {
                    if (user._id === updatedUser._id)
                        return updatedUser;
                    else return user;
                })
            };
        };

        case 'REMOVE_USER': {
            const user = action.payload.user;
            return {
                ...state,
                users: state.users.reduce((acc, u) => {
                    if (u._id !== user._id)
                        acc.push(u);

                    return acc;
                }, [])
            }
        }

        default: return state;
    }
};