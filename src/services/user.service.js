import mongoose from "mongoose";

import UserModel from "../models/user.model.js";

import {

    USER_ROLES,

    ROLE_HIERARCHY,

} from "../constants/role.constants.js";

/*
==========================================
Update User Role
==========================================
*/

export const updateUserRoleService = async (

    userId,

    newRole,

    currentUser

) => {

    /*
    ==========================================
    Validate ObjectId
    ==========================================
    */

    if (

        !mongoose.Types.ObjectId.isValid(

            userId

        )

    ) {

        const error =

            new Error(

                "Invalid user id."

            );

        error.statusCode = 400;

        throw error;

    }

    /*
    ==========================================
    Validate Role
    ==========================================
    */

    if (

        !Object.values(

            USER_ROLES

        ).includes(newRole)

    ) {

        const error =

            new Error(

                "Invalid role."

            );

        error.statusCode = 400;

        throw error;

    }

    /*
    ==========================================
    Find User
    ==========================================
    */

    const user =

        await UserModel.findById(

            userId

        );

    if (!user) {

        const error =

            new Error(

                "User not found."

            );

        error.statusCode = 404;

        throw error;

    }

    /*
    ==========================================
    Prevent Changing Owner
    ==========================================
    */

    if (

        user.role === USER_ROLES.OWNER

    ) {

        const error =

            new Error(

                "Owner role cannot be modified."

            );

        error.statusCode = 403;

        throw error;

    }

    /*
    ==========================================
    Admin Restrictions
    ==========================================
    */

    if (

        currentUser.role === USER_ROLES.ADMIN

    ) {

        if (

            newRole === USER_ROLES.OWNER

        ) {

            const error =

                new Error(

                    "Admin cannot assign Owner role."

                );

            error.statusCode = 403;

            throw error;

        }

    }

    /*
    ==========================================
    Update Role
    ==========================================
    */

    user.role = newRole;

    await user.save();

    return user;

};