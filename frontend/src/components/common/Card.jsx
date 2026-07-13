import { memo } from "react";

const Card = ({
    title,
    subtitle,
    action,
    children,
    className = "",
}) => {

    return (

<section
    className={`w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-card ${className}`}
>            {(title || action) && (

                <div className="flex items-center justify-between border-b border-border px-6 py-5">

                    <div>

                        {title && (

                            <h3 className="text-lg font-semibold text-foreground">

                                {title}

                            </h3>

                        )}

                        {subtitle && (

                            <p className="mt-1 text-sm text-muted">

                                {subtitle}

                            </p>

                        )}

                    </div>

                    {action}

                </div>

            )}

            <div className="p-6">

                {children}

            </div>

        </section>

    );

};

export default memo(Card);