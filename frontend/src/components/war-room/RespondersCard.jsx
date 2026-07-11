import Card from "@/components/common/Card";

const RespondersCard = ({ responders = [] }) => {

    return (

        <Card title="Assigned Responders">

            {

                responders.length ? (

                    <div className="grid gap-4 md:grid-cols-2">

                        {

                            responders.map((user) => (

                                <div

                                    key={user._id}

                                    className="rounded-xl border border-border p-4"

                                >

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <h3 className="font-semibold">

                                                {user.username}

                                            </h3>

                                            <p className="text-sm text-muted">

                                                {user.email}

                                            </p>

                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">

                                            {

                                                user.username

                                                    ?.charAt(0)

                                                    .toUpperCase()

                                            }

                                        </div>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                ) : (

                    <p className="text-muted">

                        No responders assigned.

                    </p>

                )

            }

        </Card>

    );

};

export default RespondersCard;