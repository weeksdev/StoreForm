This js file is to be used within an ExtJS 4 application.  I can be extended similar to the sample below:

Ext.define('App.view.MyForm',{
  extend:'App.view.StoreForm',
  store:'myStore',
});

The available methods to iterate the records are:
