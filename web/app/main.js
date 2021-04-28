const ohmDelivery = angular.module("ohm-delivery", [])

ohmDelivery.controller("tracking", function($scope, $http) {

    $scope.sendData = function() {

        if($scope.trackingId == '' || $scope.trackingId == undefined) {
            this.errorMessage = 'Please fill in a tracking number!';
            $scope.ohmFound = 'not found';
            return;
        }
        
        $http.get(`/ohms/getByTrackingId/${this.trackingId}`)
        .then((response) => {
            if(response.data !== '') {
                $scope.ohmData = response.data;
                $scope.ohmFound = 'found';
                this.errorMessage = '';
            } else {
                this.errorMessage = 'Tracking id not found!';
                $scope.ohmFound = 'not found';
            }
            }, (error) => {
            this.errorMessage = 'Error, please try again!';
            $scope.ohmFound = 'not found';
            console.log(error);
        });

        $scope.trackingId = '';
    };

});

ohmDelivery.directive("ohmDetails", function() {
    return {
        templateUrl: '/directives/ohmDetails.html',
        replace: true
    };
});
