Ext.ns('GraceApp.store');
GraceApp.store.Urls = {
	local: false,
	url: function(url) {
		return this.local ? url : 'proxy.jsp?' + url; 
	}
};