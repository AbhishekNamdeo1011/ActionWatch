import api from "./axios";

/*
=====================================
Get Similar Incidents
=====================================
*/

export const getSimilarIncidents = async (incidentId) => {

    const { data } = await api.get(
        `/similar-incidents/${incidentId}`
    );

    return data.data;

};