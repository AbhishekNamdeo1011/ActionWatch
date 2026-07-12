import Card from "@/components/common/Card";

const WarRoomHeader = ({ incident }) => {

    return (

        <Card>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        {incident.title}

                    </h1>

                    <p className="mt-2 text-muted">

                        Live Incident Response Room

                    </p>

                </div>

                <div className="flex flex-wrap gap-3">

                    <span className="rounded-full bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-500">

                        {incident.severity}

                    </span>

                    <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold capitalize text-blue-500">

                        {incident.status}

                    </span>

                    <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-500">

                        {incident.service?.name}

                    </span>

                </div>

            </div>

        </Card>

    );

};

export default WarRoomHeader;