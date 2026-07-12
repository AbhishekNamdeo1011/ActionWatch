import {
    getIncidents,
    getIncident,
    createIncident,
    updateIncident,
    assignResponder,
    removeResponder,
} from "@/api/incident.api";

export const incidentService = {

    getAll: (params) => getIncidents(params),

    getOne: getIncident,

    create: createIncident,

    update: updateIncident,

    assignResponder,

    removeResponder,

};