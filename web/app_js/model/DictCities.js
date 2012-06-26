Ext.define('GraceApp.model.DictCities', {
    fields: [
        {
            name: 'id',
            type: 'int',
            useNull: true
        },{
            name: 'name'
        },{
            name: 'id_region',
            type: 'int'
        }
    ],
    extend: 'Ext.data.Model'

    ,validations: [{
        type: 'length',
        field: 'name',
        min: 1
    }]
});
