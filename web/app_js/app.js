Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {GraceApp: 'app_js', Ext: 'extjs-4.1.0/src'}
});

Ext.require("Ext.data.validations", function(){Ext.data.validations.lengthMessage =  'Поле обязательно к заполнению';});
Ext.require(["GraceApp.view.MainVp", "GraceApp.store.Urls"]);

// custom Vtype for vtype:'numbers' - after move to separated file...
var numTest = /[0-9]/i;
Ext.apply(Ext.form.field.VTypes, {
    //  vtype validation function
    numbers: function(val, field) {
        return numTest.test(val);
    },
    // vtype Text property: The error text to display when the validation function returns false
    numbersText: 'Некорректное целочисленное значение',
    // vtype Mask property: The keystroke filter mask
    numbersMask: /[\d]/i
});

Ext.application({
    name: 'GraceApp',
    launch: function(){

        Ext.create("GraceApp.view.MainVp").show();
    }
    //,controllers: ["Main"]
});
