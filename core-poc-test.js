/**
 * Test functions as "control-group" test. 
 * Should always pass.
 */
test( "Alway pass test.", function() {
  ok( 1 == "1", "Passed!" );
});

test( "Remove token test.", function() {
  var output = removeToken("a,b","a");
  ok( output == ",b", "Passed!" );
});

