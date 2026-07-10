import { useForm } from "react-hook-form";

const IncidentForm = ({
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
            className="space-y-5"
        >

            <div>

                <label className="mb-2 block text-sm font-medium">

                    Title

                </label>

                <input

                    {...register("title")}

                    className="w-full rounded-xl border border-border bg-background p-3"

                />

            </div>

            <div>

                <label className="mb-2 block text-sm font-medium">

                    Description

                </label>

                <textarea

                    rows={5}

                    {...register("description")}

                    className="w-full rounded-xl border border-border bg-background p-3"

                />

            </div>

            <div className="grid gap-4 md:grid-cols-2">

                <div>

                    <label className="mb-2 block">

                        Severity

                    </label>

                    <select

                        {...register("severity")}

                        className="w-full rounded-xl border border-border bg-background p-3"

                    >

                        <option value="P0">P0</option>

                        <option value="P1">P1</option>

                        <option value="P2">P2</option>

                        <option value="P3">P3</option>

                    </select>

                </div>

                <div>

                    <label className="mb-2 block">

                        Status

                    </label>

                    <select

                        {...register("status")}

                        className="w-full rounded-xl border border-border bg-background p-3"

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

            <button

                type="submit"

                disabled={isSubmitting}

                className="rounded-xl bg-primary px-6 py-3 text-white"

            >

                {

                    isSubmitting

                        ? "Saving..."

                        : "Save Changes"

                }

            </button>

        </form>

    );

};

export default IncidentForm;