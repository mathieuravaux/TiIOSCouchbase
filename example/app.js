
var window = Ti.UI.createWindow({
	backgroundColor:'white'
});
var label = Ti.UI.createLabel();
window.add(label);
window.open();

label.text = "loading module...";

var couchbase = require('com.mathieuravaux.ti_ios_couchbase');

// Ti.API.info("module is => " + couchbase);
label.text = "loaded ! " + couchbase;


couchbase.addEventListener('couchbase_started', function(){
  label.text = "CouchDB is running ! Gogogo!";
});

couchbase.startCouchbase();
