Ext.define('GraceApp.store.DictStatus', {
    extend: 'GraceApp.store.CustomStore',

    storeId: 'DictStatus',
    autoSync: false,
    autoLoad: false,
     
    model: 'GraceApp.model.DictStatus'
});