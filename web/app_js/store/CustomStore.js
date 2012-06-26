Ext.define('GraceApp.store.CustomStore', {
    extend: 'Ext.data.Store',
    requires  : ['Ext.data.proxy.Ajax'],
    listeners: {
        load: function(store, records, successful){
            if (!successful)
                Ext.Msg.show({
                    title: 'Ошибка',
                    msg: 'Не удалось загрузить данные',
                    modal: false,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
        }
    }
});
