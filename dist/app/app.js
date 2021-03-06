'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MainCtrl = (function () {
  function MainCtrl(config) {
    _classCallCheck(this, MainCtrl);

    this.depends = [];
    this.depCounters = [];
    this.workDays = config.workDays;
    this.currentDay = new Date().getDate > 13 ? new Date().getDate() : 13;
    this.count = this.workDays[this.currentDay].count;
    this.duration = this.workDays[this.currentDay].duration;
    this.finalCount = this.workDays[this.currentDay].final;
    this.increment = this.finalCount / this.duration;
    this.depends[1] = {
      count: Math.round(this.count * 40.5),
      final: Math.round(this.finalCount * 40.5)
    };
    this.depends[2] = {
      count: Math.round(this.count * 3.5),
      final: Math.round(this.finalCount * 3.5)
    };
    this.depends[3] = {
      count: Math.round(this.count * 118.5),
      final: Math.round(this.finalCount * 118.5)
    };
  }

  _createClass(MainCtrl, [{
    key: 'init',
    value: function init() {
      var vm = this;
      this.mainCounter = new flipCounter('mainCounter', {
        value: this.count,
        inc: this.increment,
        pace: 250
      });
      this.depends.forEach(function (dep, key) {
        dep.increment = dep.final / vm.duration;
        vm.depCounters[key] = new flipCounter('counter' + key, {
          value: dep.count,
          inc: dep.increment,
          pace: 250
        });
      });
      this.myInterval = setInterval(function () {
        vm.mainCounter.getValue() + vm.increment < vm.finalCount ? vm.count = vm.mainCounter.getValue() : vm.stop();
      }, 250);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.mainCounter.stop();
      this.mainCounter.setValue(this.finalCount);
      this.depCounters.forEach(function (counter) {
        counter.stop();
        counter.setValue(counter.final);
      });
      clearInterval(this.myInterval);
      this.count = this.finalCount;
    }
  }]);

  return MainCtrl;
})();

;

var params = new Config().getParameters();
var main = new MainCtrl({ workDays: params });
main.init();