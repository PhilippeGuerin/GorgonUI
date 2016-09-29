'use strict';

describe('gorgonList', function() {

  // Load the module that contains the `gorgonList` component before each test
  beforeEach(module('gorgonList'));

  // Test the controller
  describe('gorgonListController', function() {
    var $httpBackend, ctrl;

    beforeEach(inject(function($componentController, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('gorgons/gorgons.json')
                  .respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      ctrl = $componentController('gorgonList');
    }));

    it('should create a `gorgons` property with 2 gorgons fetched with `$http`', function() {
      jasmine.addCustomEqualityTester(angular.equals);

      expect(ctrl.gorgons).toEqual([]);

      $httpBackend.flush();
      expect(ctrl.gorgons).toEqual([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
    });

    it('should set a default value for the `orderProp` property', function() {
      expect(ctrl.orderProp).toBe('age');
    });

  });

});
