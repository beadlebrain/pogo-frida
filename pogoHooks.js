'use strict';

let utils = require('./utils.js');
let structs = require('./pogoStructures.js');
let log = utils.log;

let hooks = {};

hooks['0x7c8ae0'] = {
    // NianticLabs.Platform.Rpc.Send(int method, int timeoutMs, int retryDelayMs, IMessage inProto, Action`1<IFuture`1<RpcData>> outCallback, CancellationToken cancelToken)
    onEnter: function(args) {
        let apiCall = structs.getRequestName(args[1].toInt32());
        log('Sending ' + apiCall);
    },
    onLeave: function (retval) {
    }
};

hooks['0x7c9020'] = {
    // NianticLabs.Platform.Rpc.Send(int timeoutMs, int retryDelayMs, Request[] requests, Action`1<Result> outCallback)
    onEnter: function(args) {
        let requestArray = args[3].add(16); // ilcppobject padding
        let ln = Memory.readInt(requestArray.add(8));
        let pointer = requestArray.add(8 + 8);
        for (let i = 0; i < ln; i++) {
            let request = structs.readRequestFromMemory(pointer);
            if (request.nice) {
                log('   ' + request.nice);
            } else {
                // log('   ' + request.methodName);
                log(JSON.stringify(request));
            }
            pointer = request._next;
        }
    },
    onLeave: function (retval) {
    }
};

// hooks['0x7c981c'] = {
//     onEnter: function(args) {
//         let nbApi = args[3].toInt32();
//         let pointer = args[4];
//         log('Sending call (' + nbApi + ')');
//         for (var i = 0; i < nbApi; i++) {
//             let apiEnum = Memory.readInt(pointer);
//             log(apiEnum);
//             log(RequestType[apiEnum]);
//             pointer.add(4);
//         }
//     },
//     onLeave: function (retval) {
//     }
// };

let entry = Process.findModuleByName('pokemongo');
Object.keys(hooks).map(hook => {
    Interceptor.attach(entry.base.add(ptr(hook)), hooks[hook]);
});
