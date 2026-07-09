import UserModel from "../models/user.model.js";
import IncidentModel from "../models/incident.model.js";
import { sendAssignmentEmail } from "../services/email.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const testMail = asyncHandler(async (req, res) => {

    const user = await UserModel.findOne();

    const incident = await IncidentModel.findOne();

    if (!user || !incident) {

        return res.status(404).json({

            success: false,

            message: "User or Incident not found."

        });

    }

    await sendAssignmentEmail(user, incident);

    return res.status(200).json({

        success: true,

        message: "Email sent successfully."

    });

});