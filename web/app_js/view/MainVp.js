Ext.define('GraceApp.view.MainVp', {
    extend: 'Ext.container.Viewport',
    requires: ['GraceApp.view.UnitsGrid'],
    items: [],
    id: 'vp',
    layout: 'fit',
    initComponent : function() {
        this.items.push(Ext.create('GraceApp.view.UnitsGrid'));
        this.callParent();
    }
});