var $soloModal = null // Used when allowMultiple = false.

// The public API.
Modal = {
	
	allowMultiple: false,
	
	show: function(templateName, data, options){
		
		if($soloModal == null || this.allowMultiple){
			
			var parentNode = document.body
			
			var view = Blaze.renderWithData(Template[templateName], data, parentNode)
			
			var domRange = view._domrange // TODO: Don't violate against the public API.
			
			var $modal = domRange.$('.modal')
			
			$modal.on('shown.bs.modal', function(event){
				$modal.find('[autofocus]').focus()
			})
			
			$modal.on('hidden.bs.modal', function(event){
				Blaze.remove(view)
				$soloModal = null
				// todo it breaks scroll! we need to check if there is an open modal
				// we have some  anmartorell/meteor-accounts-ui-bootstrap-3 dialogs so normal value is 1
				if ($('.modal-dialog').length > 1){
					// we still have modal open
					$('body').addClass('modal-open')
				}
			})
			
			$soloModal = $modal
			
			$modal.modal(options ? options : {})
			
		}
		
	},
	
	hide: function(/* optional */ template){
		
		if(template instanceof Blaze.TemplateInstance){
			
			template.$('.modal').modal('hide')
			
		}else if($soloModal != null){
			
			$soloModal.modal('hide')
			
		}
		
	}
	
}
