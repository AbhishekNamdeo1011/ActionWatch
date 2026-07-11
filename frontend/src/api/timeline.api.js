import api from "./axios";

/*
==========================================
Get Incident Timeline
==========================================
*/

export const getTimeline = async (incidentId) => {

    const { data } = await api.get(

        `/timeline/${incidentId}/timeline`

    );

    return data.data;

};

/*
==========================================
Create Timeline Entry
==========================================
*/

export const createTimeline = async (
    incidentId,
    payload
) => {

    const { data } = await api.post(

        `/timeline/${incidentId}/timeline`,

        payload

    );

    return data.data;

};