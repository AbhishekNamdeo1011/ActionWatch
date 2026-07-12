import { useEffect, useState } from "react";

import Card from "@/components/common/Card";

import { useUpdateProfile } from "@/hooks/useUpdateProfile";

const ROLE_STYLES = {

    owner: "bg-red-500/10 text-red-500",

    admin: "bg-blue-500/10 text-blue-500",

    responder: "bg-yellow-500/10 text-yellow-500",

    viewer: "bg-green-500/10 text-green-500",

};

const ProfileForm = ({ user }) => {

    const mutation = useUpdateProfile();

    

  const [username, setUsername] = useState( user.username);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!username.trim()) return;

        if (username === user.username) return;

        await mutation.mutateAsync({

            username,

        });

    };

    return (

        <Card

            title="Edit Profile"

            subtitle="Update your account information."

        >

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* Username */}

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Username

                    </label>

                    <input

                        value={username}

                        onChange={(e) =>

                            setUsername(e.target.value)

                        }

                        className="h-11 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"

                    />

                </div>

                {/* Email */}

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Email

                    </label>

                    <input

                        disabled

                        value={user.email}

                        className="h-11 w-full rounded-xl border border-border bg-background px-4 opacity-70"

                    />

                </div>

                {/* Role */}

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Role

                    </label>

                    <div>

                        <span
                            className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold capitalize ${ROLE_STYLES[user.role]}`}
                        >

                            {user.role}

                        </span>

                    </div>

                </div>

                {/* Expertise */}

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Expertise

                    </label>

                    {

                        user.expertise?.length ? (

                            <div className="flex flex-wrap gap-2">

                                {

                                    user.expertise.map((item) => (

                                        <span

                                            key={item}

                                            className="rounded-full bg-background px-3 py-1 text-sm"

                                        >

                                            {item}

                                        </span>

                                    ))

                                }

                            </div>

                        ) : (

                            <p className="text-sm text-muted">

                                No expertise added.

                            </p>

                        )

                    }

                </div>

                {/* Footer */}

                <div className="border-t border-border pt-5">

                    <button

                        type="submit"

                        disabled={mutation.isPending}

                        className="rounded-xl bg-primary px-6 py-2 font-medium text-white transition hover:bg-primary-hover disabled:opacity-60"

                    >

                        {

                            mutation.isPending

                                ? "Updating..."

                                : "Save Changes"

                        }

                    </button>

                </div>

            </form>

        </Card>

    );

};

export default ProfileForm;