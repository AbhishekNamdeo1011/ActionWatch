import {
    generatePostmortem,
} from "../services/postmortem.service.js";

export const generateIncidentPostmortem = async (
    req,
    res
) => {

    try {

        const postmortem =
            await generatePostmortem(

                req.params.incidentId

            );

        return res.status(200).json({

            success: true,

            message: "AI postmortem generated successfully.",

            data: postmortem,

        });

    }

    catch (error) {

        if (error.statusCode) {

            return res.status(error.statusCode).json({

                success: false,

                message: error.message,

            });

        }

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};
import {
    getPostmortem,
} from "../services/postmortem.service.js";

export const getIncidentPostmortem = async (
    req,
    res
) => {

    try {

        const postmortem =
            await getPostmortem(

                req.params.incidentId

            );

        return res.status(200).json({

            success: true,

            data: postmortem,

        });

    }

    catch (error) {

        if (error.statusCode) {

            return res.status(error.statusCode).json({

                success: false,

                message: error.message,

            });

        }

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};