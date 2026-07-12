import { useMemo, useState } from "react";

import Card from "@/components/common/Card";

import UserRow from "./UserRow";
import EditRoleModal from "./EditRoleModal";

const UserTable = ({
    users = [],
    filters,
}) => {

    const [selectedUser, setSelectedUser] = useState(null);

    const [open, setOpen] = useState(false);

    const filteredUsers = useMemo(() => {

        return users.filter((user) => {

            const matchesSearch =

                user.username
                    ?.toLowerCase()
                    .includes(filters.search.toLowerCase())

                ||

                user.email
                    ?.toLowerCase()
                    .includes(filters.search.toLowerCase());

            const matchesRole =

                !filters.role ||

                user.role === filters.role;

            return matchesSearch && matchesRole;

        });

    }, [users, filters]);

    const handleEdit = (user) => {

        setSelectedUser(user);

        setOpen(true);

    };

    return (

        <>

            <Card
                title="Users"
                subtitle={`${filteredUsers.length} users found`}
            >

                {

                    filteredUsers.length ? (

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="border-b border-border text-left text-sm text-muted">

                                        <th className="pb-4">

                                            User

                                        </th>

                                        <th className="pb-4">

                                            Email

                                        </th>

                                        <th className="pb-4">

                                            Role

                                        </th>

                                        <th className="pb-4">

                                            Expertise

                                        </th>

                                        <th className="pb-4 text-right">

                                            Actions

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        filteredUsers.map((user) => (

                                            <UserRow

                                                key={user._id}

                                                user={user}

                                                onEdit={handleEdit}

                                            />

                                        ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    ) : (

                        <div className="flex h-52 items-center justify-center rounded-xl border border-dashed border-border">

                            <p className="text-muted">

                                No users found.

                            </p>

                        </div>

                    )

                }

            </Card>

            {

                selectedUser && (

                    <EditRoleModal

                        open={open}

                        onClose={() => setOpen(false)}

                        user={selectedUser}

                    />

                )

            }

        </>

    );

};

export default UserTable;