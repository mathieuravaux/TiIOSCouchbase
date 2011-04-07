
var win = Ti.UI.createWindow({
	backgroundColor:'white'
});
var label = Ti.UI.createLabel();
win.add(label);
win.open();

label.text = "loading module...";

var couchbase = require('com.mathieuravaux.ti_ios_couchbase');

label.text = "loaded ! " + couchbase;




Ti.include('ti_jquery_mock.js');
Ti.include('tiajax.js');
jQuery.ajax = Titanium.Network.ajax;
Ti.include('jquery.couch.js');

var DB_NAME = "demo";
var REMOTE_DB = "http://olnis.cloudant.com/demo/";


couchbase.addEventListener('couchbase_started', function(e){
  label.text = "CouchDB is running ! Gogogo!  " + e.url;
  
  $.couch.urlPrefix = e.url.replace(/\/$/g, '');
  var db = $.couch.db(DB_NAME);
  Ti.API.info('db:' + db);
  db.info({
    success: function(data) {
      Ti.API.info('db info:' + JSON.stringify(data));

      var since = (data.update_seq || 0);
      // Connect to the changes feed.
      var changesFeed = db.changes(since,{include_docs:true});
      changesFeed.onChange(function(changes){
        Ti.API.info('Received changes in push ! ');
        var doc,coll,model,ID;
        // Iterate over the changed docs and validate them.
        for (var i=0; i < changes.results.length; i++) {
          doc = changes.results[i].doc;
          Ti.API.info('Document changed ! ' + JSON.stringify(doc));
          alert('Document changed ! ' + JSON.stringify(doc));
        }
      });


      label.text = "Starting replication...";

      $.couch.replicate(DB_NAME, REMOTE_DB, {
        success: function() {
          Ti.API.info("local -> cloud replication success !");
        },
        error: function(e) {
          Ti.API.info("local -> cloud replication error !");
          Ti.API.info(JSON.stringify(e));
        }
      },{ continuous: true });
      $.couch.replicate(REMOTE_DB, DB_NAME, {
        success: function() {
          Ti.API.info("cloud -> local replication success !");
        },
        error: function(e) {
          Ti.API.info("cloud -> local replication error !");
          Ti.API.info(JSON.stringify(e));
        }
      },{ continuous: true });
  
    }
  });
  
});

couchbase.startCouchbase();
