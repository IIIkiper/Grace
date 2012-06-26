Ext.define('GraceApp.model.CommonDictionary', {
    fields: [
        {
            name: 'id',
            type: 'int',
            useNull: true
        },{
            name: 'name'
        }
    ],
    extend: 'Ext.data.Model'

    ,validations: [{
        type: 'length',
        field: 'name',
        min: 1
    }]
});
