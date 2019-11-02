// // const FIXParser = require('fixparser/browser');

// // const fixParser = new FIXParser();

// // console.log(fixParser.parse('8=FIX.4.2|9=51|35=0|34=703|49=ABC|52=20100130-10:53:40.830|56=XYZ|10=249|'));

// var FixProtocol = function FixProtocol() {

//     // incomplete FIX dict
//     this.DICT = {
//         BeginString: 8,
//         BodyLength: 9,
//         MsgType: 35,
//         SenderCompID: 49,
//         TargetCompID: 56,
//         MsgSeqNum: 34,
//         PossDupFlag: 43,
//         PossResend: 97,
//         SendingTime: 52,
//         OrigSendingTime: 122,
//         TestReqID: 112,
//         BeginSeqNo: 7,
//         EndSeqNo: 16,
//         RefSeqNum: 45,
//         RefTagID: 371,
//         RefMsgType: 372,
//         SessionRejectReason: 373,
//         Text: 58,
//         GapFillFlag: 123,
//         NewSeqNo: 36,
//         OrderID: 37,
//         SecondaryExecID: 527,
//         ClOrdID: 11,
//         OrigClOrdID: 41,
//         OrdStatusReqID: 790,
//         ExecID: 17,
//         ExecType: 150,
//         OrdStatus: 39,
//         OrdRejReason: 103,
//         Account: 1,
//         Side: 54,
//         OrdType: 40,
//         Price: 44,
//         StopPx: 99,
//         TimeInForce: 59,
//         LastQty: 32,
//         LastPx: 31,
//         LeavesQty: 151,
//         CumQty: 14,
//         AvgPx: 6,
//         TransactTime: 60,
//         SettlDate: 64,
//         CxlRejResponseTo: 434,
//         CxlRejReason: 102,
//         EncryptMethod: 98,
//         HeartBtInt: 108,
//         ResetSeqNumFlag: 141,
//         MaxMessageSize: 383,
//         Username: 553,
//         Password: 554,
//         ExecInst: 18,
//         TradeRequestID: 568,
//         TradeRequestType: 569,
//         SubscriptionRequestType: 263,
//         LastRptRequested: 912,
//         TradeDate: 75,
//         TotNumTradeReports: 748,
//         TradeRequestResult: 749,
//         TradeRequestStatus: 750,
//         CheckSum: 10,
//         SecurityID: 48,
//         SecurityIDSource: 22,
//         OrderQty: 38,
//         NoDates: 580,
//         NoSides: 552,
//         MDEntryType: 269,
//         MDReqID: 262,
//         MarketDepth: 264,
//         MDUpdateType: 265,
//         NoRelatedSym: 146,
//         NoMDEntryTypes: 267,
//         NoMDEntries: 268,
//         MDEntryPx: 270,
//         MDEntrySize: 271,
//         MDEntryDate: 272,
//         MDEntryTime: 273,
//         Symbol: 55
//     };
//     // SOH delimiter
//     this.SOH = "\x01";
//     // empty string
//     this.E_STR = "";
//     // trimmed message
//     this.TRIMED = this.E_STR;
//     // SeqNum generator
//     this.SEQNUM = 0;
// };

// FixProtocol.prototype._flipp = function (trans) {
//     var key, tmp_ar = {};

//     // Duck-type check for our own array()-created PHPJS_Array
//     if (trans && typeof trans === 'object' && trans.change_key_case) {
//         return trans.flip();
//     }

//     for (key in trans) {
//         if (!trans.hasOwnProperty(key)) {
//             continue;
//         }
//         tmp_ar[trans[key]] = key;
//     }

//     return tmp_ar;
// };

// FixProtocol.prototype.decode = function (fixString) {
//     if (!fixString) {
//         throw new Error("Please provide FIX message");
//     }
//     // var itemsArray = fixString.split(/\x01/);
//     var itemsArray = fixString.split('|');
//     var flippedDic = this._flipp(this.DICT);
//     var newObject = {};

//     itemsArray.forEach(function (value) {
//         var item = value.split("=");
//         if (typeof flippedDic[item[0]] !== 'undefined') {
//             if (typeof newObject[flippedDic[item[0]]] !== 'undefined') {
//                 if (typeof newObject[flippedDic[item[0]]] === 'object') {
//                     newObject[flippedDic[item[0]]].push(item[1]);
//                 } else {
//                     newObject[flippedDic[item[0]]] = [
//                         newObject[flippedDic[item[0]]],
//                         item[1]
//                     ];
//                 }
//             } else {
//                 newObject[flippedDic[item[0]]] = item[1];
//             }
//         } else {
//             if (item[0] !== "") {
//                 newObject[item[0]] = item[1];
//             }
//         }
//     });

//     return newObject;
// };

// const read = FixProtocol.prototype.decode('8=FIX.4.2|9=51|35=0|34=703|49=ABC|52=20100130-10:53:40.830|56=XYZ|10=249|');

// console.log(read);

const fixParser = require('fixparserjs');

const fix42test_1 = "8=FIX.4.29=035=849=JWEK56=BNJM34=350=515757=585052=20150406-12:17:2711=d3e3f1b3-da8a-4310-884e-9abc3cc0980b37=acd163dd-232d-4bc5-9dcb-9f484a0462c341=1aa523a8-2533-4c96-97ac-f717b358773b109=71191076=71191017=b7969f8e-56d3-40c8-b2dc-75322b76ec1a20=039=21=JWEK84930046155=HCBK48=46428843022=154=238=8030040=159=032=8030031=48.14100030=O29=114=803006=280.9975=20150406-12:17:2760=20150406-12:17:27150=2151=0207=P10=0";
// const newFix = "8=FIX.4.2|9=51|35=0|34=703|49=ABC|52=20100130-10:53:40.830|56=XYZ|10=249|";

// const par = JSON.parse({ "8": "FIX.4.2", "9": "60", "10": "246", "34": "2", "35": "0", "49": "initiator", "52": "20190430-17:21:36.082", "56": "acceptor" });
const decode = fixParser.parse(fix42test_1);

console.log(decode);
// console.log(fixParser.parse(newFix)); 
// console.log();