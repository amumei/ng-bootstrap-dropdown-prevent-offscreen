(function (){
	"use strict";

	angular.module("directive.bs-dropdown-prevent-offscreen")
	.directive("bs-dropdown-prevent-offscreen", bsDropdownPreventOffScreen);


	function bsDropdownPreventOffScreen(){
		return {
			restrict: "A",
			link: link
		};
	}

	function link(scope, elem){
		var BS_DROPDOWN_EVENT_SHOWN = "shown.bs.dropdown";
		var BS_DROPDOWN_EVENT_HIDDEN = "hidden.bs.dropdown";

		var dropDownMenu = $(".dropdown-menu", $(elem));

		$(elem).on(BS_DROPDOWN_EVENT_SHOWN, onShown);
		$(elem).on(BS_DROPDOWN_EVENT_HIDDEN, onHidden);

		function onShown(){
			var menuBoundingRect = dropDownMenu.get(0).getBoundingClientRect();
			var bodyWidth = $("body").width();

			var menuPositionLeft = menuBoundingRect.left;
			var menuWidth = dropDownMenu.width();

			var isEntirelyVisible = (menuPositionLeft + menuWidth) <= bodyWidth;

			if(!isEntirelyVisible){
				dropDownMenu.addClass("dropdown-menu-right");
			}
		}

		function onHidden(){
			dropDownMenu.removeClass("dropdown-menu-right");
		}
	}

})();