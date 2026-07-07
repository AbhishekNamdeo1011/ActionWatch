import {

    getSimilarIncidents,

} from "../services/similarIncident.service.js";

export const getIncidentSimilar = async (

    req,

    res

) => {

    try {

        const data =

            await getSimilarIncidents(

                req.params.incidentId

            );

        return res.status(200).json({

            success: true,

            data,

        });

    }

    catch (error) {

        if (error.statusCode) {

            return res.status(

                error.statusCode

            ).json({

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