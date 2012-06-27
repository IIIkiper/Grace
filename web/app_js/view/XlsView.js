Ext.define('GraceApp.view.XlsView', {
	extend: 'Ext.panel.Panel',
	requires: ['Ext.grid.Panel', 'Ext.toolbar.Toolbar'],
	initComponent: function() {		
		var _this = this;
		
		// Grid with .xls/.ods data
		var _xlsGrid = Ext.create('Ext.panel.Panel', {
			region: 'center',
			//margins: '5 0 0 0',
			tbar: Ext.create('Ext.toolbar.Toolbar', {
				border: false,
				items: {
					title: 'put'
				}
			})
		});
		
		// Grid with log data
		var _logGrid = Ext.create('Ext.panel.Panel', {
			title: 'Лог загрузки',
			region: 'south',
			cmargins: '5 0 0 0',
			height: 100,
		    minHeight: 75,
		    maxHeight: 150
		});
		
		this.items = [_xlsGrid, _logGrid];
		
		this.callParent();
	},
	title: 'Загрузка файлов',
	layout: 'border',
	plain: true,
	tbar: Ext.create('Ext.toolbar.Toolbar', {
		border: false,
		items: {
			title: 'put'
		}
	}),
	//height: 200,
	defaults: {
		border: false,
	    collapsible: true,
	    split: true,
	    bodyStyle: 'padding:15px'
	}
});