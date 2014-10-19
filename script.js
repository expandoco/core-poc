var patt = new RegExp("[\\w]+|[\\)]|[\\(]|[,]");
var stack = [];

function processInput(input){
    var token = patt.exec(input);
    var tokenValue;
    
    if (token !== null) {
        tokenValue = token[0];
        input = removeToken(input, tokenValue);
        
        return {
            input: input,
            tokenValue: tokenValue
        };
    }
    
    return null;
}

function parseTree(input) {    
    // TODO remove invalid characters.
    input = sanitizeInput(input);
    
    var endlessLoopCounter = 0;
    var root = {
        nodes: []
    }
   
    stack.push(root);

    var tokenInfo = processInput(input);
        
    while(tokenInfo !== null && endlessLoopCounter < 1000) {

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
                addNode(tokenInfo.tokenValue);
                break;
        }        
        
        tokenInfo = processInput(tokenInfo.input);
        
        endlessLoopCounter++;
    }
    if (endlessLoopCounter == 1000) {
        alert("Endless Loop detected");
    }
    return root;
}

function addNode(name){    
    var node = createNode(name);
    var currentNode = stack[stack.length-1];
    
    if (!currentNode.nodes){
        currentNode.nodes = [];
    }
    currentNode.nodes.push(node);
    stack.push(node);
}

function createNode(nodeName){
    return {
        name: nodeName
    };
}

function removeToken(input, token){
    return input.substring(token.length, input.length);
}

function sanitizeInput(input){
    return input.trim();
}

///////
   
function showTree(tree){
    var value = JSON.stringify(tree, null, "\t");
    var $jsontree = $("#jsontree");
    
    $jsontree.html(value);
    format($jsontree[0]);
}

function go(){
    var input = $("#contentbox").val();    
    var tree = parseTree(input);
    showTree(tree);
}

$("#go").on("click",go);

function format(obj) {
    
    var $this = $(obj),
        $code = $this.html(),
        $unescaped = $('<div/>').html($code).text();
   
    $this.empty();

    CodeMirror(obj, {
        value: $unescaped,
        mode: 'javascript',
        lineNumbers: !$this.is('.inline'),
        readOnly: true
    });    
}
