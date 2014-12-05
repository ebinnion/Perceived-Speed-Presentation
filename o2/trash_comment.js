/*
 The following is a snippet of two methods that handle trashing a comment within O2.

 This snippet is part of a much larger backbone view that is named `comment.js`
*/

onTrash: function( event ) {
	event.preventDefault();
	event.stopImmediatePropagation();

	this.options.isSaving = true;
	this.options.isTrashedAction = true;

	o2.Events.dispatcher.trigger( 'notify-app.o2', { saveInProgress: true } );

	var updates = {
		isTrashed:      true,
		trashedSession: true
	};

	this.model.save( updates, { success: this.onSaveSuccess,error: this.onSaveError } );
},

onSaveError: function( model, xhr ) {
	o2.Events.dispatcher.trigger( 'notify-app.o2', { saveInProgress: false } );

	var responseText = '';
	var errorText = '';
	try {
		// See if the XHR responseText is actually a JSONified object
		var responseObject = $.parseJSON( xhr.responseText );
		if ( ( 'undefined' !== typeof responseObject.data.errorText ) ) {
			errorText = responseObject.data.errorText;
		}
	} catch ( e ) {
		// Not JSON - use the responseText directly
		// e.g. this occurs if you attempt to post the same comment twice - you get
		// a non JSON error back in the response
		errorText = xhr.responseText;
	}

	o2.Notifications.add( {
		model: model,
		type: 'error',
		text: errorText,
		sticky: true
	} );

	// Turn editing back on
	this.options.isSaving = false;
	this.options.isEditing = true;
	this.render();

	o2.Events.doAction( 'post-comment-save.o2' );
},