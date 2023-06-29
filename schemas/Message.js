({
    Entity: {},

    thread: '?Message', // parent message

    chat: 'Chat',
    area: 'Area',
    from: 'Account',

    data: {
        type: 'json',
        schema: {
            kind: { enum: ['text', 'image', 'video', 'file'] },
            media: { array: 'string', require: false },
            text: { type: 'string', require: false },
        },
    },
});
