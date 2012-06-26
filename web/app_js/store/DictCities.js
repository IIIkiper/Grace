Ext.define('GraceApp.store.DictCities', {
    extend: 'GraceApp.store.CustomStore',

    requires  : ['Ext.data.proxy.Ajax'],
    model: 'GraceApp.model.DictCities',
    storeId: 'DictCities',

    autoSync: false,
    autoLoad: false,
    proxy: {
        type: 'ajax',
        api: {
            //read:    'crud/read/dict_cities/',
            update:  GraceApp.store.Urls.url('crud.php?act=update'),
            create:  GraceApp.store.Urls.url('crud.php?act=create'),
            destroy: GraceApp.store.Urls.url('crud.php?act=delete')
        },

        reader: {
            type: 'json',
            root: 'names',
            idProperty: 'id'
        }
        //,writer: {
            //type: 'json',
            //writeAllFields: false,
            //root: 'names'
        //}
    }
});
