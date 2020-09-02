function HoverScroller(elmt, side, list) {
	let self = this;
	
	self.elmt = $(elmt);
	self.side = side;
	self.list = $(list);
	self.visible = ! self.elmt.hasClass("hidden");
	
	
	
	self.animate = {};
	
	self.animate.in = function() {
		self.elmt.removeClass("hidden");
		self.elmt.css("opacity", "0");
		self.elmt.animate({
			opacity: 1,
			//right: "+=" + self.elmt.width(),
		}, 250, function() {
			self.elmt.stop();
			self.elmt.removeAttr("style");
		});
	};
	self.animate.out = function() {
		self.elmt.css("opacity", "1"); // just for consistent code
		self.elmt.animate({
			opacity: 0,
			//right: "-=" + self.elmt.width(),
		}, 100, function() {
			self.elmt.stop();
			self.elmt.removeAttr("style");
			self.elmt.addClass("hidden");
		});
	};
	
	
	
	self.check = function(initial = false) {
		const scrollableWidth = self.list.prop("scrollWidth") - self.list.width();
		if (scrollableWidth == 0) { // if list can't actually be scrolled
			self.elmt.addClass("hidden");
			self.visible = false;
			return;
		}
		let atLimit; // bool (equals true when scrolled to limit)
		switch (self.side) { // switch the limit/wall depending on scroll direction
			case "left":
				atLimit = self.list.scrollLeft() == 0;
				break;
			case "right":
				atLimit = self.list.scrollLeft() == scrollableWidth;
				break;
		}
		if (initial) { // if list is being loaded for the first time
			if (atLimit) {
				if (self.visible) {
					//self.animate.out(self.elmt);
					self.elmt.addClass("hidden");
					self.visible = false;
				}
				
			} else {
				self.elmt.removeClass("hidden");
				self.visible = true;
			}
			return;
		} 
		if (atLimit) { // if list is scrolled to left
			if (self.visible) {
				self.animate.out(self.elmt);
				self.visible = false;
			}
		} else if (! self.visible) {
			self.animate.in(self.elmt);
			self.visible = true;
		}
	};
	self.check(true); // execute on initialisation
	
	
	
	self.scroll = {};
	
	self.scroll.start = function(animStyle="swing") {
		let target, dist;
		switch (self.side) {
			case "left":
				target = 0; // start of list
				dist = self.list.scrollLeft(); // distance from start
				break;
			case "right":
				target = self.list.prop("scrollWidth") - self.list.width(); // end of list
				dist = target - self.list.scrollLeft(); // distance from end
				break;
		}
		const pps = 1450; // pixels per second
		const dur = (dist / pps) * 1000; // calculated anim duration in seconds
		self.list.animate({
			scrollLeft: target
		}, dur, animStyle, function() { // look at jQueryUI easings for different anim styles, eg. "easeInOutQuad"
			self.list.stop(); // stop() probably isnt necessary here
		});
	};
	self.scroll.stop = function() {
		self.list.stop();
	};
}
