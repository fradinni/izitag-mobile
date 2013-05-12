define([
	"underscore",
	"jquery",
	"jquerymobile",
	"peanut!ui/page",
	"peanut!ui/basiclayout",
	"text!../../templates/home.html"
], function(_, $, Mobile, PeanutPage, BasicLayout, template) {


	/**
	* Izitag Home Page
	*/
	var HomePage = PeanutPage.extend({

		id: "home",
		className: '',

		initialize: function(params) {
			var self = this;

			params = params || {};
			this.application = params.application;

			this.layout = new BasicLayout({
				headerTemplate: '<div class="izitag-header"></div>',
				headerData: "Izitag",
				template: template
			});


			if(typeof device !== 'undefined') {
				nfc.addTagDiscoveredListener(function(e) {
					var tag = {
						id: self.createHexString(e.tag.id)
					};
					self.tagDiscovered(tag);
					/*
					alert('Tag detected: \nType: ' + e.type +'\nID: ' + self.createHexString(e.tag.id) + '\n Technologies: ' + e.tag.techTypes);
					*/
				});
			}
		},

		createHexString: function(arr) {
		    var result = "";
		    for (var i = 0; i < arr.length; i++) {
		    
		    	var number = arr[i];
		    	if (number < 0)
			    {
			    	number = 0xFF + number + 1;
			    }
		        var str = number.toString(16).toUpperCase();
		
		        result += str;
		    }
		
		    return result;
		},


		tagDiscovered: function(tag) {
			var self = this;

			//alert("Tag discovered : " + tag.id);
			self.showPopup("A tag was scanned ! Please wait...");
			$.ajax({
				url: 'http://izitag.herokuapp.com/api/checkin',
				type: 'POST',
				data: {
					tagId: tag.id,
					userId: self.application.user.id
				}
			}).done(function(res) {
				self.setOverlayText(res.tag.name + " was scanned !");
				if(res.codePromo) {
					self.application.promoCodeId = res.codePromo.id;
					setTimeout(function() {
						$('.overlay').slideUp();
						self.application.navigate('promoCode?id='+res.codePromo.id,  {trigger: true});
					}, 300);
				}
			});
		},

		showPopup: function(content) {
			var container = this.$el.find('.izitag-gray-content');

			var overlayTpl = '<div class="overlay" style="display: none;"><p><%=content%></p></div>';
			var overlay = _.template(overlayTpl, {content: content});
			container.append(overlay);
			$('.overlay').css('height', '91%').css('position', 'absolute').css('top', '9%').css('width', '100%').css('padding', '5%');
			$('.overlay p').css('position', 'absolute').css('top', '25%').css('font-size', '35px').css('font-weight', '200').css('text-align', 'center').css('width', '80%').css('margin', 'auto');
			$('.overlay').click(function(e) {
				e.preventDefault();
				$('.overlay').slideUp();
			});
			$(".overlay").slideDown();

		},

		setOverlayText: function(text) {
			$('.overlay p').html(text);
		}

	});

	return HomePage

});