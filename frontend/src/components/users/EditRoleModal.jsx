import { useState } from "react";

import Card from "@/components/common/Card";
import { useUpdateUserRole } from "@/hooks/users/useUpdateUserRole";

const ROLES = [

    "admin",

    "responder",

    "viewer",

];

const EditRoleModal = ({
    open,
    onClose,
    user,
}) => {

    const mutation = useUpdateUserRole();

    const [role, setRole] = useState(user.role);

    if (!open) return null;

    const handleClose = () => {

        setRole(user.role);

        onClose();

    };

    const handleSubmit = async () => {

        if (role === user.role) {

            handleClose();

            return;

        }

        await mutation.mutateAsync({

            userId: user._id,

            role,

        });

        handleClose();

    };

    return (

        <div

            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"

            onClick={handleClose}

        >

            <div

                className="w-full max-w-md"

                onClick={(e) => e.stopPropagation()}

            >

                <Card

                    title="Update User Role"

                    subtitle="Change user's role."

                    action={

                        <button

                            onClick={handleClose}

                            className="rounded-lg border border-border px-3 py-2"

                        >

                            Close

                        </button>

                    }

                >

                    <div className="space-y-5">

                        <div>

                            <label className="mb-2 block text-sm font-medium">

                                Username

                            </label>

                            <input

                                disabled

                                value={user.username}

                                className="h-11 w-full rounded-xl border border-border bg-background px-4"

                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium">

                                Email

                            </label>

                            <input

                                disabled

                                value={user.email}

                                className="h-11 w-full rounded-xl border border-border bg-background px-4"

                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium">

                                Role

                            </label>

                            <select

                                value={role}

                                onChange={(e) => setRole(e.target.value)}

                                className="h-11 w-full rounded-xl border border-border bg-background px-4"

                            >

                                {

                                    ROLES.map((item) => (

                                        <option

                                            key={item}

                                            value={item}

                                        >

                                            {item.charAt(0).toUpperCase() + item.slice(1)}

                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                        <div className="flex justify-end gap-3 border-t border-border pt-5">

                            <button

                                onClick={handleClose}

                                className="rounded-xl border border-border px-5 py-2"

                            >

                                Cancel

                            </button>

                            <button

                                onClick={handleSubmit}

                                disabled={mutation.isPending}

                                className="rounded-xl bg-primary px-5 py-2 text-white disabled:opacity-60"

                            >

                                {

                                    mutation.isPending

                                        ? "Updating..."

                                        : "Update Role"

                                }

                            </button>

                        </div>

                    </div>

                </Card>

            </div>

        </div>

    );

};

export default EditRoleModal;