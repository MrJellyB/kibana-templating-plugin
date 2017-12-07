import moment from 'moment';
import { uiModules } from 'ui/modules';
import uiRoutes from 'ui/routes';

import 'ui/autoload/styles';
import './less/main.less';
import template from './templates/index.html';

uiRoutes.enable();
uiRoutes
  .when('/', {
    template,
    resolve: {
      currentTime($http) {
        return $http.get('../api/kibana-templating-plugin/example').then(function (resp) {
          return resp.data.time;
        });
      }
    }
  });

uiModules
  .get('app/kibana-templating-plugin', [])
  .controller('kibanaTemplatingPluginHelloWorld', function ($scope, $route, $interval) {
    $scope.title = 'Kibana Templating Plugin';
    $scope.description = 'Plugin for making templates out of visualizations and dashboards';

    const currentTime = moment($route.current.locals.currentTime);
    $scope.currentTime = currentTime.format('HH:mm:ss');
    const unsubscribe = $interval(function () {
      $scope.currentTime = currentTime.add(1, 'second').format('HH:mm:ss');
    }, 1000);
    $scope.$watch('$destroy', unsubscribe);
  });
