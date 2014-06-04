(function (global) {
    var HomeViewModel,
        app = global.app = global.app || {};

    HomeViewModel = kendo.data.ObservableObject.extend({
        _isLoading: false,

        onNavigateHome: function () {
            var that = this;

            that._isLoading = true;
            that.toggleLoading();
        },
        
        toggleLoading: function () {
            if (this._isLoading) {
                kendo.mobile.application.showLoading();
            } else {
                kendo.mobile.application.hideLoading();
            }
        }

    });

    app.homeService = {
		sendMessage: function () {

        },
        
        viewModel: new HomeViewModel()
    };
}
)(window);