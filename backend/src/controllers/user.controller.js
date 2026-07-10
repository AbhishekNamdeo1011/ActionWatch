import asyncHandler from "../utils/asyncHandler.js";
import userModel from "../models/user.model.js";
import {

    updateUserRoleService,

} from "../services/user.service.js";

/*
==========================================
Update User Role
==========================================
*/

export const updateUserRole = asyncHandler(

    async (req, res) => {

        const user =

            await updateUserRoleService(

                req.params.userId,

                req.body.role,

                req.user

            );

        return res.status(200).json({

            success: true,

            message: "User role updated successfully.",

            data: user,

        });

    }

);
export const getUsers = asyncHandler(async (req, res) => {

    const users = await userModel.find()

        .select("username email role expertise");

    return res.status(200).json({

        success: true,

        data: users,

    });

});