Ext.define('GraceApp.view.TabAP', {
	extend: 'Ext.grid.Panel',	
	requires: [
		'Ext.selection.CheckboxModel',
		'Ext.grid.plugin.CellEditing',
		'Ext.toolbar.Toolbar',
		'Ext.PagingToolbar',
		'Ext.button.Button',
		
		'GraceApp.view.CustomCombo'
	],
	title: 'База данных рекламных поверхностей',
	columns: [
		{
			header: 'Город',
			dataIndex: 'id_city',
			width: 150,
			editor: {
				xtype: 'customCombo',
				displayField: 'name',
				valueField: 'id',
				store: 'DictCities',
				allowBlank: false
			},
			renderer: function(v) {
				var store = Ext.getStore('DictCities');
				var record = store.getAt(store.find('id', v));
				return typeof record !== 'undefined' ? record.data.name : '';
			}
		},{
            text: 'Тип конструкции',
            dataIndex: 'id_construction',
            width: 150,
            editor: {
                xtype: 'customCombo',
                displayField: 'name', 
                valueField: 'id',
                store: 'DictConstructionTypes',
                allowBlank: false
            },
            renderer: function(v) {
                var store = Ext.getStore('DictConstructionTypes');
                var record = store.getAt(store.find('id', v));
                return (typeof record != 'undefined') ? record.data.name : '';
            }
        },{
            text: 'Адрес',
            dataIndex: 'address',
            width: 300,
            tdCls:'wrap-text',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        },{
            text: 'Сторона',
            dataIndex: 'id_side',
            width: 78,
            editor: {
                xtype: 'customCombo',
                displayField: 'name', valueField: 'id',
                store: 'DictSides',
                allowBlank: false
            },
            renderer: function(v){
                var store = Ext.getStore('DictSides');
                var record = store.getAt(store.find('id', v));
                return ((typeof record != 'undefined') ? record.data.name : '');
            }
        },{
            text: 'Код',
            dataIndex: 'code_side',
            editor: 'textfield'
        },{
            text: 'Освещение',
            dataIndex: 'lighting',
            width: 78,
            editor: {
                xtype: 'customCombo',
                store: [
                    [2, 'нет'],
                    [1, 'да']
                ],
                allowBlank: false
            },
            renderer: function(v){
                if (v == 1) return '<div style="color: green">✔</div>';
                else if (v == 2) return '-';
                else return '';
            }
        },{
            text: 'Тип материала',
            dataIndex: 'id_material',
            width: 140,
            editor: {
                xtype: 'customCombo',
                displayField: 'name', valueField: 'id',
                store: 'DictMaterials',
                allowBlank: false
            },
            renderer: function(v) {
                var store = Ext.getStore('DictMaterials');
                var record = store.getAt(store.find('id', v));
                return ((typeof record != 'undefined') ? record.data.name : '');
            }
        },{
            text: 'Код оператора',
            dataIndex: 'unit_code_suppl'
        },{
            text: 'Код конструкции',
            dataIndex: 'code_construction',
            editor: 'textfield'
        },{
            text: 'Фото',
            dataIndex: 'foto',
            editor: 'textfield'
        },{
            text: 'Схема',
            dataIndex: 'scheme',
            editor: 'textfield'
        },{
            text: 'Тип носителя',
            dataIndex: 'id_carrier',
            editor: {
                xtype: 'customCombo',
                displayField: 'name', valueField: 'id',
                store: 'DictCarrierTypes'
            },
            renderer: function(v) {
                if (v == null) return '';
                var store = Ext.getStore('DictCarrierTypes');
                var record = store.getAt(store.find('id', v));
                return ((typeof record != 'undefined') ? record.data.name : '');
            }
        },{
            text: 'Прайс',
            dataIndex: 'price',
            width: 70,
            editor: {xtype: 'textfield', vtype: 'numbers'},
            renderer: Ext.util.Format.numberRenderer('0,0')
        },{
            text: 'Монтаж',
            dataIndex: 'installation',
            width: 70,
            editor: {xtype: 'textfield', vtype: 'numbers'},
            renderer: Ext.util.Format.numberRenderer('0,0')
        },{
            text: 'Налог',
            dataIndex: 'tax',
            width: 70,
            editor: {
                xtype: 'customCombo',
                store: [
                    [1, 'ЕНВД'],
                    [2, 'УСН'],
                    [3, 'НДС'],
                    [4, 'без НДС']
                ]
            },
            renderer:function(v) {
                if (v == 1) return 'ЕНВД';
                else if (v == 2) return 'УСН';
                else if (v == 3) return 'НДС';
                else if (v == 4) return 'без НДС';
                else return '';
            }
        },{
            text: 'Код Эспар',
            dataIndex: 'code_espar'
        },{
            text: 'GRP',
            dataIndex: 'grp',
            width: 60,
            editor: 'numberfield'
        },{
            text: 'Адрес рус. Грейс',
            dataIndex: 'address_russian_grace',
            tdCls:'wrap-text',
            width: 300
        },{
            text: 'Адрес англ. Грейс',
            tdCls:'wrap-text',
            dataIndex: 'address_english_grace',
            width: 300
        },{
            text: 'Код Грейс',
            dataIndex: 'unit_code_grace_new'
        },{
            text: 'Широта',
            dataIndex: 'latitude'
        },{
            text: 'Долгота',
            dataIndex: 'longitude'
        },{
            text: 'Дата окончания контракта',
            dataIndex: 'lastknown_availability',
            width: 150,
            editor: {xtype: 'datefield', format: 'd.m.Y'},
            renderer: Ext.util.Format.dateRenderer('d.m.Y')
        },{
            text: 'Собственность',
            dataIndex: 'ownership',
            width: 100,
            editor: {
                xtype: 'customCombo',
                store: [
                    [1, 'свои'],
                    [2, 'баинг']
                ]
            },
            renderer:function(v) {
                if (v == 1) return 'свои';
                else if (v == 2) return 'баинг';
                else return '';
            }
        }
	],
	initComponent: function() {	
		var _this = this;
		
		var _store = Ext.create('GraceApp.store.UnitsStore');		
		this.store = _store;		
		this.bbar = Ext.create('Ext.PagingToolbar', {
            store: _store,
            displayInfo: true,
            displayMsg: 'Показаны объекты {0} - {1} из {2}',
            emptyMsg: 'Нет объектов для отображения'
        });
        
        var _cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 2
        });    
        this.plugins = [_cellEditing];
        
        var _selModel = Ext.create('Ext.selection.CheckboxModel');
        this.selModel = _selModel;
        
        // Filters for grid
    	var _cityFilter = Ext.create('GraceApp.view.CustomCombo', {
            emptyText: 'Город',
            filterName: 'id_city',
            displayField: 'name', 
            valueField: 'id',
            store: 'DictCities',
            listeners: {
                change: function() {
                    _filterGrid();
                }
            }        			
		});
		
		var _constrFilter = Ext.create('GraceApp.view.CustomCombo', {
            emptyText: 'Тип конструкции',
            filterName: 'id_construction',
            displayField: 'name', 
            valueField: 'id',
            store: 'DictConstructionTypes',
            listeners: {
                change: function() {
                    _filterGrid();
                }
            }        			
		});
        
		var _adressFilter = Ext.create('GraceApp.view.CustomCombo', {
            emptyText: 'Адрес',
            filterName: 'address',
            width: 150,
            checkChangeBuffer: 1000,
            listeners: {
                change: function() {
                    _filterGrid();
                }
            }       			
		});
		
		var _sideFilter = Ext.create('GraceApp.view.CustomCombo', {
	        emptyText: 'Сторона',
	        filterName: 'id_side',
	        displayField: 'name', 
	        valueField: 'id',
	        width: 90,
	        store: 'DictSides',
	        listeners: {
	            change: function() {
	                _filterGrid();
	            }
	        }       			
		});
		
		var _codeFilter = Ext.create('GraceApp.view.CustomCombo', {
            emptyText: 'Код',
            filterName: 'code_side',
            checkChangeBuffer: 1000,
            width: 100,
            listeners: {
                change: function() {
                    _filterGrid();
                }
            }      			
		});
		
		var _carrierFilter = Ext.create('GraceApp.view.CustomCombo', {
            emptyText: 'Тип носителя',
            filterName: 'id_carrier',
            displayField: 'name', 
            valueField: 'id',
            store: 'DictCarrierTypes',
            listeners: {
                change: function() {
                    _filterGrid();
                }
            }      			
		});
		
		var _filters = [_cityFilter, _constrFilter, _adressFilter, _sideFilter, _codeFilter, _carrierFilter];
		
		// Functions for filters
        var _clearFilters = function() {
        	Ext.each(_filters, function(filter) {
        		filter.reset();
        	});
        	_store.loadPage(1);
        };
        
        var _filterGrid = function() {
        	var params = {};
        	Ext.each(_filters, function(filter) {
        		var filterValue = filter.getValue();
        		if (filterValue) {
        			params[filter.filterName] = filterValue;
        		}
        	});
        	console.log('filter', params);
        	_store.getProxy().extraParams = params;
        	_store.loadPage(1);
        };
        
        // Delete row button
		var _deleteRowButton = Ext.create('Ext.button.Button', {
            tooltip: 'Удалить поверхность',
            icon: 'images/fam/delete.gif',
            disabled: true,
            handler: function() {
                Ext.MessageBox.confirm('Удаление', 'Удалить объект?', function(btn) {
                    if (btn === 'yes') {
                        _store.remove(_selModel.getSelection());
                        if (_store.getCount() > 0) {
                            _selModel.select(0);
                        }
                    }
                });
            }     		
		});
		
		this.listeners = {
			'selectionchange': function(self, records) {
				_deleteRowButton.setDisabled(!records.length);
			}
		};
        
        this.tbar = Ext.create('Ext.toolbar.Toolbar', {
        	height: 30,
        	items: [
        		Ext.create('Ext.button.Button', {
	                tooltip: 'Добавить поверхность',
	                icon: 'images/fam/add.gif',
	                handler: function(){
	                    var r = Ext.create('GraceApp.model.UnitPassport', {
	                        id: null
	                    });
	                    _store.insert(0, r);
	                    _cellEditing.startEditByPosition({row: 0, column: 0});                    
	                }        		
        		}),
        		_deleteRowButton, '-',
        		Ext.create('Ext.button.Button', {
	                tooltip: 'Настроить панель фильтров',
	                icon: 'images/fam/cog.png',
	                handler: function(){
	                    Ext.MessageBox.show({
	                       title: 'Конфигурация панели фильтров',
	                       msg: 'Здесь будет интерфейс настройки панели фильтров',
	                       buttons: Ext.MessageBox.OK,
	                       icon: Ext.Msg.INFO
	                   });
	                }      		
        		}),
        		Ext.create('Ext.button.Button', {
	                tooltip: 'Очистить фильтры',
	                icon: 'images/filter-delete.png',
	                handler: function() {
	                    _clearFilters();
	                }   		
        		}),
        		_cityFilter, ' ', _constrFilter, ' ', _adressFilter, ' ', _sideFilter, ' ', _codeFilter, ' ', _carrierFilter
        	]
        });
        
        _store.loadPage(1);
        		
		this.callParent();
	}
});