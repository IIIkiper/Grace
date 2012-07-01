Ext.define('GraceApp.view.TabXls', {
	extend: 'Ext.panel.Panel',
	requires: [
		'Ext.grid.Panel', 
		'Ext.toolbar.Toolbar',
		'Ext.button.Button',
		
		'GraceApp.store.XlsStore'
	],
	initComponent: function() {		
		var _this = this;
		
		var _xlsStore = Ext.getStore('GraceApp.store.XlsStore');
		
		var _typeSelector = Ext.create('GraceApp.view.CustomCombo', {
			allowBlank: false,
			width: 250,
			store: [
				[1, 'Загрузка полной АП (обновление)'],
				[2, 'Загрузка полной АП (добавление)'],
				[3, 'Загрузка статусов'],
				[4, 'Загрузка спец. предложений']
			]			
		});
		
		// Grid with .xls/.ods data
		var _xlsGrid = Ext.create('Ext.grid.Panel', {
			store: _xlsStore,
			region: 'center',
			//margins: '5 0 0 0',
			tbar: Ext.create('Ext.toolbar.Toolbar', {
				border: false,
				height: 30,
				items: [
					Ext.create('Ext.button.Button', {
						tooltip: 'Загрузить файл',
						icon: 'images/icons/page_excel.png',
						handler: function() {
							console.log('load excel');
						}
					}),
					_typeSelector
				]
			}),
			columns: [
				{header: 'A', dataIndex: 'col1'},
				{header: 'B', dataIndex: 'col2'},
				{header: 'C', dataIndex: 'col3'},
				{header: 'D', dataIndex: 'col4'},
				{header: 'E', dataIndex: 'col5'},
				{header: 'F', dataIndex: 'col6'},		
				{header: 'G', dataIndex: 'col7'},
				{header: 'H', dataIndex: 'col8'},
				{header: 'I', dataIndex: 'col9'},
				{header: 'J', dataIndex: 'col10'},
				{header: 'K', dataIndex: 'col11'},
				{header: 'L', dataIndex: 'col12'},
				{header: 'M', dataIndex: 'col13'},
				{header: 'N', dataIndex: 'col14'},
				{header: 'O', dataIndex: 'col15'},
				{header: 'P', dataIndex: 'col16'},
				{header: 'Q', dataIndex: 'col17'},
				{header: 'R', dataIndex: 'col18'},
				{header: 'S', dataIndex: 'col19'},
				{header: 'T', dataIndex: 'col20'},
				{header: 'U', dataIndex: 'col21'},
				{header: 'V', dataIndex: 'col22'},
				{header: 'W', dataIndex: 'col23'},
				{header: 'X', dataIndex: 'col24'},
				{header: 'Y', dataIndex: 'col25'},
				{header: 'Z', dataIndex: 'col26'}			
			]
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
//	tbar: Ext.create('Ext.toolbar.Toolbar', {
//		border: false,
//		items: {
//			title: 'put'
//		}
//	}),
	//height: 200,
	defaults: {
		border: false,
	    collapsible: true,
	    split: true,
	    bodyStyle: 'padding:15px'
	}
});