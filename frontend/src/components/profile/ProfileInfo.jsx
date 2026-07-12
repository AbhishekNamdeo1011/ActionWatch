import Card from "@/components/common/Card";

const ProfileInfo = ({ user }) => {

    if (!user) return null;

    return (

        <Card
            title="Account Information"
            subtitle="Overview of your account."
        >

            <div className="grid gap-6 sm:grid-cols-2">

                {/* Username */}

                <div>

                    <p className="text-sm text-muted">

                        Username

                    </p>

                    <h3 className="mt-2 text-lg font-semibold">

                        {user.username}

                    </h3>

                </div>

                {/* Email */}

                <div>

                    <p className="text-sm text-muted">

                        Email

                    </p>

                    <h3 className="mt-2 text-lg font-semibold break-all">

                        {user.email}

                    </h3>

                </div>

                {/* Role */}

                <div>

                    <p className="text-sm text-muted">

                        Role

                    </p>

                    <h3 className="mt-2 text-lg font-semibold capitalize">

                        {user.role}

                    </h3>

                </div>

                {/* Expertise */}

                <div>

                    <p className="text-sm text-muted">

                        Expertise

                    </p>

                    <h3 className="mt-2 text-lg font-semibold">

                        {

                            user.expertise?.length

                                ? user.expertise.join(", ")

                                : "Not Added"

                        }

                    </h3>

                </div>

            </div>

            <div className="mt-8 border-t border-border pt-6">

                <h3 className="text-lg font-semibold">

                    Coming Soon

                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">

                    <div className="rounded-xl border border-dashed border-border p-4">

                        <h4 className="font-medium">

                            Change Password

                        </h4>

                        <p className="mt-2 text-sm text-muted">

                            Update your account password securely.

                        </p>

                    </div>

                    <div className="rounded-xl border border-dashed border-border p-4">

                        <h4 className="font-medium">

                            Two-Factor Authentication

                        </h4>

                        <p className="mt-2 text-sm text-muted">

                            Add an extra layer of security.

                        </p>

                    </div>

                    <div className="rounded-xl border border-dashed border-border p-4">

                        <h4 className="font-medium">

                            Active Sessions

                        </h4>

                        <p className="mt-2 text-sm text-muted">

                            View and manage logged-in devices.

                        </p>

                    </div>

                    <div className="rounded-xl border border-dashed border-border p-4">

                        <h4 className="font-medium">

                            Profile Picture

                        </h4>

                        <p className="mt-2 text-sm text-muted">

                            Upload and manage your profile image.

                        </p>

                    </div>

                </div>

            </div>

        </Card>

    );

};

export default ProfileInfo;