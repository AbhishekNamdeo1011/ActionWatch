import api from "./axios";

export const generatePostmortem = async (

    incidentId

) => {

    const { data } = await api.post(

        `/postmortems/${incidentId}`

    );

    return data.data;

};

export const getPostmortem = async (

    incidentId

) => {

    const { data } = await api.get(

        `/postmortems/${incidentId}`

    );

    return data.data;

};