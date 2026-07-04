const VALID_METHODS = [
    "GET",
    "POST",
    "HEAD",
];

const validateURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/*
==========================================
Create Service Validation
==========================================
*/

export const validateCreateService = (req, res, next) => {

    const {
        name,
        url,
        method,
        interval,
        timeout,
        expectedStatus,
        failureThreshold,
    } = req.body;

    // Name

    if (
        !name ||
        typeof name !== "string" ||
        !name.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: "Service name is required.",
        });
    }

    // URL

    if (!url) {
        return res.status(400).json({
            success: false,
            message: "Service URL is required.",
        });
    }

    if (!validateURL(url)) {
        return res.status(400).json({
            success: false,
            message: "Invalid service URL.",
        });
    }

    // Method

    if (
        method &&
        !VALID_METHODS.includes(method)
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid HTTP method.",
        });
    }

    // Interval

    if (
        interval !== undefined &&
        (interval < 10 || interval > 3600)
    ) {
        return res.status(400).json({
            success: false,
            message:
                "Interval must be between 10 and 3600 seconds.",
        });
    }

    // Timeout

    if (
        timeout !== undefined &&
        (timeout < 1000 || timeout > 30000)
    ) {
        return res.status(400).json({
            success: false,
            message:
                "Timeout must be between 1000 and 30000 milliseconds.",
        });
    }

    // Expected Status

    if (
        expectedStatus !== undefined &&
        (expectedStatus < 100 || expectedStatus > 599)
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid expected status code.",
        });
    }

    // Failure Threshold

    if (
        failureThreshold !== undefined &&
        (failureThreshold < 1 || failureThreshold > 10)
    ) {
        return res.status(400).json({
            success: false,
            message:
                "Failure threshold must be between 1 and 10.",
        });
    }

    next();
};

/*
==========================================
Update Service Validation
==========================================
*/

export const validateUpdateService = (req, res, next) => {

    const {
        name,
        url,
        method,
        interval,
        timeout,
        expectedStatus,
        failureThreshold,
    } = req.body;

    // Name

    if (
        name !== undefined &&
        (
            typeof name !== "string" ||
            !name.trim()
        )
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid service name.",
        });
    }

    // URL

    if (
        url !== undefined &&
        !validateURL(url)
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid service URL.",
        });
    }

    // Method

    if (
        method !== undefined &&
        !VALID_METHODS.includes(method)
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid HTTP method.",
        });
    }

    // Interval

    if (
        interval !== undefined &&
        (interval < 10 || interval > 3600)
    ) {
        return res.status(400).json({
            success: false,
            message:
                "Interval must be between 10 and 3600 seconds.",
        });
    }

    // Timeout

    if (
        timeout !== undefined &&
        (timeout < 1000 || timeout > 30000)
    ) {
        return res.status(400).json({
            success: false,
            message:
                "Timeout must be between 1000 and 30000 milliseconds.",
        });
    }

    // Expected Status

    if (
        expectedStatus !== undefined &&
        (expectedStatus < 100 || expectedStatus > 599)
    ) {
        return res.status(400).json({
            success: false,
            message:
                "Invalid expected status code.",
        });
    }

    // Failure Threshold

    if (
        failureThreshold !== undefined &&
        (
            failureThreshold < 1 ||
            failureThreshold > 10
        )
    ) {
        return res.status(400).json({
            success: false,
            message:
                "Failure threshold must be between 1 and 10.",
        });
    }

    next();
};