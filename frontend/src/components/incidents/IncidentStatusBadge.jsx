const statusConfig = {
    investigating: {
        bg: "bg-yellow-500/10",
        text: "text-yellow-500",
    },

    identified: {
        bg: "bg-blue-500/10",
        text: "text-blue-500",
    },

    monitoring: {
        bg: "bg-purple-500/10",
        text: "text-purple-500",
    },

    resolved: {
        bg: "bg-green-500/10",
        text: "text-green-500",
    },
};

const IncidentStatusBadge = ({ status }) => {

    const config =
        statusConfig[status] || {
            bg: "bg-gray-500/10",
            text: "text-gray-500",
        };

    return (

        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${config.bg} ${config.text}`}
        >

            {status}

        </span>

    );

};

export default IncidentStatusBadge;