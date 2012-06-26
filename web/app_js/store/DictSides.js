Ext.define('GraceApp.store.DictSides', {
    extend: 'GraceApp.store.CustomStore',

    requires  : ['Ext.data.proxy.Ajax'],
    model: 'GraceApp.model.CommonDictionary',
    storeId: 'DictSides',

    autoSync: false,
    autoLoad: false,
    proxy: {
        type: 'ajax',
        api: {
            //read:    'crud/read/dict_cities/',
            //update:  'crud.php?act=update',
            //create:  'crud.php?act=create',
            //destroy: 'crud.php?act=delete'
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
