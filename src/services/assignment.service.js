import UserModel from "../models/user.model.js";

export const findBestResponder = async (serviceName) => {

    /*
    ==========================================
    Invalid Service
    ==========================================
    */

    if (!serviceName) {

        return null;

    }

    /*
    ==========================================
    Find Available Responders
    ==========================================
    */

    const responders = await UserModel.find({

        role: "responder",

        isAvailable: true,

    });

    if (!responders.length) {

        return null;

    }

    /*
    ==========================================
    Normalize Service Name
    ==========================================
    */

    const keyword = serviceName.toLowerCase();

    /*
    ==========================================
    Match Expertise
    ==========================================
    */

    const matched = responders.filter(user =>

        user.expertise?.some(skill =>

            keyword.includes(skill.toLowerCase())

        )

    );

    /*
    ==========================================
    Candidates
    ==========================================
    */

    const candidates =

        matched.length > 0

            ? matched

            : responders;

    /*
    ==========================================
    Lowest Workload First
    ==========================================
    */

    candidates.sort((a, b) =>

        a.activeIncidents - b.activeIncidents

    );

    return candidates[0];

};