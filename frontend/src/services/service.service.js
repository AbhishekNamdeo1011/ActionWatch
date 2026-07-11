import * as serviceApi from "@/api/service.api";

export const serviceService = {

    getAll: async (params) => {

        const result = await serviceApi.getServices(params);

        return result.data;

    },

    getOne: async (serviceId) => {

        const result = await serviceApi.getService(serviceId);

        return result.data;

    },

    create: async (payload) => {

        const result = await serviceApi.createService(payload);

        return result.data;

    },

    update: async (serviceId, payload) => {

        const result = await serviceApi.updateService(

            serviceId,

            payload

        );

        return result.data;

    },

    delete: async (serviceId) => {

        const result = await serviceApi.deleteService(

            serviceId

        );

        return result.data;

    },

    toggle: async (serviceId) => {

        const result = await serviceApi.toggleMonitoring(

            serviceId

        );

        return result.data;

    },

};