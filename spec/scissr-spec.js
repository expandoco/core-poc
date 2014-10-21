describe("Scissr.js Testing", function() {
  // Variable should be listed below

  beforeEach(function() {
    // Run before each test.
    // Remove if not in use.
  });

  it("Always pass test", function() {
    expect("1").toEqual("1");
  });

  describe("Token functionality test.", function() {
    beforeEach(function() {
      // Remove if not in use.
    });

    it("Token should be removed for input string", function() {
        var output = removeToken("a,b,c","a");
        expect(output).toBe(",b,c");
    });
  });

});
