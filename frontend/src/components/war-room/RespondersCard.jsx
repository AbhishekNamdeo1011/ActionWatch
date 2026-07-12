import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Card from "@/components/common/Card";
import { useRemoveResponder } from "@/hooks/responder/useRemoveResponder";
import { useAuth } from "@/hooks/auth/useAuth";

const RespondersCard = ({
    responders = [],
    incidentId,
}) => {

    const removeResponder = useRemoveResponder();

    const queryClient = useQueryClient();

    const { user } = useAuth();

    const [removingUserId, setRemovingUserId] = useState(null);

    const canManageResponders =
        user?.role === "admin" ||
        user?.role === "owner";

    const handleRemove = async (userId) => {

        const confirmed = window.confirm(
            "Remove this responder from the incident?"
        );

        if (!confirmed) return;

        try {

            setRemovingUserId(userId);

            await removeResponder.mutateAsync({

                incidentId,

                userId,

            });

            await queryClient.invalidateQueries({

                queryKey: ["incident", incidentId],

            });

            await queryClient.invalidateQueries({

                queryKey: ["incidents"],

            });

        } finally {

            setRemovingUserId(null);

        }

    };

    return (

        <Card title="Assigned Responders">

            {responders.length ? (

                    <div className="grid gap-4 md:grid-cols-2">

                    {responders.map((responder) => (

                                <div
                            key={responder._id}
                            className="rounded-xl border border-border bg-background p-5 transition hover:border-primary"
                                >

                            <div className="flex items-start justify-between">

                                        <div>

                                    <h3 className="text-lg font-semibold text-foreground">

                                        {responder.username}

                                            </h3>

                                    <p className="mt-1 text-sm text-muted">

                                        {responder.email}

                                            </p>

                                        </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">

                                    {responder.username
                                                    ?.charAt(0)
                                        .toUpperCase()}

                                </div>

                            </div>

                            <div className="mt-5 flex items-center justify-between">

                                <span
                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize
                                    ${
                                        responder.role === "owner"
                                            ? "bg-red-500/10 text-red-500"
                                            : responder.role === "admin"
                                            ? "bg-blue-500/10 text-blue-500"
                                            : responder.role === "responder"
                                            ? "bg-yellow-500/10 text-yellow-500"
                                            : "bg-green-500/10 text-green-500"
                                    }`}
                                >

                                    {responder.role}

                                </span>

                                {canManageResponders &&
                                    responder._id !== user?._id && (

                                        <button
                                            onClick={() =>
                                                handleRemove(
                                                    responder._id
                                                )
                                            }
                                            disabled={
                                                removingUserId ===
                                                responder._id
                                            }
                                            className="rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                                        >

                                            {removingUserId ===
                                            responder._id
                                                ? "Removing..."
                                                : "Remove"}

                                        </button>

                                    )}

                                        </div>

                                    </div>

                    ))}

                    </div>

                ) : (

                <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-border">

                    <p className="text-muted">

                        No responders assigned.

                    </p>

                </div>

            )}

        </Card>

    );

};

export default RespondersCard;