const { AuthenticationError } = require('apollo-server-express');
const { ROLE } = require('../enums');
const { AUTH_MODE } = require('../constants')

// usage: auth([ROLE.ADMIN])((parent, args, context) => { ... })
// returns: (parent, args, context) => { ... }
module.exports.auth = (roles) => (resolverFn) => {
    function wrappedResolver(parent, args, context) {
        if (AUTH_MODE) {
            if (!context.user || !roles.includes(context.user.role)) {
                throw new AuthenticationError();
            }
        }
        return resolverFn(parent, args, context);
    }

    wrappedResolver.displayName = resolverFn.displayName || resolverFn.name;

    return wrappedResolver;
};

module.exports.ROLE = ROLE;