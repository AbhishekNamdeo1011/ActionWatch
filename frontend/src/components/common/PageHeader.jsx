const PageHeader = ({
    title,
    description,
    action,
}) => {

    return (

        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

                <h1 className="text-3xl font-bold text-foreground">

                    {title}

                </h1>

                <p className="mt-2 text-sm text-muted">

                    {description}

                </p>

            </div>

            {action && (

                <div>

                    {action}

                </div>

            )}

        </div>

    );

};

export default PageHeader;