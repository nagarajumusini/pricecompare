// app.js
angular.module('routerApp', ['ui.router', 'angularXml2json' ])

.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'pages/categories.html',
            controller: 'categoryCtrl'
        })
        
})

/* ====== File Upload Controller ========= */

.controller('categoryCtrl', function($scope, $http){
    console.log('jhello');
})

/* ====== File Details Controller ========= */

.controller('filedetailsCtrl', function($scope, $http){

})

/* ====== Filter Details Controller ========= */

.controller('filterDetailsCtrl', function($scope, $stateParams, $rootScope, $http){
    $scope.onsuccess = false;
   $scope.index = $stateParams.id;
   console.log($stateParams);
   $scope.fileType = $stateParams.fileType;
   $http.get('./data/mortality.json').then( 
    function(result) {
        console.log(result.data);
      $scope.jsonData = result.data.STEVE_VR_File;
      $scope.proposedData = $scope.jsonData.record.record;
      $scope.proposed = $scope.jsonData.record.record[$scope.index];
      console.log($scope.proposed);
      //window.nag = result.data;
    },function(error) {
        console.log('error', error);
    }); 
   var removeByAttr = function(arr, attr, value){
        var i = arr.length;
        while(i--){
           if( arr[i] 
               && arr[i].hasOwnProperty(attr) 
               && (arguments.length > 2 && arr[i][attr] === value ) ){ 

               arr.splice(i,1);

           }
        }
        return arr;
    };
    $scope.allFields = [];
   $scope.generateMOR = function(status, item){
    console.log(status);
    if(typeof status == 'undefined' || status == false){
        //console.log(1);
        $scope.allFields.push(item);
        //console.log($scope.allFields);
    }else{
        //console.log(2);
        removeByAttr($scope.allFields, '-code', item['-code']);
        //console.log($scope.allFields);
    }
    //$scope.allFields.push(item);
    $scope.saveFields = function(filetype){
        var obj = { filetype: filetype, data: $scope.allFields}
        $http.post('http://54.81.141.186:3000/api/ijefile', obj).then( 
        function(result) {
            console.log(result);
            if(result.data.status){
                $scope.onsuccess = true;
                //alert('Data saved successfully')
            }else{  
                alert('something went wrong');
            }
        },function(error) {
            console.log(error);
            alert('something went wrong');
        });
    }
    
   }
})

/* ====== Mortality Controller ========= */

.controller('mortalityCtrl', function($scope, ngXml2json, $http, $state, $rootScope){
    $scope.selectedItem = 'Mortality';
    $scope.filterdetails = function(index){
        console.log(index);
        $state.go('filterdetails', {id: index, fileType: $scope.selectedItem});
    }
    $scope.loadFilter = function(filter){

        $http.get('./data/mortality.json').then( 
                function(result) {
                    console.log(result.data);
                  //var jsonObject = ngXml2json.parser(result.data);
                  //alert(jsonObject);
                  $scope.jsonData = result.data.STEVE_VR_File;
                  window.nag = result.data;
                },function(error) {
                    console.log('error', error);
                }); 
    }
})

/* ====== Filter Controller ========= */

.controller('filterCtrl', function($scope, $rootScope){
    $scope.selectedItem = 'BirthInfantDeath';
       $scope.data = {
        'BirthInfantDeath': {
            'mandatoryFilter': [
                {'recipient' : 'NCHS', 'configured': 'Yes'},
                {'recipient' : 'Vital Records', 'configured': 'Yes'}
            ],
            'optionalFilters':[
                {'recipient' : 'Approved Research', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Approved Research', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Child Health Registry', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Child Health Registry', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Infant/Child Death Review', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Infant/Child Death Review', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'National Violent Death Reporting System', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'National Violent Death Reporting System', 'internalIJE': 'Internal', 'configured': 'No'},
            ]
        },
        'FetalDeath': {
            'mandatoryFilter': [
                {'recipient' : 'NCHS', 'configured': 'Yes'},
                {'recipient' : 'Vital Records', 'configured': 'Yes'}
            ],
             'optionalFilters':[
                {'recipient' : 'Approved Research', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Approved Research', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Child Health Registry', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Child Health Registry', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Infant/Child Death Review', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Infant/Child Death Review', 'internalIJE': 'Internal', 'configured': 'Yes'},
                {'recipient' : 'National Violent Death Reporting System', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'National Violent Death Reporting System', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Other State-operated federal surveilance program', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Other State-operated federal surveilance program', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Private Sector Organization', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Private Sector Organization', 'internalIJE': 'Internal', 'configured': 'No'},
            ]
        },
        'ITOP': {
            'mandatoryFilter': [
                {'recipient' : 'Vital Records', 'configured': 'Yes'}
            ],
            'optionalFilters':[
            ]
        },
        'Mortality': {
            'mandatoryFilter': [
                {'recipient' : 'NCHS', 'configured': 'Yes'},
                {'recipient' : 'Vital Records', 'configured': 'Yes'}
            ],
            'optionalFilters':[
                {'recipient' : 'Approved Research', 'internalIJE': 'IJE', 'configured': 'Yes'},
                {'recipient' : 'Approved Research', 'internalIJE': 'Internal', 'configured': 'Yes'},
                {'recipient' : 'Child Health Registry', 'internalIJE': 'IJE', 'configured': 'Yes'},
                {'recipient' : 'Child Health Registry', 'internalIJE': 'Internal', 'configured': 'Yes'},
                {'recipient' : 'Child Support Enforcement', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Child Support Enforcement', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Diesease Registry', 'internalIJE': 'IJE', 'configured': 'Yes'},
                {'recipient' : 'Diesease Registry', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Health Start Program', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Health Start Program', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Infant/Child Death Review', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Infant/Child Death Review', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'National Violent Death Reporting System', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'National Violent Death Reporting System', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Private Sector Organization', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Private Sector Organization', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'State Eligibility Program', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'State Eligibility Program', 'internalIJE': 'Internal', 'configured': 'Yes'},
                {'recipient' : 'Voter Registration', 'internalIJE': 'IJE', 'configured': 'Yes'},
                {'recipient' : 'Voter Registration', 'internalIJE': 'Internal', 'configured': 'Yes'},
            ]
        },
        'NewNatality': {
            'mandatoryFilter': [
                {'recipient' : 'NCHS', 'configured': 'Yes'},
                {'recipient' : 'Vital Records', 'configured': 'Yes'}
            ],
            'optionalFilters':[
                {'recipient' : 'Approved Research', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Approved Research', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Child Health Registry', 'internalIJE': 'IJE', 'configured': 'Yes'},
                {'recipient' : 'Child Health Registry', 'internalIJE': 'Internal', 'configured': 'Yes'},
                {'recipient' : 'Child Support Enforcement', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Child Support Enforcement', 'internalIJE': 'Internal', 'configured': 'Yes'},
                {'recipient' : 'Diesease Registry', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Diesease Registry', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Health Start Program', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Health Start Program', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Infant/Child Death Review', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Infant/Child Death Review', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Other State-operated federal surveilance program', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Other State-operated federal surveilance program', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'PRAMS', 'internalIJE': 'IJE', 'configured': 'Yes'},
                {'recipient' : 'PRAMS', 'internalIJE': 'Internal', 'configured': 'Yes'},
                {'recipient' : 'Private Sector Organization', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Private Sector Organization', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'State Eligibility Program', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'State Eligibility Program', 'internalIJE': 'Internal', 'configured': 'No'}
            ]
        },
        'Roster': {
            'mandatoryFilter': [
                {'recipient' : 'Vital Records', 'configured': 'Yes'}
            ],
            'optionalFilters':[
                {'recipient' : 'Approved Research', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Approved Research', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Child Health Registry', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Child Health Registry', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Child Support Enforcement', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Child Support Enforcement', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Diesease Registry', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Diesease Registry', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Health Start Program', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Health Start Program', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Infant/Child Death Review', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Infant/Child Death Review', 'internalIJE': 'Internal', 'configured': 'No'},
                 {'recipient' : 'National Violent Death Reporting System', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'National Violent Death Reporting System', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Private Sector Organization', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Private Sector Organization', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'State Eligibility Program', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'State Eligibility Program', 'internalIJE': 'Internal', 'configured': 'No'},
                {'recipient' : 'Voter Registration', 'internalIJE': 'IJE', 'configured': 'No'},
                {'recipient' : 'Voter Registration', 'internalIJE': 'Internal', 'configured': 'No'},
            ]
        }
    };

    $scope.filterData = $scope.data['BirthInfantDeath'];
    $scope.loadFilter = function(item){
       // console.log($scope.data[item]);
        $scope.filterData = $scope.data[item];
    }
})
;


