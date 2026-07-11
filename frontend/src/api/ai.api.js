import api from "./axios";

/*
==========================================
Generate Root Cause
==========================================
*/

export const generateRootCause = async (incidentId) => {

    const { data } = await api.post(

        `/ai/root-cause/${incidentId}`

    );

    return data.data;

};