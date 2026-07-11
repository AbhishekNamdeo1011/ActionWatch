import { useForm } from "react-hook-form";

const ServiceForm = ({
    defaultValues,
    onSubmit,
    isSubmitting,
}) => {

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

            {/* Name */}

            <div>

                <label className="mb-2 block text-sm font-medium">

                    Service Name

                </label>

                <input
                    {...register("name")}
                    placeholder="Payment API"
                    className="h-11 w-full rounded-xl border border-border bg-background px-4 outline-none focus:border-primary"
                />

            </div>

            {/* Description */}

            <div>

                <label className="mb-2 block text-sm font-medium">

                    Description

                </label>

                <textarea
                    rows={4}
                    {...register("description")}
                    placeholder="Handles payment transactions..."
                    className="w-full rounded-xl border border-border bg-background p-4 outline-none focus:border-primary"
                />

            </div>

            {/* URL */}

            <div>

                <label className="mb-2 block text-sm font-medium">

                    Health Check URL

                </label>

                <input
                    {...register("url")}
                    placeholder="https://api.example.com/health"
                    className="h-11 w-full rounded-xl border border-border bg-background px-4 outline-none focus:border-primary"
                />

            </div>

            {/* Method + Expected Status */}

            <div className="grid gap-5 md:grid-cols-2">

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        HTTP Method

                    </label>

                    <select
                        {...register("method")}
                        className="h-11 w-full rounded-xl border border-border bg-background px-4"
                    >

                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>

                    </select>

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Expected Status

                    </label>

                    <input
                        type="number"
                        {...register("expectedStatus")}
                        className="h-11 w-full rounded-xl border border-border bg-background px-4"
                    />

                </div>

            </div>

            {/* Interval + Timeout */}

            <div className="grid gap-5 md:grid-cols-2">

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Interval (seconds)

                    </label>

                    <input
                        type="number"
                        {...register("interval")}
                        className="h-11 w-full rounded-xl border border-border bg-background px-4"
                    />

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Timeout (ms)

                    </label>

                    <input
                        type="number"
                        {...register("timeout")}
                        className="h-11 w-full rounded-xl border border-border bg-background px-4"
                    />

                </div>

            </div>

            {/* Failure Threshold */}

            <div>

                <label className="mb-2 block text-sm font-medium">

                    Failure Threshold

                </label>

                <input
                    type="number"
                    {...register("failureThreshold")}
                    className="h-11 w-full rounded-xl border border-border bg-background px-4"
                />

            </div>

            <div className="flex justify-end">

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-primary px-6 py-3 text-white"
                >

                    {isSubmitting
                        ? "Saving..."
                        : "Create Service"}

                </button>

            </div>

        </form>

    );

};

export default ServiceForm;