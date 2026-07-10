const severityConfig = {

    P0: "bg-red-500 text-white",

    P1: "bg-orange-500 text-white",

    P2: "bg-yellow-500 text-black",

    P3: "bg-blue-500 text-white",

};

const IncidentSeverityBadge = ({ severity }) => {

    return (

        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                severityConfig[severity] ||
                "bg-gray-500 text-white"
            }`}
        >

            {severity}

        </span>

    );

};

export default IncidentSeverityBadge;