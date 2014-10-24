if (typeof module === 'object' && typeof define !== 'function') {
    define = function (factory) {
        module.exports = factory(require, exports, module);
    };
}

define(function (){
     "use strict";

    /** Regex pattern to identify tokens. */
    var tokenPattern = new RegExp("[\\w]+|[\\)]|[\\(]|[,]");

    /*
     * Stack is used in creatation of the syntax tree. 
     * Stack always contains the reference from the current node
     * to the root.
     */
    var stack = [];  

    /** Max number of iteration allowed in the parse tree. */
    var MAX_NUMBER_OF_ITTERATIONS = 1000;


    /**
     * Removes next token from input strings,
     * and packs into a tokeninfo object.
     *
     * return null if no tokens are left in input 
     *             to process.
     */
    function processInput(input){
        var token = tokenPattern.exec(input);
        var output = null;

        if (token !== null) {
            var tokenValue = token[0];
            input = removeToken(input, tokenValue);
            
            output = {
                input: input,
                tokenValue: tokenValue
            };
        }
        return output;
    }

    /**
     * Parse the input to create a syntax tree.
     */
    function parseTree(input) {    
        input = sanitizeInput(input);
        
        var counter = 0;
        var root = {
            nodes: []
        };
        
        stack.push(root);
        var tokenInfo = processInput(input);
            
        while(tokenInfo !== null && counter < MAX_NUMBER_OF_ITTERATIONS) {

            switch (tokenInfo.tokenValue) {
                case ",": 
                    stack.pop();
                    break;
                case ")": 
                    stack.pop();
                    break;
                case "(": 
                    break;    
                default:
                    createNodeAndPushToStack(tokenInfo.tokenValue);
                    break;
            }        
            
            tokenInfo = processInput(tokenInfo.input);
            counter++;
        }

        if (counter === MAX_NUMBER_OF_ITTERATIONS) {
            console.error("ERROR:Max number of iterations reached. Stopping execution.");
        }

        return root;
    }

    /**
     * Creates a new node with parameter name and adds it to the current node
     * as a child node.
     */
    function createNodeAndPushToStack(name){ 
        var node = createNode(name);
        // Get the node at the top of the stack.
        var currentNode = stack[stack.length-1];
        // If the node is currently a leave node
        // add nodes array to store children.
        if (!currentNode.nodes){
            currentNode.nodes = [];
        }

        currentNode.nodes.push(node);
        stack.push(node);
    }

    /**
     * Creates a node with requiered data fields.
     */
    function createNode(nodeName){
        return {
            name: nodeName
        };
    }

    /**
     * Function removes the string 'token' from the input and returns the result.
     */
    function removeToken(input, token){
        return input.substring(token.length, input.length);
    }

    /**
     * Remove invalid characters from input string.
     */
    function sanitizeInput(input){
        return input.trim();
    }

    return {
        stack: stack,
        removeToken: removeToken,
        createNode: createNode,
        sanitizeInput: sanitizeInput,
        createNodeAndPushToStack: createNodeAndPushToStack,
        processInput: processInput,
        parseTree: parseTree
    };

});

