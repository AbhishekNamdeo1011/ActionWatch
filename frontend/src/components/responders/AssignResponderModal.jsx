import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Card from "@/components/common/Card";

import { useUsers } from "@/hooks/users/useUsers";
import { useAssignResponder } from "@/hooks/responder/useAssignResponder";

import UserCard from "./UserCard";

const AssignResponderModal = ({
    open,
    onClose,
    incident,
}) => {

    const queryClient = useQueryClient();

    const {
        data: users = [],
        isLoading,
    } = useUsers();

    const assignResponder = useAssignResponder();

    const [search, setSearch] = useState("");

    const [assigningUserId, setAssigningUserId] = useState(null);

    if (!open) return null;

    const assignedIds = incident?.assignedTo?.map(
        (user) => user._id
    ) || [];

    const filteredUsers = users.filter((user) => {

        const matchesSearch = user.username
            .toLowerCase()
            .includes(search.toLowerCase());

        const notAssigned = !assignedIds.includes(user._id);

        return matchesSearch && notAssigned;

    });

    const handleAssign = async (userId) => {

        try {

            setAssigningUserId(userId);

            await assignResponder.mutateAsync({

                incidentId: incident._id,

                userId,

            });

         

            onClose();

        } finally {

            setAssigningUserId(null);

        }

    };

    return (

        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
            onClick={onClose}
        >

            <div
                className="w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()}
            >

                <Card
                    title="Assign Responders"
                    subtitle="Assign available responders to this incident."
                    action={
                        <button
                            onClick={onClose}
                            className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-background"
                        >
                            Close
                        </button>
                    }
                >

                    <input
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search responder..."
                        className="mb-5 h-11 w-full rounded-xl border border-border bg-background px-4"
                    />

                    {

                        isLoading ? (

                            <div className="flex h-40 items-center justify-center">

                                <p className="text-muted">

                                    Loading users...

                                </p>

                            </div>

                        ) : filteredUsers.length ? (

                            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">

                                {

                                    filteredUsers.map((user) => (

                                        <UserCard

                                            key={user._id}

                                            user={user}

                                            loading={
                                                assigningUserId === user._id
                                            }

                                            onAssign={() =>
                                                handleAssign(user._id)
                                            }

                                        />

                                    ))

                                }

                            </div>

                        ) : (

                            <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border">

                                <p className="text-muted">

                                    No available responders found.

                                </p>

                            </div>

                        )

                    }

                </Card>

            </div>

        </div>

    );

};

export default AssignResponderModal;