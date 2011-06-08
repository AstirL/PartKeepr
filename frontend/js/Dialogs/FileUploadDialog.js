Ext.define('PartDB2.FileUploadDialog', {
    extend: 'Ext.window.Window',
    
    title: i18n("File Upload"),
    fileFieldLabel: i18n("File"),
    uploadButtonText: i18n('Select File...'),
    
    initComponent: function () {
    	
    	this.addEvents("fileUploaded");
    	
    	this.uploadButton = Ext.create("Ext.button.Button",
    			{
    	        	text: i18n('Upload'),
    	        	handler: Ext.bind(function() {
    	        		var form = this.form.getForm();
    	        		if(form.isValid()){
    	        			form.submit({
    	        				url: 'rest.php/TempImage',
    	        				params: {
    	        				call: "upload",
    	                    	session: PartDB2.getApplication().getSession()
    	                    },
    	                    success: Ext.bind(function(fp, o) {
    	                    	this.fireEvent("fileUploaded", o.result.response.id);
    	                    	this.close();
    	                    },this),
    	                    failure: function(form, action) {
    	                    }
    	                });
    	            }
    	        }, this)
    	    });
    	
    	this.tbButtons = [ this.uploadButton ];
    	
    	if (this.imageUpload) {
    		this.title = i18n("Image Upload");
    		this.fileFieldLabel = i18n("Image");
    		this.uploadButtonText = i18n("Select Image...");
    		
    		this.fileFormatButton = Ext.create("Ext.button.Button", {
    			text: i18n("Available Formats"),
    			handler: this.showAvailableFormats,
    			scope: this
    		});
    		
    		this.tbButtons.push(this.fileFormatButton);
    	}
    	
    	this.form = Ext.create('Ext.form.Panel', {
    	    width: 400,
    	    bodyPadding: 10,
    	    border: false,
    	    items: [{
    	        xtype: 'filefield',
    	        name: 'userfile',
    	        fieldLabel: this.fileFieldLabel,
    	        labelWidth: 50,
    	        msgTarget: 'side',
    	        allowBlank: false,
    	        anchor: '100%',
    	        buttonText: this.uploadButtonText
    	    },{
    	    	html: sprintf(i18n("Maximum upload size: %s"), PartDB2.bytesToSize(PartDB2.getMaxUploadSize())),
    	    	border: false
    	    }],

    	    buttons: this.tbButtons
    	});
    	
    	this.items = this.form;
    	this.callParent();
    },
    /**
     * Shows a tooltip for all available image formats.
     */
    showAvailableFormats: function () {
    	if (!this.tip) {
    		this.tip = Ext.create("Ext.tip.ToolTip", {
        		title: i18n("Available Image Formats"),
        		anchor: 'left',
        		width: 200,
        		height: 300,
        		autoScroll: true,
        		target: this.fileFormatButton.getEl(),
        		closable: true,
        		html: "FOO"+implode("<br>", PartDB2.getAvailableImageFormats()),
        		autoHide: false
        	});	
    	}
    	
    	
    	this.tip.show();
    }
});
