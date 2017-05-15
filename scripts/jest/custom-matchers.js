/* @flow */
import objectMatchers from 'jasmine-object-matchers-jest';

// const containSubsetMatcher = () => ({
//   compare(actual, expected) {
//     if (typeof(actual) !== typeof(expected)) {
//       pass = false;
//     } else if (typeof(expected) !== 'object' || expected === null) {
//       pass = expected === actual;
//     } else if (!!expected && !actual) {
//       pass = false;
//     } else if (Array.isArray(expected)) {
//       if (typeof(actual.length) !== 'number') {
//         pass = false;
//       }
//       var aa = Array.prototype.slice.call(actual);
//       pass = expected.every(function (exp) {
//         return aa.some(function (act) {
//           return compare(exp, act);
//         });
//       });
//     } else if(expected instanceof Date && actual instanceof Date) {
//       pass = expected.getTime() === actual.getTime();
//     }

//     pass = Object.keys(expected).every((key) => {
//       var eo = expected[key];
//       var ao = actual[key];
//       if (typeof(eo) === 'object' && eo !== null && ao !== null) {
//         return compare(eo, ao);
//       }
//       return ao === eo;
//     });

//     return {
//       pass,
//       message,
//     };
//   }
// });


// beforeEach(() => {
//   // add object matchers
//   jasmine.addMatchers(objectMatchers['2.0']);

//   // containSubset
// });
