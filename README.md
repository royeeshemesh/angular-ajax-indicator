
angular.module('ajax.indicator')
  .directive('ajaxLoadingSymbol', [
    'loadingIndicatorsService',
    function(loadingIndicatorsService) {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          indicatorId: '@'
        },
        template: '<span ng-if="loading">Loading...</span>',
        controller: ['$scope', function($scope) {
          var uuid;

          $scope.loading = false;

          function showLoadingIndicator() {
            $scope.loading = true;

            console.log('loadingSymbol / show loading indicator: ', $scope.indicatorId, uuid);
          }

          function hideLoadingIndicator() {
            $scope.loading = false;

            console.log('loadingSymbol / hide loading indicator: ', $scope.indicatorId, uuid);
          }

          if (!!$scope.indicatorId) {
            // subscribe to loadingIndicatorsService and retrieved unique id for unsubscribe
            uuid = loadingIndicatorsService.subscribe($scope.indicatorId, showLoadingIndicator, hideLoadingIndicator);

            // subscribe for removing this
            $scope.$on('$destroy', function() {
              loadingIndicatorsService.unsubscribe($scope.indicatorId, uuid);
            });

            console.log('loadingSymbol / uuid:',uuid, $scope.indicatorId, ' - subscribed');
          }
        }]
      };
    }
  ]);
