beforeEach ->
  jasmine.addMatchers toBeAnInstanceOf: (util, customEqualityTesters) ->
    compare: (actual, expected) ->
      result      = {}
      result.pass = actual instanceof expected
      if result.pass
        result.message = actual.constructor.name + "is an instance of " + expected.name
      else
        result.message = "Expected " + actual.constructor.name + " to be an instance of " + expected.name
      result

jasmine.getFixtures().fixturesPath = "spec/fixtures"
