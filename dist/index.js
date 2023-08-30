'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HasherNoConcat = exports.OntimePitchHasher = undefined;

var _OntimePitchHasher = require('./OntimePitchHasher');

var _OntimePitchHasher2 = _interopRequireDefault(_OntimePitchHasher);

var _HasherNoConcat = require('./HasherNoConcat');

var _HasherNoConcat2 = _interopRequireDefault(_HasherNoConcat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Grid_default from './Grid'
// import {
//   fifth_steps_mode as fifth_steps_mode_default,
//   aarden_key_profiles as aarden_key_profiles_default,
//   krumhansl_and_kessler_key_profiles as krumhansl_and_kessler_key_profiles_default
// } from './util_key'


/**
 * @file Welcome to the API for MAIA Hash!
 *
 * MAIA Hash is a JavaScript package used by Music Artificial Intelligence
 * Algorithms, Inc. in various applications that we have produced or are
 * developing currently.
 *
 * @version 0.0.25
 * @author Tom Collins and Chenyu Gao
 * @copyright 2022-23
 *
 */

var OntimePitchHasher = exports.OntimePitchHasher = _OntimePitchHasher2.default;
var HasherNoConcat = exports.HasherNoConcat = _HasherNoConcat2.default;
// export const Grid = Grid_default


exports.default = {
  OntimePitchHasher: OntimePitchHasher,
  HasherNoConcat: HasherNoConcat
  // Grid,

};