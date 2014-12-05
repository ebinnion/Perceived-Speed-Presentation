/*
 The following is a snippet of two methods that handle trashing a post within O2.

 This snippet is part of a much larger backbone view that is named `post.js`
*/

onTrash: function( event ) {
	event.preventDefault();
	event.stopPropagation();

	var postId = parseInt( o2.options.postId, 10 );

	if ( 0 == postId ) {

		// If currently on a list view, slide the post up then proceed with the destroy.
		this.$el.slideUp( this.destroyViewModel( this, postId ) );
	} else {

		// Check if there is a postTrashedFailed notification and remove if so
		o2.Notifications.notifications.findFirstAndDestroy( 'postTrashedFailed' );

		var trashString = ( 'page' == o2.options.viewType ) ? 'pageBeingTrashed' : 'postBeingTrashed';

		o2.Notifications.add( {
			text: o2.strings.trashString,
			url: false,
			type: 'postBeingTrashed',
			sticky: false,
			popup: false,
			dismissable: true
		} );

		this.destroyViewModel( this, postId );
	}
},

destroyViewModel: function( view, postId ) {

	view.model.destroy({
		wait: true,
		success: function( model, response ) {

			// If on a single post/page view, then redirect to home.
			if ( 0 != postId ) {

				// Check if there is a postBeingTrashed notification and remove if so
				o2.Notifications.notifications.findFirstAndDestroy( 'postBeingTrashed' );

				var redirectedHomeString = ( 'page' == o2.options.viewType ) ? 'redirectedHomePageTrashed' : 'redirectedHomePostTrashed';

				o2.Notifications.add( {
					text: o2.strings.redirectedHomeString,
					url: false,
					type: 'redirectedHome',
					sticky: false,
					popup: false,
					dismissable: true
				} );

				window.location.href = o2.options.searchURL;
			}
		},
		error: function( model, response ) {

			// Remove any actions menus that are currently open.
			view.closeOpenDisclosures();

			// Check if there is a postBeingTrashed notification and remove if so
			o2.Notifications.notifications.findFirstAndDestroy( 'postBeingTrashed' );

			var trashFailedString = ( 'page' == o2.options.viewType ) ? 'pageTrashedFailed' : 'postTrashedFailed';

			// If the destroy failed, show the post again.
			view.$el.slideDown();
			o2.Notifications.add( {
				text: o2.strings.trashFailedString,
				url: false,
				type: 'postTrashedFailed',
				sticky: false,
				popup: true,
				dismissable: true
			} );
		}
	});
},