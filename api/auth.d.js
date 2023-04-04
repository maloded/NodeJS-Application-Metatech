({
    dependencies: ['node.fs', 'db', 'common'],

    signin: {
        parameters: {
            login: 'string',
            password: 'string',
        },
        retunrs: {
            status: 'string',
            token: 'string',
        }
    },

    signout: {
        returns: { status: 'string' },
    },

    restore: {
        parameters: { token: 'string' },
        returns: { status: 'string' },
    },
});