import { useForm } from "react-hook-form";
import { useServices } from "@/hooks/services/useServices";
const IncidentForm = ({
    defaultValues,
    onSubmit,
    isSubmitting,
}) => {
const {
    data: services = [],
    isLoading: servicesLoading,
} = useServices();

    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues,
    });

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >

            {/* Title */}

            <div>

                <label className="mb-2 block text-sm font-medium text-foreground">

                    Title

                </label>

                <input
                    {...register("title")}
                    placeholder="Payment API is down"
                    className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
                />

            </div>

            {/* Description */}

            <div>

                <label className="mb-2 block text-sm font-medium text-foreground">

                    Description

                </label>

                <textarea
                    rows={6}
                    {...register("description")}
                    placeholder="Describe the incident..."
                    className="w-full rounded-xl border border-border bg-background p-4 text-sm outline-none transition focus:border-primary"
                />

            </div>

            {/* Severity + Status */}

            <div className="grid gap-5 md:grid-cols-2">

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Severity

                    </label>

                    <select
                        {...register("severity")}
                        className="h-11 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"
                    >

                        <option value="P0">P0 - Critical</option>

                        <option value="P1">P1 - High</option>

                        <option value="P2">P2 - Medium</option>

                        <option value="P3">P3 - Low</option>

                    </select>

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Status

                    </label>

                    <select
                        {...register("status")}
                        className="h-11 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"
                    >

                        <option value="open">Open</option>

                        <option value="investigating">

                            Investigating

                        </option>

                        <option value="resolved">

                            Resolved

                        </option>

                    </select>

                </div>

            </div>

            {/* Service + Detected By */}

            <div className="grid gap-5 md:grid-cols-2">

              <div>

    <label className="mb-2 block text-sm font-medium">

        Service

    </label>

    <select
        {...register("service")}
        className="h-11 w-full rounded-xl border border-border bg-background px-4"
    >

        <option value="">

            Select Service

        </option>

        {

            services.map((service) => (

                <option
                    key={service._id}
                    value={service._id}
                >

                    {service.name}

                </option>

            ))

        }

    </select>

</div>

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Detected By

                    </label>

                    <select
                        {...register("detectedBy")}
                        className="h-11 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"
                    >

                        <option value="monitor">

                            Monitor

                        </option>

                        <option value="user">

                            User

                        </option>

                        <option value="manual">

                            Manual

                        </option>

                    </select>

                </div>

            </div>

            {/* Users + Logs */}

            <div className="grid gap-5 md:grid-cols-2">

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Affected Users

                    </label>

                    <input
                        type="number"
                        {...register("affectedUsers")}
                        className="h-11 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"
                    />

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Error Logs

                    </label>

                    <textarea
                        rows={4}
                        {...register("errorLogs")}
                        placeholder="Paste stack trace or logs..."
                        className="w-full rounded-xl border border-border bg-background p-4 text-sm outline-none transition focus:border-primary"
                    />

                </div>

            </div>

            {/* Footer */}

            <div className="sticky bottom-0 flex justify-end border-t border-border bg-surface pt-6">

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                >

                    {isSubmitting
                        ? "Saving..."
                        : "Save Incident"}

                </button>

            </div>

        </form>

    );

};

export default IncidentForm;