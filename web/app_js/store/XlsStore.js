Ext.define('GraceApp.store.XlsStore', {
	extend: 'GraceApp.store.CustomStore',
	storeId: 'XlsStore',
	autoSync: false,
	autoLoad: false,
	model: 'GraceApp.model.XlsModel'
});