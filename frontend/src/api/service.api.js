import api from "./axios";

/*
========================================
Get All Services
========================================
*/

export const getServices = async (params = {}) => {

    const { data } = await api.get("/services", {

        params,

    });

    return data;

};

/*
========================================
Get One Service
========================================
*/

export const getService = async (serviceId) => {

    const { data } = await api.get(

        `/services/${serviceId}`

    );

    return data;

};

/*
========================================
Create Service
========================================
*/

export const createService = async (payload) => {

    const { data } = await api.post(

        "/services",

        payload

    );

    return data;

};

/*
========================================
Update Service
========================================
*/

export const updateService = async (

    serviceId,

    payload

) => {

    const { data } = await api.patch(

        `/services/${serviceId}`,

        payload

    );

    return data;

};

/*
========================================
Delete Service
========================================
*/

export const deleteService = async (

    serviceId

) => {

    const { data } = await api.delete(

        `/services/${serviceId}`

    );

    return data;

};

/*
========================================
Toggle Monitoring
========================================
*/

export const toggleMonitoring = async (

    serviceId

) => {

    const { data } = await api.patch(

        `/services/${serviceId}/toggle`

    );

    return data;

};