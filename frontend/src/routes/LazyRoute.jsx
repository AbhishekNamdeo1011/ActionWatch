import { Suspense } from "react";

const LazyRoute = ({ children }) => {
    return (
        <Suspense
            fallback={
                <div className="min-h-[calc(100vh-80px)] bg-background" />
            }
        >
            {children}
        </Suspense>
    );
};

export default LazyRoute;