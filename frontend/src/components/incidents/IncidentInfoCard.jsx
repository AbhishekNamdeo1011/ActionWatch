const IncidentInfoCard = ({

    label,

    value,

}) => {

    return (

        <div className="rounded-xl border border-border bg-surface p-5">

            <p className="text-sm text-muted">

                {label}

            </p>

            <h3 className="mt-2 text-lg font-semibold text-foreground">

                {value || "-"}

            </h3>

        </div>

    );

};

export default IncidentInfoCard;