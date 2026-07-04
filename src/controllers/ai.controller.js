import {
    generateRootCause,
} from "../services/rootCause.service.js";

export const generateIncidentRootCause =
    async (
        req,
        res
    ) => {

        try {

            const result =
                await generateRootCause(

                    req.params.incidentId,
 req.query.force === "true"
                );

            return res.status(200).json({

                success: true,

                message:
                    "AI root cause generated successfully.",

                data: result,

            });

        }

        catch (error) {

            if (
                error.statusCode
            ) {

                return res
                    .status(
                        error.statusCode
                    )
                    .json({

                        success: false,

                        message:
                            error.message,

                    });

            }

            console.error(error);

            return res.status(500).json({

                success: false,

                message:
                    "Internal Server Error",

            });

        }

    };