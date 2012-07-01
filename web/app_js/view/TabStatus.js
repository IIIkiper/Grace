Ext.define('GraceApp.view.TabStatus', {
	extend: 'GraceApp.view.TabAP',
	title: 'Статусы сторон',
	initComponent: function() {
		
		var _months = {
			1: 'Январь',
			2: 'Февраль',
			3: 'Март',
			4: 'Апрель',
			5: 'Май',
			6: 'Июнь',
			7: 'Июль',
			8: 'Август',
			9: 'Сентябрь',
			10: 'Октябрь',
			11: 'Ноябрь',
			12: 'Декабрь'
		};
		
		var _statusStore = Ext.getStore('DictStatus');
		
		var _columns = this.columns;
		for (var i = 0; i < 2; i++) { // this year + next year
			for (var j = 1; j < 13; j++) {
				_columns.push({
					header: _months[j] + ((i === 1) ? ' (след. год)' : ''),
					dataIndex: 'id_status_' + ((i === 0) ? 'cy' : 'ny') + '_' + j,
					width: (i === 0) ? 60 : 80,
					editor: {
						xtype: 'customCombo',
						displayField: 'name',
						valueField: 'id',
						store: 'DictStatus',
						allowBlank: false						
					},
					renderer: function(v) {
						var record = _statusStore.getAt(_statusStore.find('id', v));
						return typeof record !== 'undefined' ? record.data.name : '';						
					}
				});
			}
		}
		
		this.columns = _columns;
		
		this.callParent();
	}
});