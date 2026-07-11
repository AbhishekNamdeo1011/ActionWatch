import { useParams } from "react-router-dom";

import PageHeader from "@/components/common/PageHeader";
import Card from "@/components/common/Card";

import { useService } from "@/hooks/useService";

const ServiceDetails = () => {

    const { serviceId } = useParams();

    const {

        data: service,

        isLoading,

        error,

    } = useService(serviceId);

    if (isLoading) {

        return <h2>Loading...</h2>;

    }

    if (error) {

        return <h2>Failed to load service.</h2>;

    }

    return (

        <>

            <PageHeader

                title={service.name}

                description={service.description}

            />

            <div className="grid gap-6 lg:grid-cols-4">

                <Card title="Status">

                    <h2 className="text-2xl font-bold">

                        {service.currentStatus}

                    </h2>

                </Card>

                <Card title="Response Time">

                    <h2 className="text-2xl font-bold">

                        {service.lastResponseTime ?? "--"} ms

                    </h2>

                </Card>

                <Card title="Expected Status">

                    <h2 className="text-2xl font-bold">

                        {service.expectedStatus}

                    </h2>

                </Card>

                <Card title="Monitoring">

                    <h2 className="text-2xl font-bold">

                        {service.isActive ? "Enabled" : "Disabled"}

                    </h2>

                </Card>

            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">

                <Card title="Service Information">

                    <div className="space-y-3">

                        <Info
                            label="URL"
                            value={service.url}
                        />

                        <Info
                            label="Method"
                            value={service.method}
                        />

                        <Info
                            label="Timeout"
                            value={`${service.timeout} ms`}
                        />

                        <Info
                            label="Interval"
                            value={`${service.interval} sec`}
                        />

                        <Info
                            label="Failure Threshold"
                            value={service.failureThreshold}
                        />

                    </div>

                </Card>

                <Card title="Current Incident">

                    {

                        service.activeIncident

                            ?

                            <p>

                                Incident Active

                            </p>

                            :

                            <p>

                                No Active Incident

                            </p>

                    }

                </Card>

            </div>

        </>

    );

};

const Info = ({ label, value }) => (

    <div className="flex justify-between border-b border-border py-3">

        <span className="text-muted">

            {label}

        </span>

        <span className="font-medium">

            {value}

        </span>

    </div>

);

export default ServiceDetails;