import api from "./axios";

/*
=====================================
Get All Incidents
=====================================
*/
export const getIncidents = async (params = {}) => {

    const { data } = await api.get("/incidents", {
        params,
    });

    return data.data;

};

/*
=====================================
Get Single Incident
=====================================
*/
export const getIncident = async (incidentId) => {

    const response = await api.get(`/incidents/${incidentId}`);

    console.log("API Response:", response.data);

    return response.data.data;

};

/*
=====================================
Create Incident
=====================================
*/

export const createIncident = async (payload) => {

    const { data } = await api.post(
        "/incidents",
        payload
    );

    return data.data;

};

/*
=====================================
Update Incident
=====================================
*/

export const updateIncident = async (
    incidentId,
    payload
) => {

    const { data } = await api.patch(
        `/incidents/${incidentId}`,
        payload
    );

    return data.data;

};
/*
=====================================
Assign Responder
=====================================
*/

export const assignResponder = async (
    incidentId,
    userId
) => {

    const { data } = await api.post(

        `/incidents/${incidentId}/responders`,

        {
            userId,
        }

    );

    return data.data;

};

/*
=====================================
Remove Responder
=====================================
*/

export const removeResponder = async (
    incidentId,
    userId
) => {

    const { data } = await api.delete(

        `/incidents/${incidentId}/responders/${userId}`

    );

    return data.data;

};