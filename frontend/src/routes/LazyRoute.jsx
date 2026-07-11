import { Suspense } from "react";

import PageLoader from "@/components/common/PageLoader";

const LazyRoute = ({ children }) => {
    return (
        <Suspense fallback={<PageLoader />}>
            {children}
        </Suspense>
    );
};

export default LazyRoute;