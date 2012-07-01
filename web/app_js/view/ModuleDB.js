Ext.define('GraceApp.view.ModuleDB', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Ext.tab.Panel',
        
    	'GraceApp.view.TabAP',
    	'GraceApp.view.TabStatus',
    	'GraceApp.view.TabXls',
    	'GraceApp.view.UnitsGrid',
    	
    	'GraceApp.store.DictCities',
    	'GraceApp.store.DictCarrierTypes',
    	'GraceApp.store.DictConstructionTypes',
    	'GraceApp.store.DictMaterials',
    	'GraceApp.store.DictRegions',
    	'GraceApp.store.DictSides',
    	'GraceApp.store.DictStatus'
    ],
    plain: true,
    layout: 'fit',
    initComponent: function() {
    	var _tabPanel =  Ext.create('Ext.tab.Panel', {
    		plain: true,
    		activeTab: 0,
    		items: [] // By default doesn't contain any tabs.
    	});
    	this.items = [_tabPanel];
    	
    	Ext.create('GraceApp.store.DictCities');
        Ext.create('GraceApp.store.DictCarrierTypes');
        Ext.create('GraceApp.store.DictConstructionTypes');
        Ext.create('GraceApp.store.DictMaterials');
        Ext.create('GraceApp.store.DictRegions');
        Ext.create('GraceApp.store.DictSides');
        Ext.create('GraceApp.store.DictStatus');
    	    	
    	Ext.Ajax.request({
            url: GraceApp.store.Urls.url('dictionaries'),
            method: 'GET',
            success: function(response) {
            	// Loading dictionaries, required within module:
            	var dics = Ext.JSON.decode(response.responseText).dictionaries;
                Ext.getStore('DictCarrierTypes').loadData(dics.dict_carrier_types);
                Ext.getStore('DictCities').loadData(dics.dict_cities);
                Ext.getStore('DictConstructionTypes').loadData(dics.dict_construction_types);
                Ext.getStore('DictMaterials').loadData(dics.dict_materials);
                Ext.getStore('DictRegions').loadData(dics.dict_regions);
                Ext.getStore('DictSides').loadData(dics.dict_sides);
                Ext.getStore('DictStatus').loadData(dics.dict_statuses);
                
                // Appending required tabs:
                _tabPanel.add([
                	Ext.create('GraceApp.view.TabAP'),
                	Ext.create('GraceApp.view.TabStatus'),
                	Ext.create('GraceApp.view.TabXls')
                ]);
                _tabPanel.setActiveTab(_tabPanel.getComponent(0)); // Set first added tab as active.
            },
            failure: function() {
            	console.log('Fail to load dictionaries');
            }
    	});
    	
    	this.callParent();
    }
});