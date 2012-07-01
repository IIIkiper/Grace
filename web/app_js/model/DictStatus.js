Ext.define('GraceApp.model.DictStatus', {
	extend: 'Ext.data.Model',
    fields: [
        {
            name: 'id',
            type: 'int',
            useNull: true
        },{
            name: 'name'
        },{
            name: 'color',
            useNull: true
        }
    ],
    validations: [
	    {
	        type: 'length',
	        field: 'name',
	        min: 1
	    }
    ]
});