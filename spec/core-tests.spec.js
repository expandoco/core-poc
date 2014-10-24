
  describe("Scissr.js Testing", function() {
    // Variable should be listed below
    var scissr = require('../src/scissr');

    it("Should remove token from input string", function() {
          var output = scissr.removeToken("a,b,c","a");
          expect(output).toBe(",b,c");
    });

    it("Should create a node with valid name", function() {
          var output = scissr.createNode("test");
          var expected = { name: "test"};
          expect(output.name).toBe(expected.name);
    });

    it("Should sanitize dirty input", function() {
          var output = scissr.sanitizeInput("  test  ");
          expect(output).toBe("test");
    });

    it("Should create node and push it to the stack", function() {
          scissr.stack.push({ nodes: []});
          
          spyOn(scissr, 'createNode').andReturn({ name: "test-node" });

          scissr.createNodeAndPushToStack("test-node");

          expect(scissr.stack.length).toBe(2);
          expect(scissr.stack[1].name).toBe("test-node");
    });

    it("Should process input and return token object", function() {
          spyOn(scissr, 'removeToken').andReturn(",B");

          var output = scissr.processInput("A,B");

          expect(output.input).toBe(",B");
          expect(output.tokenValue).toBe("A");
    });

    it("Should parse input into tree object", function() {
          //todo
    });

  });