Ext.define('App.view.StoreForm', {
    extend: 'Ext.form.Panel',
    constructor: function (config) {
        var me = this;
        me.getStore().on('load', function () {
            if (me.getStore().data.items[0] != null) {
                me.containsRecords = true;
                if (me.hasId && me.idName) {
                    var record = me.getStore().findRecord(me.idName, me.idValue);
                    if (record)
                        me.loadRecord(record);
                }
                else {
                    me.setRecordByIndex(me.selectedIndex);
                }
            } else {
                me.reset();
            }
        });
        this.callParent(config);
    },
    listeners: {
        beforerender: function () {
            var me = this;
            if (this.syncRecordOnChange) {
                //If sync on change is true then add listener to change events to set values
                //console.log('sync record on change requested');
                //console.log(me.items.items);
                Ext.each(me.items.items, function (field) {
                    //console.log(field);
                    field.on('change', function () {
                        //console.log('Change Fired.');
                        if(me.getRecord())
                            me.getRecord().set(field.name, field.getValue());
                    });
                });
            }
        }
    },
    hasId: false,
    idName: null,
    idValue:null,
    containsRecords:false,
    endOfStore: false,
    startOfStore:true,
    store: null,
    selectedIndex: 0,
    syncRecordOnChange: false,
    reset: function () {
        this.selectedIndex = null;
        this.getForm().reset();
        this.selectedIndex = -1;
    },
    setRecordByIndex: function (index) {
        var itemCount = this.getStore().count() - 1;
        switch (itemCount) {
            case -1:
                this.startOfStore = false;
                this.endOfStore = true;
                break;
            case 0:
                this.endOfStore = true;
                this.startOfStore = true;
                break;
        }
        if (itemCount == index) {
            this.endOfStore = true;
        }

        if (this.hasId && this.idName) {
            this.idValue = this.getStore().data.items[index].get(this.idName);
        }

        if (index == -1) {
            me.reset();
        }
        else {
            var id = this.selectedIndex;
            this.selectedIndex = null;
            this.getForm().reset();
            this.selectedIndex = index;
            this.loadRecord(this.getStore().data.items[index]);
        }
    },
    setRecordByField: function (fieldname, fieldvalue) {
        this.loadRecord(this.getStore().findRecord(fieldname, fieldvalue));
    },
    getRecord: function () {
        //console.log('getRecord Fired');
        return this.getStore().data.items[this.selectedIndex];
    },
    getStore: function () {
        //console.log(this.store);
        return Ext.getStore(this.store);
    },
    syncRecord: function (index) {
        if (!index) {
            index = this.selectedIndex;
        }
        var storeRecord = this.getStore().data.items[index];
        Ext.each(this.items.items, function (field) {
            console.log(field);
            storeRecord.set(field.name, field.getValue());
        });
    },
    getFirstRecord: function () {
        if (this.getStore().count() > 0) {
            this.selectedIndex = 0;
            this.setRecordByIndex(this.selectedIndex);
        }
    },
    getNextRecord: function () {
        if (this.selectedIndex < this.getStore().count() -1)
            this.selectedIndex = this.selectedIndex + 1;

        this.setRecordByIndex(this.selectedIndex);
    },
    getPreviousRecord: function () {
        if (this.selectedIndex > 0)
            this.selectedIndex = this.selectedIndex - 1;

        this.setRecordByIndex(this.selectedIndex);
    },
    getLastRecord: function () {
        var lastItemIndex = this.getStore().count() - 1;
        this.selectedIndex = lastItemIndex;
        this.setRecordByIndex(this.selectedIndex);
    },
    removeCurrentRecord: function () {
        if (this.getRecord()) {
            this.getStore().remove(this.getRecord());
            this.reset();
        }
    },
    addRecord: function (index) {
        if (index == null)
            index = 0;
        this.getStore().insert(index, {});
        this.setRecordByIndex(index);
    }
});