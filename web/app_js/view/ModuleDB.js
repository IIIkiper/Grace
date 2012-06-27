Ext.define('GraceApp.view.ModuleDB', {
    extend: 'Ext.container.Viewport',
    requires: ['GraceApp.view.UnitsGrid', 'GraceApp.view.PartnerStatusGrid', 'GraceApp.view.XlsView', 'Ext.tab.Panel'],
    plain: true,
    layout: 'fit',
    items: [
    	Ext.create('Ext.tab.Panel', {
    		plain: true,
    		activeTab: 1,
    		items: [
    			//Ext.create('GraceApp.view.UnitsGrid'),
//    			Ext.create('GraceApp.view.PartnerStatusGrid', {
//    				title: 'Статусы сторон'
//    			}),
    			Ext.create('GraceApp.view.XlsView')
    		]
    	})
    ]
});