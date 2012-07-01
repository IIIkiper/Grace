Ext.define('GraceApp.view.CustomCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.customCombo',
    forceSelection: true,
    typeAhead: true,
    triggerAction: 'all',
    selectOnTab: true,
    queryMode: 'local',

    lastValidValue: '',
    autoSelect: false,

    // позволяем очищать значение выпадающего списка
    assertValue: function() {
        var me = this, value = me.getRawValue();
        
        if (me.allowBlank && !value) {
            me.clearValue();
        } else {
            me.callParent();
        }
    }
});
