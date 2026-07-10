const userRole = "owner";

const RoleRoute = ({
    roles,
    children
}) => {

    if (!roles.includes(userRole)) {

        return <h1>403 Forbidden</h1>;

    }

    return children;

};

export default RoleRoute;