Ext.define('GraceApp.model.UnitPassport', {
    fields: [
        {
            name: 'id',
            type: 'int',
            useNull: true
        },{
            name: 'id_city',
            type: 'int',
            allowBlank: false,
            useNull: true
        },{
            name: 'id_construction',
            type: 'int',
            allowBlank: false,
            useNull: true
        },{
            name: 'address',
            allowBlank: false
        },{
            name: 'id_side',
            type: 'int',
            allowBlank: false,
            useNull: true
        },{
            name: 'lighting',
            type: 'int',
            allowBlank: false,
            useNull: true
        },{
            name: 'code_side'
        },{
            name: 'code_construction'
        },{
            name: 'foto'
        },{
            name: 'scheme'
        },{
            name: 'id_carrier',
            type: 'int',
            useNull: true
        },{
            name: 'id_material',
            type: 'int',
            allowBlank: false,
            useNull: true
        },{
            name: 'price',
            type: 'float'
        },{
            name: 'installation',
            type: 'float'
        },{
            name: 'tax',
            type: 'float'
        },{
            name: 'code_espar'
        },{
            name: 'grp'
        },{
            name: 'address_russian_grace'
        },{
            name: 'address_english_grace'
        },{
            name: 'unit_code_grace_new'
        },{
            name: 'latitude',
            type: 'float'
        },{
            name: 'longitude',
            type: 'float'
        },{
            name: 'lastknown_availability',
            type: 'date',
            dateFormat: 'd.m.Y'
        },{
            name: 'ownership',
            type: 'int',
            useNull: true
        },{
            name: 'unit_code_suppl'
        }
    ],
    extend: 'Ext.data.Model'

    //,validations: [{
            //type: 'length',
            //field: 'firstName',
            //min: 1
        //},{
            //type: 'length',
            //field: 'secondName',
            //min: 1
        //}
    //]
});
