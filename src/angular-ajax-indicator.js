'use strict';

angular.module('ajax.indicator', []);

angular.module('ajax.indicator')
  .service('loadingIndicatorsService',[
    function() {
      var uuid = 0;
      var indicators = {};

      this.showLoadingIndicator = function(id) {
        var subscribed = indicators[id];
        if (!!subscribed) {
          angular.forEach(subscribed, function(subscribedItem) {
            subscribedItem.show();
          });
        }
      };

      this.hideLoadingIndicator = function(id) {
        var subscribed = indicators[id];
        if (!!subscribed) {
          angular.forEach(subscribed, function(subscribedItem) {
            subscribedItem.hide();
          });
        }
      };

      this.subscribe = function(id, showCb, hideCb) {
        var subscribed = indicators[id];
        if (!subscribed) {
          subscribed = indicators[id] = [];
        }

        // increase uuid to get a new unique id
        uuid ++;

        // push to the indicators hash
        subscribed.push({
          uuid:uuid,
          show:showCb,
          hide: hideCb
        });

        return uuid;
      };

      this.unsubscribe = function (id, uuid) {
        var subscribed = indicators[id];
        if (!!subscribed) {
          for (var index=0; index<subscribed.length; index++) {
            if (subscribed[index].uuid === uuid){
              subscribed.splice(index, 1);
              break;
            }
          }
        }
      };

    }
  ]);

angular.module('ajax.indicator')
  .factory('loadingIndicatorHttpInterceptor', [
    '$q',
    'loadingIndicatorsService',
    function ($q, loadingIndicatorsService) {
      return {
        request: function (config) {

          if (!!config.loadingIndicatorId) {
            loadingIndicatorsService.showLoadingIndicator(config.loadingIndicatorId);
          }

          return config || $q.when(config);
        },

        response: function (response) {

          if (!!response.config.loadingIndicatorId) {
            loadingIndicatorsService.hideLoadingIndicator(response.config.loadingIndicatorId);
          }

          return response || $q.when(response);
        },

        responseError: function(response) {

          return response || $q.when(response);
        }
      };
    }
  ]);
