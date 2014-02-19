beforeEach(function () {
  jasmine.addMatchers({
    toBeAnInstanceOf:  function(util, customEqualityTesters) {

      return {
        compare: function(actual, expected) {
          var result = {};
          result.pass = actual instanceof expected;
          if (result.pass) {
            result.message = actual.constructor.name + "is an instance of " + expected.name;
          } else {
            result.message = "Expected " + actual.constructor.name + " to be an instance of " + expected.name;
          }
          return result;
        }
      }
    }
  });
});
