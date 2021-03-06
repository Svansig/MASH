"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.consumeAtRate = exports.consume = void 0;
var kafkajs_1 = require("kafkajs");
var kafka = new kafkajs_1.Kafka({
    clientId: 'test-consumer',
    brokers: ['kafka:9092']
});
var count = 0;
var consumer = kafka.consumer({ groupId: 'test-group' });
consumer.subscribe({ topic: 'test-topic' });
exports.consume = function (socket, topic) {
    if (topic === void 0) { topic = 'test-topic'; }
    return __awaiter(void 0, void 0, void 0, function () {
        var consumer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    consumer = kafka.consumer({ groupId: 'test-group' });
                    consumer.subscribe({ topic: topic });
                    return [4 /*yield*/, consumer.run({
                            eachMessage: function (payload) { return __awaiter(void 0, void 0, void 0, function () {
                                var message;
                                return __generator(this, function (_a) {
                                    message = payload.message;
                                    socket.emit('consumeResponse', message.value.toString());
                                    return [2 /*return*/];
                                });
                            }); }
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.consumeAtRate = function (socket, rate, topic) { return __awaiter(void 0, void 0, void 0, function () {
    var ratedConsumer_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                ratedConsumer_1 = kafka.consumer();
                return [4 /*yield*/, ratedConsumer_1.connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, ratedConsumer_1.subscribe({ topic: topic })];
            case 2:
                _a.sent();
                return [4 /*yield*/, ratedConsumer_1.run({
                        eachMessage: function (payload) { return __awaiter(void 0, void 0, void 0, function () {
                            var value;
                            return __generator(this, function (_a) {
                                value = payload.message.value;
                                socket.emit('ratedConsumeResponse', value.toString());
                                ratedConsumer_1.pause([{ topic: topic }]);
                                setTimeout(function () { return ratedConsumer_1.resume([{ topic: topic }]); }, Math.floor(1000 / rate));
                                return [2 /*return*/];
                            });
                        }); }
                    })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.error('rated consumer error:', err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=consumer.js.map