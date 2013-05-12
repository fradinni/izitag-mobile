define([
	"underscore",
	"jquery",
	"jquerymobile",
	"peanut!ui/page",
	"peanut!ui/basiclayout",
	"text!../../templates/userHome.html"
], function(_, $, Mobile, PeanutPage, BasicLayout, template) {


	/**
	* Izitag Home Page
	*/
	var HomePage = PeanutPage.extend({

		id: "userHome",
		className: 'izitag-background',

		initialize: function(params) {
			var self = this;

			params = params || {};
			this.application = params.application;

			this.layout = new BasicLayout({
				headerTemplate: "<div data-role='header'><h2><%=data%></h2></div>",
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

			alert("Tag discovered : " + tag.id);
			$.ajax({
				url: 'http://izitag.herokuapp.com/api/addTag',
				type: 'POST',
				data: {
					tagId: tag.id,
					userId: slef.application.user.id,
					name: 'Tag n°: ' + tag.id
				}
			}).done(function(res) {
				if(res.tagExists) {
					alert("Tag exists: " + tag.id);
				} else {
					alert("Tag added :" + JSON.stringify(res));
				}
			});

		}

	});

	return HomePage

});