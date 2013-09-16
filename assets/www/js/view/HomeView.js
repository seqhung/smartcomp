var HomeView = function(store) {
	this.initialize = function() {
		this.el = $("<div/>");
		this.el.on("keyup", '.search-key', this.findByName);
	};
	
	this.render = function() {
    	this.el.html(HomeView.tplHome());
    	return this;
    };
    
    this.findByName = function() {
    	var self = this;
    	store.findByName($('.search-key').val(), function (contacts) {
    	    $('.contact-list').html(HomeView.tplContactLi(contacts));
            //iScroll
            if (self.iscroll) {
                console.log('Refresh iScroll');
                self.iscroll.refresh();
            } else {
                console.log('New iScroll');
                self.iscroll = new iScroll($('.scroll', self.el)[0], { hScrollbar: false, vScrollbar: false });
            }
        });
    };
	
	this.initialize();
}

HomeView.tplHome = Handlebars.compile($("#tpl-home").html());
HomeView.tplContactLi = Handlebars.compile($("#tpl-contact-li").html());