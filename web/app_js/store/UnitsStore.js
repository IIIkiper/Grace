Ext.define('GraceApp.store.UnitsStore', {
    extend: 'GraceApp.store.CustomStore',

    requires  : ['Ext.data.proxy.Ajax'],
    model: 'GraceApp.model.UnitPassport',

    autoSync: true,
    autoLoad: false,
    pageSize: 100,
    
    storeId: 'UnitsStore',
    remoteSort: true,
    proxy: {
        type: 'ajax',
        api: {
            read:    GraceApp.store.Urls.url('crud/read/units/'),
            update:  GraceApp.store.Urls.url('crud/update/units/'),
            create:  GraceApp.store.Urls.url('crud/create/units/'),
            destroy: GraceApp.store.Urls.url('crud/delete/units/')
        },

        reader: {
            type: 'json',
            root: 'names',
            idProperty: 'id',
            totalProperty: 'total'
        },
        writer: {
            type: 'json',
            writeAllFields: false,
            root: 'names'
        }
    }
});
