var tape = require("tape"),
    jsdom = require("./jsdom"),
    d3_graphviz = require("../");

tape("logEvents(true) enables event logging.", function(test) {
    var window = global.window = jsdom('<div id="graph"></div>');
    var document = global.document = window.document;
    var graphviz = d3_graphviz.graphviz("#graph");

    graphviz
        .zoom(false)
        .logEvents(true)
        .dot('digraph {a -> b;}')
        .render();

    var eventTypes = graphviz._eventTypes;
    n = 0;
    for (let i in eventTypes) {
        let eventType = eventTypes[i];
        test.equal(typeof graphviz._dispatch.on(eventType + ".log"), 'function', "An event named " + eventType + ".log is registered when event logging is enabled");
        n += 1;
    }
    test.ok(n > 10, "More than 10 events are registered when event logging is enabled");
    test.equal(n, eventTypes.length, "All " + eventTypes.length + " events are registered when event logging is enabled");
    test.end();
});