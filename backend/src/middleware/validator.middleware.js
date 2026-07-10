import { body, validationResult } from "express-validator";

const allowedRoles = ["admin", "responder", "viewer"];

 const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			message: "Validation failed",
			errors: errors.array().map((error) => ({
				field: error.path,
				message: error.msg,
			})),
		});
	}

	next();
};
const validateRegistration = [
	body("username")
		.trim()
		.notEmpty()
		.withMessage("Username is required")
		.isLength({ min: 3 })
		.withMessage("Username must be at least 3 characters long"),
	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Valid email is required")
		.normalizeEmail(),
	body("password")
		.isString()
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
	body("expertise")
		.optional()
		.isArray()
		.withMessage("Expertise must be an array of skills"),
        handleValidationErrors
];
const validateLogin = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Valid email is required")
        .normalizeEmail(),
	
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
	,
	handleValidationErrors
];
const validateUpdateProfile = [
    body("username")
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters"),

    body("expertise")
        .optional()
        .isArray()
        .withMessage("Expertise must be an array"),

    handleValidationErrors
];

export { validateRegistration, validateLogin, validateUpdateProfile };