Ext.define('GraceApp.view.UnitsGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'GraceApp.store.UnitsStore',

        'GraceApp.store.DictCities',
        'GraceApp.store.DictCarrierTypes',
        'GraceApp.store.DictConstructionTypes',
        'GraceApp.store.DictMaterials',
        'GraceApp.store.DictRegions',
        'GraceApp.store.DictSides',

        'GraceApp.view.CustomCombo',

        'Ext.selection.CellModel',
        'Ext.grid.plugin.CellEditing',
        'Ext.toolbar.Paging',
        'Ext.util.*',
        'Ext.selection.CheckboxModel'
    ],
    id: 'test',
    itemId: 'apGrid',
    plugins: [],
    title: 'База данных рекламных поверхностей',
    initComponent : function() {
        Ext.util.Format.thousandSeparator = ' ';
        // создаем хранилища - для таблицы и необходимых справочников
        this.store = Ext.create('GraceApp.store.UnitsStore');
        Ext.create('GraceApp.store.DictCities');
        Ext.create('GraceApp.store.DictCarrierTypes');
        Ext.create('GraceApp.store.DictConstructionTypes');
        Ext.create('GraceApp.store.DictMaterials');
        Ext.create('GraceApp.store.DictRegions');
        Ext.create('GraceApp.store.DictSides');
        
        //console.log(Urls);

        // загружаем одним запросом данные всех необходимых справочников,
        // после чего грузим данные АП
        Ext.Ajax.request({
            url: GraceApp.store.Urls.url('dictionaries'),
            method: 'GET',
            scope: this,
            success: function(response){
                var data = Ext.JSON.decode(response.responseText);
                var dics = data.dictionaries;
                Ext.getStore('DictCarrierTypes')
                   .loadData(dics.dict_carrier_types);
                Ext.getStore('DictCities')
                   .loadData(dics.dict_cities);
                Ext.getStore('DictConstructionTypes')
                   .loadData(dics.dict_construction_types);
                Ext.getStore('DictMaterials')
                   .loadData(dics.dict_materials);
                Ext.getStore('DictRegions')
                   .loadData(dics.dict_regions);
                Ext.getStore('DictSides')
                   .loadData(dics.dict_sides);
                this.store.loadPage(1);
            }
        }); 
        
        this.cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 2
        });
        this.selModel = Ext.create('Ext.selection.CheckboxModel');

        this.plugins.push(this.cellEditing);
        this.columns = this.columnsGet();

        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: Ext.getStore('UnitsStore'),
            displayInfo: true,
            displayMsg: 'Показаны объекты {0} - {1} из {2}',
            emptyMsg: 'Нет объектов для отображения'
        });

        this.tbar = {height: 30, items: [
            {
                tooltip: 'Добавить поверхность',
                icon: 'images/fam/add.gif',
                scope: this,
                handler: function(){
                    var r = Ext.create('GraceApp.model.UnitPassport', {
                        id: null
                    });
                    this.store.insert(0, r);
                    this.cellEditing.startEditByPosition({row: 0, column: 0});                    
                }
            },{
                tooltip: 'Удалить поверхность',
                icon: 'images/fam/delete.gif',
                disabled: true,
                itemId: 'deleteUnitButton',
                scope: this,
                handler: function(){
                    Ext.MessageBox.confirm('Удаление', 'Удалить объект?', function(btn){
                        if (btn == 'yes'){
                            var sm = this.getSelectionModel();
                            this.store.remove(sm.getSelection());
                            if (this.store.getCount() > 0) {
                                sm.select(0);
                            }
                        }
                    }, this);
                }
            },'-',

            {
                tooltip: 'Настроить панель фильтров',
                //icon: 'images/icons/pencil.png',
                icon: 'images/fam/cog.png',
                scope: this,
                handler: function(){
                    Ext.MessageBox.show({
                       title: 'Конфигурация панели фильтров',
                       msg: 'Здесь будет интерфейс настройки панели фильтров',
                       buttons: Ext.MessageBox.OK,
                       icon: Ext.Msg.INFO
                   });
                }
            },{
                tooltip: 'Очистить фильтры',
                icon: 'images/filter-delete.png',
                scope: this,
                handler: function(){
                    this.clearFilters();
                }
            },' ',
            
            {
                xtype: 'customCombo',
                emptyText: 'Город',
                itemId: 'filter_id_city',
                displayField: 'name', valueField: 'id',
                store: 'DictCities'
                ,listeners: {
                    scope: this,
                    change: function(){
                        this.setFilterParams();
                    }
                }
            },' ',{
                xtype: 'customCombo',
                emptyText: 'Тип конструкции',
                itemId: 'filter_id_construction',
                displayField: 'name', valueField: 'id',
                store: 'DictConstructionTypes'
                ,listeners: {
                    scope: this,
                    change: function(){
                        this.setFilterParams();
                    }
                }
            },' ',{
                xtype: 'textfield',
                emptyText: 'Адрес',
                itemId: 'filter_address',
                width: 150
                ,checkChangeBuffer: 1000
                ,listeners: {
                    scope: this,
                    change: function(){
                        this.setFilterParams();
                    }
                }
            },' ',{
                xtype: 'customCombo',
                emptyText: 'Сторона',
                itemId: 'filter_id_side',
                displayField: 'name', valueField: 'id',
                width: 90,
                store: 'DictSides'
                ,listeners: {
                    scope: this,
                    change: function(){
                        this.setFilterParams();
                    }
                }
            },' ',{
                xtype: 'textfield',
                emptyText: 'Код',
                itemId: 'filter_code_side',
                checkChangeBuffer: 1000,
                width: 100
                ,listeners: {
                    scope: this,
                    change: function(){
                        this.setFilterParams();
                    }
                }
            },' ',{
                xtype: 'customCombo',
                emptyText: 'Тип носителя',
                itemId: 'filter_id_carrier',
                displayField: 'name', valueField: 'id',
                store: 'DictCarrierTypes'
                ,listeners: {
                    scope: this,
                    change: function(){
                        this.setFilterParams();
                    }
                }
            },' '
        ]};

        this.callParent();
    },
    border: false,

    columnsGet: function(){
        return [
            {
                header: 'Город',
                dataIndex: 'id_city',
                width: 150,
                editor: {
                    xtype: 'customCombo',
                    displayField: 'name', valueField: 'id',
                    store: 'DictCities',
                    allowBlank: false
                },
                renderer: function(v){
                    var store = Ext.getStore('DictCities');
                    var record = store.getAt(store.find('id', v));
                    return ((typeof record != 'undefined') ? record.data.name : '');
                }
            },{
                text: 'Тип конструкции',
                dataIndex: 'id_construction',
                width: 150,
                editor: {
                    xtype: 'customCombo',
                    displayField: 'name', valueField: 'id',
                    store: 'DictConstructionTypes',
                    allowBlank: false
                },
                renderer: function(v){
                    var store = Ext.getStore('DictConstructionTypes');
                    var record = store.getAt(store.find('id', v));
                    return ((typeof record != 'undefined') ? record.data.name : '');
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
                renderer: function(v){
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
                renderer: function(v){
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
                renderer:function(v){
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
                renderer:function(v){
                    if (v == 1) return 'свои';
                    else if (v == 2) return 'баинг';
                    else return '';
                }
            }
        ];
    },
    listeners: {
        'selectionchange': function(view, records) {
            this.down('#deleteUnitButton').setDisabled(!records.length);
        }
    },

    _filters: [
        'filter_id_city',
        'filter_id_construction',
        'filter_address',
        'filter_id_side',
        'filter_code_side',
        'filter_id_carrier'
    ],
    getFilters: function(){
        var filters = {},
            grid = this;
        Ext.each(this._filters, function(element_name){
            var field_value = grid.down('#'+element_name).getValue();
            if (field_value === null || field_value === '') return;
            field_name = element_name.substring(7);
            filters[field_name] = field_value;
        });
        return filters;
    },
    setFilterParams: function(){
        this.store.getProxy().extraParams = this.getFilters();    
        console.log('setFilterParams', this.store.getProxy().extraParams);
        if (typeof this.notReloadStore === 'undefined' || !this.notReloadStore)
            this.store.loadPage(1);
    },
    clearFilters: function(){
        // очистка фильтров
        var grid = this;
        this.notReloadStore = true; // флаг, прослушиваемый в this.setFilterParams
        Ext.each(this._filters, function(field){
            grid.down('#'+field).reset();
        } );
        this.notReloadStore = false;
        this.store.loadPage(1);
    }
});
