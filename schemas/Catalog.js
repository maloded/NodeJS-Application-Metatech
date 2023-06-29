({
    Registry: {},

    parent: '?Catalog',
    name: { type: 'string', index: true },
    entities: { many: 'Indentifier' },

    naturalKey: { unique: ['parent', 'name'] },
});
