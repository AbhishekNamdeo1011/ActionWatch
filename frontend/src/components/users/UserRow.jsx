import { Pencil } from "lucide-react";

const ROLE_STYLES = {

    owner: "bg-red-500/10 text-red-500",

    admin: "bg-blue-500/10 text-blue-500",

    responder: "bg-yellow-500/10 text-yellow-500",

    viewer: "bg-green-500/10 text-green-500",

};

const UserRow = ({
    user,
    onEdit,
}) => {

    return (

        <tr className="border-b border-border transition hover:bg-background">

            <td className="py-4">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">

                        {user.username?.charAt(0).toUpperCase()}

                    </div>

                    <div>

                        <h3 className="font-medium">

                            {user.username}

                        </h3>

                    </div>

                </div>

            </td>

            <td className="py-4 text-muted">

                {user.email}

            </td>

            <td className="py-4">

                <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${ROLE_STYLES[user.role]}`}
                >

                    {user.role}

                </span>

            </td>

            <td className="py-4">

                {

                    user.expertise?.length ? (

                        <div className="flex flex-wrap gap-2">

                            {

                                user.expertise.map((item) => (

                                    <span
                                        key={item}
                                        className="rounded-full bg-background px-3 py-1 text-xs"
                                    >

                                        {item}

                                    </span>

                                ))

                            }

                        </div>

                    ) : (

                        <span className="text-muted">

                            —

                        </span>

                    )

                }

            </td>

            <td className="py-4 text-right">

                {

                    user.role !== "owner" && (

                        <button

                            onClick={() => onEdit(user)}

                            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm transition hover:bg-background"

                        >

                            <Pencil size={16} />

                            Edit Role

                        </button>

                    )

                }

            </td>

        </tr>

    );

};

export default UserRow;