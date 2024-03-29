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

import OntimePitchHasher_default from './OntimePitchHasher'
import HasherNoConcat_default from './HasherNoConcat'
// import Grid_default from './Grid'
// import {
//   fifth_steps_mode as fifth_steps_mode_default,
//   aarden_key_profiles as aarden_key_profiles_default,
//   krumhansl_and_kessler_key_profiles as krumhansl_and_kessler_key_profiles_default
// } from './util_key'


export const OntimePitchHasher = OntimePitchHasher_default
export const HasherNoConcat = HasherNoConcat_default
// export const Grid = Grid_default


export default {
  OntimePitchHasher,
  HasherNoConcat,
  // Grid,

}
