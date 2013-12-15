# StoreForm
> extends: 'Ext.form.Panel' <br>
> This js file is to be used within an ExtJS 4 application.  

#Instructions

Download the file and save in your extjs app under an appropriate path. <br/>
It can be extended similar to the sample below:

```Javascript
Ext.define('App.view.MyForm',{
  extend:'App.view.StoreForm',
  store:'myStore',
});
```

# Methods
* ```getFirstRecord() ```
  * sets form to first item in store
* ```getNextRecord() ``` 
  * sets form to next item in store
* ```getPreviousRecord() ``` 
  * sets form to previous item in store
* ```getLastRecord() ``` 
  * sets form to last item in store
* ```syncRecord()``` 
  * syncs changes to form with selected record in store
* ```reset()```
  * resets the form (makes form blank and not tied to record)
* ```setRecordByIndex(index)```
  * sets current record on form to the index specified
* ```setRecordByField(fieldName,fieldValue)```
  *  sets current record on form based on field name and field value specified (sets to first match)
* ```addRecord(index)```
  *  adds record at the index, if no index is specified it defaults to 0

# Additional Configs
* ```syncRecordOnChange```
  * type : bool
  * defaults to false
  * will auto sync fields on form with store record on change event
* ```hasId```
  * defaults to false
  * defines whether there is an id field available within the store requires ```idName``` to be defined for use
  
# Record Iteration Variables
* ```bool containsRecords```
* ```bool endOfStore```
* ```bool startOfStore```
* ```nullable<int> selectedIndex```
  
