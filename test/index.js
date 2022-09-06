var should = require('chai').should(),
  // mma = require('../util-math'),
  mu = require('../dist/index');
  // Array operations.
  append_array = mu.append_array;
  append_array_of_arrays = mu.append_array_of_arrays;
  array_object_index_of = mu.array_object_index_of;
  array_object_index_of_array = mu.array_object_index_of_array;
  array_sum = mu.array_sum;
  copy_array_object = mu.copy_array_object;
  cyclically_permute_array_by = mu.cyclically_permute_array_by;
  // Array.prototype.equals
  // Array.prototype.index_item_1st_occurs
  // Array.prototype.index_item_1st_doesnt_occur
  max_argmax = mu.max_argmax;
  min_argmin = mu.min_argmin;
  multiply_array_by_constant = mu.multiply_array_by_constant;

  // Point-set operations.
  copy_point_set = mu.copy_point_set;
  count_rows = mu.count_rows;
  index_point_set = mu.index_point_set;
  get_unique = mu.get_unique;
  lex_more = mu.lex_more;
  restrict_point_set_in_nth_to_xs = mu.restrict_point_set_in_nth_to_xs;
  sort_rows = mu.sort_rows;
  subtract_two_arrays = mu.subtract_two_arrays;
  unique_rows = mu.unique_rows;

  // Stats/sampling.
  choose_one = mu.choose_one;
  corr = mu.corr;
  get_random_arbitrary = mu.get_random_arbitrary;
  get_random_int = mu.get_random_int;
  get_random_int_inclusive = mu.get_random_int_inclusive;
  mean = mu.mean;
  sample_without_replacement = mu.sample_without_replacement;
  std = mu.std;

  // Interpolation.
  index_1st_element_gt = mu.index_1st_element_gt;

  // Projection and patterns.
  lex_less_or_equal_triple = mu.lex_less_or_equal_triple;
  orthogonal_projection_not_unique_equalp = mu.orthogonal_projection_not_unique_equalp;
  maximal_translatable_pattern = mu.maximal_translatable_pattern;
  cardinality_score = mu.cardinality_score;

  // String operations.
  locations = mu.locations;
  my_last_string = mu.my_last_string;
  string_separated_string2array = mu.string_separated_string2array;

  // Utility.
  append_ontimes_to_time_signatures = mu.append_ontimes_to_time_signatures;
  bar_and_beat_number_of_ontime = mu.bar_and_beat_number_of_ontime;
  clef_sign_and_line2clef_name = mu.clef_sign_and_line2clef_name;
  convert_1st_bar2anacrusis_val = mu.convert_1st_bar2anacrusis_val;
  default_page_and_system_breaks = mu.default_page_and_system_breaks;
  group_grace_by_contiguous_id = mu.group_grace_by_contiguous_id;
  guess_morphetic = mu.guess_morphetic;
  guess_morphetic_in_C_major = mu.guess_morphetic_in_C_major;
  midi_note_morphetic_pair2pitch_and_octave = mu.midi_note_morphetic_pair2pitch_and_octave;
  MNN2pitch_simple = mu.MNN2pitch_simple;
  nos_symbols_and_mode2key_name = mu.nos_symbols_and_mode2key_name;
  ontime_of_bar_and_beat_number = mu.ontime_of_bar_and_beat_number;
  pitch_and_octave2midi_note_morphetic_pair = mu.pitch_and_octave2midi_note_morphetic_pair;
  remove_duplicate_clef_changes = mu.remove_duplicate_clef_changes;
  resolve_expressions = mu.resolve_expressions;
  row_of_max_bar_leq_bar_arg = mu.row_of_max_bar_leq_bar_arg;
  row_of_max_ontime_leq_ontime_arg = mu.row_of_max_ontime_leq_ontime_arg;
  sort_points_asc = mu.sort_points_asc;
  sort_points_asc_by_id = mu.sort_points_asc_by_id;
  staff_voice_xml2staff_voice_json = mu.staff_voice_xml2staff_voice_json;

  // File conversion.
  comp_obj2note_point_set = mu.comp_obj2note_point_set;
  split_point_set_by_staff = mu.split_point_set_by_staff;

  // Keyscape.
  aarden_key_profiles = mu.aarden_key_profiles;
  krumhansl_and_kessler_key_profiles = mu.krumhansl_and_kessler_key_profiles;
  fifth_steps_mode = mu.fifth_steps_mode;
  tonic_pitch_closest = mu.tonic_pitch_closest;

  // Chord labeling.
  chord_templates_pbmin7ths = mu.chord_templates_pbmin7ths;
  chord_lookup_pbmin7ths = mu.chord_lookup_pbmin7ths;
  connect_or_not = mu.connect_or_not;
  find_segment_against_template = mu.find_segment_against_template;
  HarmAn_forward = mu.HarmAn_forward;
  points_belonging_to_interval = mu.points_belonging_to_interval;
  score_segment_against_template = mu.score_segment_against_template;
  segment = mu.segment;

  // Quantisation
  farey = mu.farey;
  farey_quantise = mu.farey_quantise;


// Array operations.
describe('#append_array', function(){
  it('maps [[4], [1, 2]] to [4, 1, 2]', function(){
    append_array([[4], [1, 2]]).should.eql([4, 1, 2]);
  });
});

describe('#append_array_of_arrays', function(){
  it('maps [["yes", 0]] to [["yes", 0]]', function(){
    append_array_of_arrays(
      [["yes", 0]]
    ).should.eql(
      [["yes", 0]]
    );
  });

  it('maps [["yes", 0], ["no", 0]] to [["yes", 0], ["no", 0]]', function(){
    append_array_of_arrays(
      [["yes", 0], ["no", 0]]
    ).should.eql(
      [["yes", 0], ["no", 0]]
    );
  });

  it('maps [[["crotchet", 0], ["crotchet", 0]]] to [["crotchet", 0], ["crotchet", 0]]', function(){
    append_array_of_arrays(
      [[["crotchet", 0], ["crotchet", 0]]]
    ).should.eql(
      [["crotchet", 0], ["crotchet", 0]]
    );
  });

  it('maps [["yes", 0], [["crotchet", 0], ["crotchet", 0], ["crotchet", 0]], ["no", 4]] to [["yes", 0], ["crotchet", 0], ["crotchet", 0], ["crotchet", 0], ["no", 4]]', function(){
    append_array_of_arrays(
      [
        ["yes", 0],
        [["crotchet", 0], ["crotchet", 0], ["crotchet", 0]],
        ["no", 4]
      ]
    ).should.eql(
      [
        ["yes", 0],
        ["crotchet", 0],
        ["crotchet", 0],
        ["crotchet", 0],
        ["no", 4]
      ]
    );
  });
});


describe('#array_object_index_of', function(){
  it('maps array_object_index_of([{ "hello": "world", "foo": "bar" }, { "hello": "stevie", "foo": "baz" }], "stevie", "hello") to 1', function(){
    var myArray = [
      {
        "hello": "world",
        "foo": "bar"
      },
      {
        "hello": "stevie",
        "foo": "baz"
      }
    ];
    array_object_index_of(myArray, "stevie", "hello").should.equal(1);
  });

  it('maps array_object_index_of([{ "hello": "world", "foo": "bar" }, { "hello": "stevie", "foo": "baz" }], "stephie", "hello") to -1', function(){
    var myArray = [
      {
        "hello": "world",
        "foo": "bar"
      },
      {
        "hello": "stevie",
        "foo": "baz"
      }
    ];
    array_object_index_of(myArray, "stephie", "hello").should.equal(-1);
  });
});


describe('#array_object_index_of_array', function(){
  it('maps array_object_index_of_array([{ "state": [1, [-4, 0, 3]], "continuations": "blah1" }, { "state": [3, [-4, 7]], "continuations": "blah2" }], [3, [-4, 7]], "state") to 1', function(){
    var myArray = [
      {
        "state": [1, [-4, 0, 3]],
        "continuations": "blah1"
      },
      {
        "state": [3, [-4, 7]],
        "continuations": "blah2"
      }
    ];
    array_object_index_of_array(myArray, [3, [-4, 7]], "state").should.equal(1);
  });

  it('maps array_object_index_of_array([{ "state": [1, [-4, 0, 3]], "continuations": "blah1" }, { "state": [3, [-4, 7]], "continuations": "blah2" }], [3, [-4, 6]], "state") to -1', function(){
    var myArray = [
      {
        "state": [1, [-4, 0, 3]],
        "continuations": "blah1"
      },
      {
        "state": [3, [-4, 7]],
        "continuations": "blah2"
      }
    ];
    array_object_index_of_array(myArray, [3, [-4, 6]], "state").should.equal(-1);
  });
});


describe('#array_sum', function(){
  it('maps [1, -2, 3] to 2', function(){
    array_sum([1, -2, 3]).should.equal(2);
  });
});


describe('#copy_array_object', function(){
  it('demonstrates that a change to arr2 does not affect arr1', function(){
    var arr1 = { "eyes": "brown", "hair": "blue" };
    var arr2 = copy_array_object(arr1);
    arr2.hair = "green";
    arr1.hair.should.equal("blue");
  });
  it('demonstrates that a change to arr4 does not affect arr3', function(){
    var arr3 = ["eyes", "brown", "hair", "blue"];
    var arr4 = copy_array_object(arr3);
    arr4[2] = "green";
    arr3[2].should.equal("hair");
  });

});


describe('#cyclically_permute_array_by', function(){
  it('maps cyclically_permute_array_by(["eyes", "nose", "hair"], 1) to ["nose", "hair", "eyes"]', function(){
    cyclically_permute_array_by(["eyes", "nose", "hair"], 1).should.eql(["nose", "hair", "eyes"]);
  });

  it('maps cyclically_permute_array_by(["eyes", "nose", "hair"], 2) to ["hair", "eyes", "nose"]', function(){
    cyclically_permute_array_by(["eyes", "nose", "hair"], 2).should.eql(["hair", "eyes", "nose"]);
  });

  it('maps cyclically_permute_array_by([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 12) to [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]', function(){
    cyclically_permute_array_by([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 12).should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });
});


describe('#Array.prototype.equals', function(){
  it('maps [1, [2, 3]].equals([1, [2, 3]] to true', function(){
    var a = [1, [2, 3]];
    var tf = a.equals([1, [2, 3]]);
    tf.should.equal(true);
  });

  it('maps [1, [0, 3]].equals([1, [0, 3]] to false', function(){
    var a = [1, [0, 3]];
    var tf = a.equals([1, [2, 3]]);
    tf.should.equal(false);
  });
});


describe('#Array.prototype.index_item_1st_occurs', function(){
  it('maps [-7, [2, 3]].index_item_1st_occurs([2, 3]] to 1', function(){
    var a = [-7, [2, 3]];
    var ans = a.index_item_1st_occurs([2, 3]);
    ans.should.equal(1);
  });

  it('maps [[-7], [2, 3], { "schurrle": 7 }, 4].index_item_1st_occurs({ "schurrle": 7 }] to -1', function(){
    var b = [[-7], [2, 3], { "schurrle": 7 }, 4];
    var ans = b.index_item_1st_occurs({ "schurrle": 7 });
    ans.should.equal(-1);
  });
});


describe('#Array.prototype.index_item_1st_doesnt_occur', function(){
  it('maps [[1], [1], -7].index_item_1st_doesnt_occur([1]] to 2', function(){
    var a = [[1], [1], -7];
    var ans = a.index_item_1st_doesnt_occur([1]);
    ans.should.equal(2);
  });

  it('maps [{ "schurrle":7 }, 1, 1, [-7], [2, 3], 4].index_item_1st_doesnt_occur({ "schurrle": 7 }] to 0', function(){
    var b = [{ "schurrle":7 }, 1, 1, [-7], [2, 3], 4];
    var ans = b.index_item_1st_doesnt_occur({ "schurrle": 7 });
    ans.should.equal(0);
  });
});


describe('#max_argmax', function(){
  it('maps max_argmax([9, -2, 4, 11, -5]) to [11, 3]', function(){
    max_argmax([9, -2, 4, 11, -5]).should.eql([11, 3]);
  });
});


describe('#min_argmin', function(){
  it('maps min_argmin([9, -2, 4, 11, -5]) to [-5, 4]', function(){
    min_argmin([9, -2, 4, 11, -5]).should.eql([-5, 4]);
  });
});


describe('#multiply_array_by_constant', function(){
  it('maps multiply_array_by_constant([2, 0], 5) to [10, 0]', function(){
    multiply_array_by_constant([2, 0], 5).should.eql([10, 0]);
  });
});


// Point-set operations.
describe('#copy_point_set', function(){
  it('demonstrates that a change to arr2 does not affect arr1', function(){
    var arr1 = [[3, 0, 3], [-2, 2, 1], [4, -1, -2], [3, 0, 3]];;
    var arr2 = copy_array_object(arr1);
    arr2[1][0] = 3;
    arr1[1][0].should.equal(-2);
  });
});



describe('#count_rows', function(){
  it('maps count_rows([[0, 60], [0, 59], [0, 60]]) to [[[0, 59], [0, 60]], [1, 2]]', function(){
    count_rows([[0, 60], [0, 59], [0, 60]]).should.eql([[[0, 59], [0, 60]], [1, 2]]);
  });
});


describe('#count_rows', function(){
  it('maps count_rows([[0, 2, 60], [0, 1, 59], [0, 1, 60]], 1) to [[[0, 59], [0, 60]], [1, 3]]', function(){
    count_rows([[0, 2, 60], [0, 1, 59], [0, 1, 60]], 1).should.eql([[[0, 59], [0, 60]], [1, 3]]);
  });
});


describe('#index_point_set', function(){
  it('maps index_point_set([[3, 0, 3], [-2, 2, 1], [4, -1, -2], [3, 0, 3]]) to [[3, 0, 3, 0], [-2, 2, 1, 1], [4, -1, -2, 2], [3, 0, 3, 3]]', function(){
    index_point_set([[3, 0, 3], [-2, 2, 1], [4, -1, -2], [3, 0, 3]]).should.eql([[3, 0, 3, 0], [-2, 2, 1, 1], [4, -1, -2, 2], [3, 0, 3, 3]]);
  });
});


describe('#get_unique', function(){
  it('maps get_unique(["h", 1, "h", 2, "g", 2]) to ["h", 1, 2, "g"]', function(){
    get_unique(["h", 1, "h", 2, "g", 2]).should.eql(["h", 1, 2, "g"]);
  });
});


describe('#lex_more', function(){
  it('maps lex_more([2, 7, 1], [2, 4, 2]) to 1', function(){
    lex_more([2, 7, 1], [2, 4, 2]).should.equal(1);
  });
});


describe('#lex_more', function(){
  it('maps lex_more([2, -7, 1], [2, 4, 2]) to -1', function(){
    lex_more([2, -7, 1], [2, 4, 2]).should.equal(-1);
  });
});


describe('#restrict_point_set_in_nth_to_xs', function(){
  it('maps restrict_point_set_in_nth_to_xs([[2, 7], [3, 0], [-7, 3]], 1, [3, 7]) to [[2, 7], [-7, 3]]', function(){
    restrict_point_set_in_nth_to_xs([[2, 7], [3, 0], [-7, 3]], 1, [3, 7]).should.eql([[2, 7], [-7, 3]]);
  });
});


describe('#sort_rows', function(){
  it('maps sort_rows([[3, 0, 3], [-2, 2, 1], [4, -1, -2], [3, 0, 3]]) to [[[-2, 2, 1], [3, 0, 3], [3, 0, 3], [4, -1, -2]], [1, 0, 3, 2]]', function(){
    sort_rows([[3, 0, 3], [-2, 2, 1], [4, -1, -2], [3, 0, 3]]).should.eql([[[-2, 2, 1], [3, 0, 3], [3, 0, 3], [4, -1, -2]], [1, 0, 3, 2]]);
  });
});


describe('#subtract_two_arrays', function(){
  it('maps subtract_two_arrays([4, 7, -3], [8, -2, -3]) to [-4, 9, 0]', function(){
    subtract_two_arrays([4, 7, -3], [8, -2, -3]).should.eql([-4, 9, 0]);
  });
});


describe('#unique_rows', function(){
  it('maps unique_rows([[3, 0, 3], [-2, 2, 1], [4, -1, -2], [3, 0, 3]]) to [[[-2, 2, 1], [3, 0, 3], [4, -1, -2]], [[1], [0, 3], [2]]]', function(){
    unique_rows([[3, 0, 3], [-2, 2, 1], [4, -1, -2], [3, 0, 3]]).should.eql([[[-2, 2, 1], [3, 0, 3], [4, -1, -2]], [[1], [0, 3], [2]]]);
  });
});


// Stats sampling.
describe('#choose_one', function(){
  it('maps choose_one([3, 0, 1]) to one of 3, 0, or 1', function(){
    var ans = choose_one([3, 0, 1]);
    switch (ans){
      case 0:
        ans.should.equal(0);
        break;
      case 1:
        ans.should.equal(1);
        break;
      case 3:
        ans.should.equal(3);
        break;
    }
  });

  it('maps choose_one([3, 0, 1], [0.33, 0.67, 1]) to one of 3, 0, or 1', function(){
    var ans = choose_one([3, 0, 1], [0.33, 0.67, 1]);
    switch (ans){
      case 0:
        ans.should.equal(0);
        break;
      case 1:
        ans.should.equal(1);
        break;
      case 3:
        ans.should.equal(3);
        break;
    }
  });

  it('maps choose_one([3, 34], [0, 1]) to 34', function(){
    var ans = choose_one([3, 34], [0, 1]);
    ans.should.equal(34);
  });

  it('maps choose_one([3, 34], [1, 0]) to 3', function(){
    var ans = choose_one([3, 34], [1, 0]);
    ans.should.equal(3);
  });
});


describe('#corr', function(){
  it('maps corr([3, 0.5, -1, -1.5, -1.4], [-2.5, 0.1, 1, 1.8, 2]) to -0.991389', function(){
    var r = corr([3, 0.5, -1, -1.5, -1.4], [-2.5, 0.1, 1, 1.8, 2]);
    r = Math.round(r*1000000)/1000000;
    r.should.equal(-0.991389);
  });
});


describe('#get_random_arbitrary', function(){
  it('maps get_random_arbitrary(-2.3, 4) to a random number -2.3 <= x < 4', function(){
    var ans = get_random_arbitrary(-2.3, 4);
    if (ans >= -2.3 && ans < 4){
      ans.should.equal(ans);
    }
    else {
      throw "Error in get_random_arbitrary: function is not performing as described.";
    }
  });
});


describe('#get_random_int', function(){
  it('maps get_random_int(-2, 1) to a random number -2 <= x < 1', function(){
    var ans = get_random_int(-2, 1);
    switch (ans){
      case -2:
        ans.should.equal(-2);
        break;
      case -1:
        ans.should.equal(-1);
        break;
      case 0:
        ans.should.equal(0);
        break;
    }
  });
});


describe('#get_random_int_inclusive', function(){
  it('maps get_random_int_inclusive(-2, 1) to a random number -2 <= x <= 1', function(){
    var ans = get_random_int_inclusive(-2, 1);
    switch (ans){
      case -2:
        ans.should.equal(-2);
        break;
      case -1:
        ans.should.equal(-1);
        break;
      case 0:
        ans.should.equal(0);
        break;
      case 1:
        ans.should.equal(1);
        break;
    }
  });
});


describe('#mean', function(){
  it('maps mean([3, 0, 3]) to 2', function(){
    mean([3, 0, 3]).should.equal(2);
  });
});


describe('#sample_without_replacement', function(){
  it('maps sample_without_replacement([-2, 71], 1) to either [-2] or [71]', function(){
    var ans = sample_without_replacement([-2, 71], 1);
    switch (ans[0]){
      case -2:
        ans.should.eql([-2]);
        break;
      case 71:
        ans.should.eql([71]);
        break;
    }
  });

  it('maps sample_without_replacement([-2, 71], 2) to either [-2, 71] or [71, -2]', function(){
    var ans = sample_without_replacement([-2, 71], 2);
    switch (ans[0]){
      case -2:
        ans.should.eql([-2, 71]);
        break;
      case 71:
        ans.should.eql([71, -2]);
        break;
    }
  });

  it('maps sample_without_replacement([-2, 71], 3) to undefined', function(){
    var ans = sample_without_replacement([-2, 71], 3)
    should.equal(ans, undefined)
  });

  it('maps sample_without_replacement([], 1) to undefined', function(){
    var ans = sample_without_replacement([], 1);
    should.equal(ans, undefined)
  });
});


describe('#std', function(){
  it('maps std([727.7, 1086.5, 1091.0, 1361.3, 1490.5, 1956.1]) to 420.96', function(){
    (Math.round(100*std([727.7, 1086.5, 1091.0, 1361.3, 1490.5, 1956.1]))/100).should.equal(420.96);
  });
});


// Interpolation.
describe('#index_1st_element_gt', function(){
  it('maps index_1st_element_gt(0, [-2, -2, -1, 0, 0, 11, 14, 14, 14]) to 5', function(){
    index_1st_element_gt(0, [-2, -2, -1, 0, 0, 11, 14, 14, 14]).should.equal(5);
  });
});


// Projection.
describe('#lex_less_or_equal_triple', function(){
  it('maps lex_less_or_equal_triple([2, 1, 7], [3, 1, -3], [5, 2, 4], 3) to 0', function(){
    lex_less_or_equal_triple([2, 1, 7], [3, 1, -3], [5, 2, 4], 3).should.equal(0);
  });

  it('maps lex_less_or_equal_triple([1, 1, 7], [3, 1, -3], [5, 2, 4], 3) to 1', function(){
    lex_less_or_equal_triple([1, 1, 7], [3, 1, -3], [5, 2, 4], 3).should.equal(1);
  });

  it('maps lex_less_or_equal_triple([1, 1, 7], [3, 1, -3], [4, 1, 4], 3) to -1', function(){
    lex_less_or_equal_triple([1, 1, 7], [3, 1, -3], [4, 1, 4], 3).should.equal(-1);
  });
});


describe('#orthogonal_projection_not_unique_equalp', function(){
  it('maps orthogonal_projection_not_unique_equalp([[2, 4, -1, 6, 9], [0, 0, 4, 2, -7], [-3, -2, -1, -1, 1], [12, 0, -7, 5, 3], [1, 2, 3, 4, 3], [1, 2, 5, 4, 5]], [1, 1, 0, 1, 0]) to [[2, 4, 6], [0, 0, 2], [-3, -2, -1], [12, 0, 5], [1, 2, 4], [1, 2, 4]]', function(){
    orthogonal_projection_not_unique_equalp([[2, 4, -1, 6, 9], [0, 0, 4, 2, -7], [-3, -2, -1, -1, 1], [12, 0, -7, 5, 3], [1, 2, 3, 4, 3], [1, 2, 5, 4, 5]], [1, 1, 0, 1, 0]).should.eql([[2, 4, 6], [0, 0, 2], [-3, -2, -1], [12, 0, 5], [1, 2, 4], [1, 2, 4]]);
  });
});


describe('#maximal_translatable_pattern', function(){
  it('maps maximal_translatable_pattern([12, 2, 0], [[0, 69, 0.5], [0.5, 66, 0.5], [1, 67, 1], [2, 65, 1], [3, 66, 0.5], [3.5, 64, 0.5], [4, 62, 2], [5, 55, 1], [5, 59, 1], [5, 61, 1], [6, 63, 0.5], [6.5, 64, 0.5], [7, 55, 1], [7, 56, 1], [7, 61, 1], [7, 65, 1], [8, 55, 1], [8, 57, 1], [8, 61, 1], [8, 66, 1], [9, 51, 1], [9, 67, 0.5], [9.5, 70, 0.5], [10, 55, 1], [10, 60, 1], [10, 69, 2], [11, 51, 1], [12, 50, 1], [12, 71, 0.5], [12.5, 68, 0.5], [13, 57, 1], [13, 60, 1], [13, 62, 1], [13, 69, 1], [14, 60, 1], [14, 62, 1], [14, 65, 1], [14, 67, 1], [15, 68, 0.5], [15.5, 66, 0.5], [16, 57, 1], [16, 61, 1], [16, 63, 1], [16, 64, 2], [17, 57, 1], [17, 59, 1], [17, 63, 1], [18, 65, 0.5], [18.5, 66, 0.5], [19, 57, 1], [19, 58, 1], [19, 63, 1], [19, 67, 1], [20, 57, 1], [20, 59, 1], [20, 63, 1], [20, 68, 1]], 3, 57) to [[[0, 69, 0.5], [0.5, 66, 0.5], [1, 67, 1], [2, 65, 1], [3, 66, 0.5], [3.5, 64, 0.5], [4, 62, 2], [5, 55, 1], [5, 61, 1], [6, 63, 0.5], [6.5, 64, 0.5], [7, 55, 1], [7, 56, 1], [7, 61, 1], [7, 65, 1], [8, 55, 1], [8, 57, 1], [8, 61, 1], [8, 66, 1]], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]]', function(){
    maximal_translatable_pattern([12, 2, 0], [[0, 69, 0.5], [0.5, 66, 0.5], [1, 67, 1], [2, 65, 1], [3, 66, 0.5], [3.5, 64, 0.5], [4, 62, 2], [5, 55, 1], [5, 59, 1], [5, 61, 1], [6, 63, 0.5], [6.5, 64, 0.5], [7, 55, 1], [7, 56, 1], [7, 61, 1], [7, 65, 1], [8, 55, 1], [8, 57, 1], [8, 61, 1], [8, 66, 1], [9, 51, 1], [9, 67, 0.5], [9.5, 70, 0.5], [10, 55, 1], [10, 60, 1], [10, 69, 2], [11, 51, 1], [12, 50, 1], [12, 71, 0.5], [12.5, 68, 0.5], [13, 57, 1], [13, 60, 1], [13, 62, 1], [13, 69, 1], [14, 60, 1], [14, 62, 1], [14, 65, 1], [14, 67, 1], [15, 68, 0.5], [15.5, 66, 0.5], [16, 57, 1], [16, 61, 1], [16, 63, 1], [16, 64, 2], [17, 57, 1], [17, 59, 1], [17, 63, 1], [18, 65, 0.5], [18.5, 66, 0.5], [19, 57, 1], [19, 58, 1], [19, 63, 1], [19, 67, 1], [20, 57, 1], [20, 59, 1], [20, 63, 1], [20, 68, 1]], 3, 57).should.eql([[[0, 69, 0.5], [0.5, 66, 0.5], [1, 67, 1], [2, 65, 1], [3, 66, 0.5], [3.5, 64, 0.5], [4, 62, 2], [5, 55, 1], [5, 61, 1], [6, 63, 0.5], [6.5, 64, 0.5], [7, 55, 1], [7, 56, 1], [7, 61, 1], [7, 65, 1], [8, 55, 1], [8, 57, 1], [8, 61, 1], [8, 66, 1]], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]]);
  });
});


describe('#cardinality_score', function(){
  it('maps cardinality_score([[1, 1], [1, 3], [1, 4], [2, 2], [3, 1], [4, 1], [4, 4]], [[3, 4], [3, 6], [3, 7], [4, 2], [5, 4], [5, 5], [6, 7], [7, 1]]) to [0.625, [2, 2]]', function(){
    cardinality_score([[1, 1], [1, 3], [1, 4], [2, 2], [3, 1], [4, 1], [4, 4]], [[3, 4], [3, 6], [3, 7], [4, 2], [5, 4], [5, 5], [6, 7], [7, 1]]).should.eql([0.625, [2, 3]]);
  });
});


// String operations.
describe('#locations', function(){
  it('maps locations("z", "hi, how high is it?") to []', function(){
    locations("z", "hi, how high is it?").should.eql([]);
  });

  it('maps locations("i", "hi, how high is it?") to [1, 9, 13, 16]', function(){
    locations("i", "hi, how high is it?").should.eql([1, 9, 13, 16]);
  });
});


describe('#my_last_string', function(){
  it('maps my_last_string("F#5") to "5"', function(){
    my_last_string("F#5").should.equal("5");
  });

  it('maps my_last_string("") to ""', function(){
    my_last_string("").should.equal("");
  });
});


describe('#string_separated_string2array', function(){
  it('maps string_separated_string2array("and", "yes and maybe no and May") to ["yes", "maybe no", "May"]', function(){
    string_separated_string2array("and", "yes and maybe no and May").should.eql(["yes", "maybe no", "May"]);
  });

  it('maps string_separated_string2array("o", "uj k") to ["uj k"]', function(){
    string_separated_string2array("o", "uj k").should.eql(["uj k"]);
  });
});


// Utility.
describe('#append_ontimes_to_time_signatures', function(){
  it('maps append_ontimes_to_time_signatures([{ "barNo": 1, "topNo": 2, "bottomNo": 4 }, { "barNo": 2, "topNo": 3, "bottomNo": 8 }, { "barNo": 4, "topNo": 3, "bottomNo": 4 }, { "barNo": 7, "topNo": 5, "bottomNo": 8 }]) to [{ "barNo": 1, "topNo": 2, "bottomNo": 4, "ontime": 0 }, { "barNo": 2, "topNo": 3, "bottomNo": 8, "ontime": 2 }, { "barNo": 4, "topNo": 3, "bottomNo": 4, "ontime": 5 }, { "barNo": 7, "topNo": 5, "bottomNo": 8, "ontime": 14 }]', function(){
    append_ontimes_to_time_signatures([{ "barNo": 1, "topNo": 2, "bottomNo": 4 }, { "barNo": 2, "topNo": 3, "bottomNo": 8 }, { "barNo": 4, "topNo": 3, "bottomNo": 4 }, { "barNo": 7, "topNo": 5, "bottomNo": 8 }]).should.eql([{ "barNo": 1, "topNo": 2, "bottomNo": 4, "ontime": 0 }, { "barNo": 2, "topNo": 3, "bottomNo": 8, "ontime": 2 }, { "barNo": 4, "topNo": 3, "bottomNo": 4, "ontime": 5 }, { "barNo": 7, "topNo": 5, "bottomNo": 8, "ontime": 14 }]);
  });
});


describe('#bar_and_beat_number_of_ontime', function(){
  it('maps bar_and_beat_number_of_ontime(4, [{ "barNo": 1, "topNo": 2, "bottomNo": 4, "ontime": 0 }, { "barNo": 2, "topNo": 3, "bottomNo": 8, "ontime": 2 }, { "barNo": 4, "topNo": 3, "bottomNo": 4, "ontime": 5 }, { "barNo": 7, "topNo": 5, "bottomNo": 8, "ontime": 14 }]) to [3, 1.5]', function(){
    bar_and_beat_number_of_ontime(4, [{ "barNo": 1, "topNo": 2, "bottomNo": 4, "ontime": 0 }, { "barNo": 2, "topNo": 3, "bottomNo": 8, "ontime": 2 }, { "barNo": 4, "topNo": 3, "bottomNo": 4, "ontime": 5 }, { "barNo": 7, "topNo": 5, "bottomNo": 8, "ontime": 14 }]).should.eql([3, 1.5]);
  });
});


describe('#clef_sign_and_line2clef_name', function(){
  it('maps clef_sign_and_line2clef_name("C", 3) to "alto clef"', function(){
    clef_sign_and_line2clef_name("C", 3).should.equal("alto clef");
  });
});


describe('#convert_1st_bar2anacrusis_val', function(){
  it('maps convert_1st_bar2anacrusis_val({ "$": { "number": "0", "implicit": "yes", "width": "195.58" }, "print": [ { "system-layout": [] } ], "attributes": [ { "divisions": [6], "key": [], "time": [ { "beats": [4], "beat-type": [4] } ], "clef": ["blah"] } ], "note": [ { "rest": [], "duration": [3], "voice": [1], "type": [] }, { "$": [], "pitch": [], "duration": [1], "voice": [2], "type": [], "time-modification": [], "stem": [], "beam": [], "notations": [] }, { "$": [], "pitch": [], "duration": [1], "voice": [2], "type": [], "time-modification": [], "stem": [], "beam": [], "notations": [] }, { "rest": [], "duration": [1], "voice": [2], "type": [], "time-modification": [], "notations": [] } ], "backup": [ { "duration": [3] } ] }, 6) to [-0.5, 4]', function(){
    convert_1st_bar2anacrusis_val({ "$": { "number": "0", "implicit": "yes", "width": "195.58" }, "print": [ { "system-layout": [] } ], "attributes": [ { "divisions": [6], "key": [], "time": [ { "beats": [4], "beat-type": [4] } ], "clef": ["blah"] } ], "note": [ { "rest": [], "duration": [3], "voice": [1], "type": [] }, { "$": [], "pitch": [], "duration": [1], "voice": [2], "type": [], "time-modification": [], "stem": [], "beam": [], "notations": [] }, { "$": [], "pitch": [], "duration": [1], "voice": [2], "type": [], "time-modification": [], "stem": [], "beam": [], "notations": [] }, { "rest": [], "duration": [1], "voice": [2], "type": [], "time-modification": [], "notations": [] } ], "backup": [ { "duration": [3] } ] }, 6).should.eql([-0.5, 4]);
  });
});


describe('#default_page_and_system_breaks', function(){
  it('maps default_page_and_system_breaks([{ "name": "soprn", "id": "P1", "clef": "treble clef", "clefSign": "G", "clefLine": 2, "staffNo": 0 }, { "name": "alto", "id": "P2", "clef": "treble clef", "clefSign": "G", "clefLine": 2, "staffNo": 1 }], 100) to [[21, 41, 61, 81], [5, 9, 13, 17, 25, 29, 33, 37, 45, 49, 53, 57, 65, 69, 73, 77, 85, 89, 93, 97]]', function(){
    default_page_and_system_breaks([{ "name": "soprn", "id": "P1", "clef": "treble clef", "clefSign": "G", "clefLine": 2, "staffNo": 0 }, { "name": "alto", "id": "P2", "clef": "treble clef", "clefSign": "G", "clefLine": 2, "staffNo": 1 }], 100).should.eql([[21, 41, 61, 81], [5, 9, 13, 17, 25, 29, 33, 37, 45, 49, 53, 57, 65, 69, 73, 77, 85, 89, 93, 97]]);
  });
});


describe('#group_grace_by_contiguous_id', function(){
  it('maps group_grace_by_contiguous_id([{ "ID": "28", "pitch": "D4", "MNN": 62, "MPN": 61 }, { "ID": "29", "pitch": "Bb3", "MNN": 58, "MPN": 59 }, { "ID": "15", "pitch": "G3", "MNN": 55, "MPN": 57 }]) to [[{ "ID": "15", "pitch": "G3", "MNN": 55, "MPN": 57 }], [{ "ID": "28", "pitch": "D4", "MNN": 62, "MPN": 61 }, { "ID": "29", "pitch": "Bb3", "MNN": 58, "MPN": 59 }]]', function(){
    group_grace_by_contiguous_id([{ "ID": "28", "pitch": "D4", "MNN": 62, "MPN": 61 }, { "ID": "29", "pitch": "Bb3", "MNN": 58, "MPN": 59 }, { "ID": "15", "pitch": "G3", "MNN": 55, "MPN": 57 }]).should.eql([[{ "ID": "15", "pitch": "G3", "MNN": 55, "MPN": 57 }], [{ "ID": "28", "pitch": "D4", "MNN": 62, "MPN": 61 }, { "ID": "29", "pitch": "Bb3", "MNN": 58, "MPN": 59 }]]);
  });
});


describe('#guess_morphetic', function(){
  it('maps guess_morphetic(54, 4, 5) to 56', function(){
    guess_morphetic(54, 4, 5).should.equal(56);
  });

  it('maps guess_morphetic(67, 5, 5) to 64', function(){
    guess_morphetic(67, 5, 5).should.equal(64);
  });
});


describe('#guess_morphetic_in_C_major', function(){
  it('maps guess_morphetic_in_C_major(66) to 63', function(){
    guess_morphetic_in_C_major(66).should.equal(63);
  });

  it('maps guess_morphetic_in_C_major(56) to 57', function(){
    guess_morphetic_in_C_major(56).should.equal(57);
  });
});


describe('#midi_note_morphetic_pair2pitch_and_octave', function(){
  it('maps midi_note_morphetic_pair2pitch_and_octave(66, 63) to "F#4"', function(){
    midi_note_morphetic_pair2pitch_and_octave(66, 63).should.equal("F#4");
  });

  it('maps midi_note_morphetic_pair2pitch_and_octave(59, 59) to "B3"', function(){
    midi_note_morphetic_pair2pitch_and_octave(59, 59).should.equal("B3");
  });
});


describe('#MNN2pitch_simple', function(){
  it('maps MNN2pitch_simple(66) to "F#4"', function(){
    MNN2pitch_simple(66).should.equal("F#4");
  });

  it('maps MNN2pitch_simple(58) to "A#3"', function(){
    MNN2pitch_simple(58).should.equal("A#3");
  });
});


describe('#nos_symbols_and_mode2key_name', function(){
  it('maps nos_symbols_and_mode2key_name(-3, "minor") to "C minor"', function(){
    nos_symbols_and_mode2key_name(-3, "minor").should.equal("C minor");
  });
});


describe('#ontime_of_bar_and_beat_number', function(){
  it('maps ontime_of_bar_and_beat_number(3, 1.5, [{ "barNo": 1, "topNo": 2, "bottomNo": 4, "ontime": 0 }, { "barNo": 2, "topNo": 3, "bottomNo": 8, "ontime": 2 }, { "barNo": 4, "topNo": 3, "bottomNo": 4, "ontime": 5 }, { "barNo": 7, "topNo": 5, "bottomNo": 8, "ontime": 14 }]) to 4', function(){
    ontime_of_bar_and_beat_number(3, 1.5, [{ "barNo": 1, "topNo": 2, "bottomNo": 4, "ontime": 0 }, { "barNo": 2, "topNo": 3, "bottomNo": 8, "ontime": 2 }, { "barNo": 4, "topNo": 3, "bottomNo": 4, "ontime": 5 }, { "barNo": 7, "topNo": 5, "bottomNo": 8, "ontime": 14 }]).should.equal(4);
  });
});


describe('#pitch_and_octave2midi_note_morphetic_pair', function(){
  it('maps pitch_and_octave2midi_note_morphetic_pair("F#4") to [66, 63]', function(){
    pitch_and_octave2midi_note_morphetic_pair("F#4").should.eql([66, 63]);
  });

  it('maps pitch_and_octave2midi_note_morphetic_pair("B3") to [59, 59]', function(){
    pitch_and_octave2midi_note_morphetic_pair("B3").should.eql([59, 59]);
  });
});


describe('#remove_duplicate_clef_changes', function(){
  it('maps remove_duplicate_clef_changes([{ "barNo": 1, "clef": "treble clef", "staffNo": 0 }, { "barNo": 5, "clef": "alto clef", "staffNo": 0 }, { "barNo": 6, "clef": "alto clef", "staffNo": 0 }, { "barNo": 1, "clef": "bass clef", "staffNo": 1 }, { "barNo": 16, "clef": "bass clef", "staffNo": 1 }]) to [{ "barNo": 1, "clef": "treble clef", "staffNo": 0 }, { "barNo": 6, "clef": "alto clef", "staffNo": 0 }, { "barNo": 1, "clef": "bass clef", "staffNo": 1 }, { "barNo": 16, "clef": "bass clef", "staffNo": 1 }]', function(){
    remove_duplicate_clef_changes([{ "barNo": 1, "clef": "treble clef", "staffNo": 0 }, { "barNo": 5, "clef": "alto clef", "staffNo": 0 }, { "barNo": 6, "clef": "alto clef", "staffNo": 0 }, { "barNo": 1, "clef": "bass clef", "staffNo": 1 }, { "barNo": 16, "clef": "bass clef", "staffNo": 1 }]).should.eql([{ "barNo": 1, "clef": "treble clef", "staffNo": 0 }, { "barNo": 6, "clef": "alto clef", "staffNo": 0 }, { "barNo": 1, "clef": "bass clef", "staffNo": 1 }, { "barNo": 16, "clef": "bass clef", "staffNo": 1 }]);
  });
});


describe('#resolve_expressions', function(){
  it('maps resolve_expressions([{ "ID": "0", "barOn": 1, "beatOn": 1, "ontime": 0, "type": { "wedge": "crescendo" }, "placement": "below", "staffNo": 0 }, { "ID": "1", "barOn": 1, "beatOn": 1, "ontime": 0, "type": { "wedge": "diminuendo" }, "placement": "above", "staffNo": 0 }, { "ID": "2", "barOn": 1, "beatOn": 1, "ontime": 0, "type": { "dynamics": "f" }, "placement": "below", "staffNo": 0 }, { "ID": "3", "barOn": 1, "beatOn": 1, "ontime": 0, "type": { "wedge": "stop" }, "placement": "below", "staffNo": 0 }, { "ID": "4", "barOn": 1, "beatOn": 1, "ontime": 0, "type": { "wedge": "stop" }, "placement": "above", "staffNo": 0 }, { "ID": "5", "barOn": 2, "beatOn": 1, "ontime": 3, "type": { "dynamics": "fff" }, "placement": "below", "staffNo": 0 }]) to [{ "ID": "0", "barOn": 1, "beatOn": 1, "ontime": 0, "type": { "wedge": "crescendo" }, "placement": "below", "staffNo": 0, "barOff": 1, "beatOff": 1, "offtime": 0 }, { "ID": "1", "barOn": 1, "beatOn": 1, "ontime": 0, "type": { "wedge": "diminuendo" }, "placement": "above", "staffNo": 0, "barOff": 1, "beatOff": 1, "offtime": 0 }, { "ID": "2", "barOn": 1, "beatOn": 1, "ontime": 0, "type": { "dynamics": "f" }, "placement": "below", "staffNo": 0 }, { "ID": "5", "barOn": 1, "beatOn": 2, "ontime": 3, "type": { "dynamics": "fff" }, "placement": "below", "staffNo": 0 }]', function(){
    resolve_expressions([{ "ID": "0", "barOn": 1, "beatOn": 1, "ontime": 0, "type": { "wedge": "crescendo" }, "placement": "below", "staffNo": 0 }, { "ID": "1", "barOn": 1, "beatOn": 1, "ontime": 0, "type": { "wedge": "diminuendo" }, "placement": "above", "staffNo": 0 }, { "ID": "2", "barOn": 1, "beatOn": 1, "ontime": 0, "type": { "dynamics": "f" }, "placement": "below", "staffNo": 0 }, { "ID": "3", "barOn": 1, "beatOn": 1, "ontime": 0, "type": { "wedge": "stop" }, "placement": "below", "staffNo": 0 }, { "ID": "4", "barOn": 1, "beatOn": 1, "ontime": 0, "type": { "wedge": "stop" }, "placement": "above", "staffNo": 0 }, { "ID": "5", "barOn": 2, "beatOn": 1, "ontime": 3, "type": { "dynamics": "fff" }, "placement": "below", "staffNo": 0 }]).should.eql([{ "ID": "0", "barOn": 1, "beatOn": 1, "ontime": 0, "type": { "wedge": "crescendo" }, "placement": "below", "staffNo": 0, "barOff": 1, "beatOff": 1, "offtime": 0 }, { "ID": "1", "barOn": 1, "beatOn": 1, "ontime": 0, "type": { "wedge": "diminuendo" }, "placement": "above", "staffNo": 0, "barOff": 1, "beatOff": 1, "offtime": 0 }, { "ID": "2", "barOn": 1, "beatOn": 1, "ontime": 0, "type": { "dynamics": "f" }, "placement": "below", "staffNo": 0 }, { "ID": "5", "barOn": 2, "beatOn": 1, "ontime": 3, "type": { "dynamics": "fff" }, "placement": "below", "staffNo": 0 }]);
  });
});


describe('#row_of_max_bar_leq_bar_arg', function(){
  it('maps row_of_max_bar_leq_bar_arg(5, [{ "barNo": 1, "topNo": 2, "bottomNo": 4, "ontime": 0 }, { "barNo": 2, "topNo": 3, "bottomNo": 8, "ontime": 2 }, { "barNo": 4, "topNo": 3, "bottomNo": 4, "ontime": 5 }, { "barNo": 7, "topNo": 5, "bottomNo": 8, "ontime": 14 }]) to { "barNo": 4, "topNo": 3, "bottomNo": 4, "ontime": 5 }', function(){
    row_of_max_bar_leq_bar_arg(5, [{ "barNo": 1, "topNo": 2, "bottomNo": 4, "ontime": 0 }, { "barNo": 2, "topNo": 3, "bottomNo": 8, "ontime": 2 }, { "barNo": 4, "topNo": 3, "bottomNo": 4, "ontime": 5 }, { "barNo": 7, "topNo": 5, "bottomNo": 8, "ontime": 14 }]).should.eql({ "barNo": 4, "topNo": 3, "bottomNo": 4, "ontime": 5 });
  });

  it('maps row_of_max_bar_leq_bar_arg(0, [{ "barNo": 1, "topNo": 2, "bottomNo": 4, "ontime": 0 }, { "barNo": 2, "topNo": 3, "bottomNo": 8, "ontime": 2 }) to { "barNo": 1, "topNo": 2, "bottomNo": 4, "ontime": 0 }', function(){
    row_of_max_bar_leq_bar_arg(1, [{ "barNo": 1, "topNo": 2, "bottomNo": 4, "ontime": 0 }, { "barNo": 2, "topNo": 3, "bottomNo": 8, "ontime": 2 }]).should.eql({ "barNo": 1, "topNo": 2, "bottomNo": 4, "ontime": 0 });
  });
});


describe('#row_of_max_ontime_leq_ontime_arg', function(){
  it('maps row_of_max_ontime_leq_ontime_arg(5, [{ "barNo": 1, "topNo": 2, "bottomNo": 4, "ontime": 0 }, { "barNo": 2, "topNo": 3, "bottomNo": 8, "ontime": 2 }, { "barNo": 4, "topNo": 3, "bottomNo": 4, "ontime": 5 }, { "barNo": 7, "topNo": 5, "bottomNo": 8, "ontime": 14 }]) to { "barNo": 4, "topNo": 3, "bottomNo": 4, "ontime": 5 }', function(){
    row_of_max_ontime_leq_ontime_arg(5, [{ "barNo": 1, "topNo": 2, "bottomNo": 4, "ontime": 0 }, { "barNo": 2, "topNo": 3, "bottomNo": 8, "ontime": 2 }, { "barNo": 4, "topNo": 3, "bottomNo": 4, "ontime": 5 }, { "barNo": 7, "topNo": 5, "bottomNo": 8, "ontime": 14 }]).should.eql({ "barNo": 4, "topNo": 3, "bottomNo": 4, "ontime": 5 });
  });

  it('maps row_of_max_ontime_leq_ontime_arg(13, [{ "barNo": 0, "ontime": -4, "clef": "treble clef", "clefSign": "G", "clefLine": 2, "staffNo": 0 }, { "barNo": 4, "ontime": 12, "clef": "bass clef", "clefSign": "F", "clefLine": 4, "staffNo": 0 }, { "barNo": 6, "ontime": 20, "clef": "treble clef", "clefSign": "G", "clefLine": 2, "staffNo": 0 }]) to { "barNo": 4, "ontime": 12, "clef": "bass clef", "clefSign": "F", "clefLine": 4, "staffNo": 0 }', function(){
    row_of_max_ontime_leq_ontime_arg(13, [{ "barNo": 0, "ontime": -4, "clef": "treble clef", "clefSign": "G", "clefLine": 2, "staffNo": 0 }, { "barNo": 4, "ontime": 12, "clef": "bass clef", "clefSign": "F", "clefLine": 4, "staffNo": 0 }, { "barNo": 6, "ontime": 20, "clef": "treble clef", "clefSign": "G", "clefLine": 2, "staffNo": 0 }]).should.eql({ "barNo": 4, "ontime": 12, "clef": "bass clef", "clefSign": "F", "clefLine": 4, "staffNo": 0 });
  });
});


describe('#sort_points_asc', function(){
  it('maps [{ "ontime": 1, "MNN": 60, "staffNo": 0, "voiceNo": 1 }, { "ontime": 0, "MNN": 48, "staffNo": 1, "voiceNo": 1 }, { "ontime": 1.5, "MNN": 62, "staffNo": 0, "voiceNo": 0 }, { "ontime": 1, "MNN": 60, "staffNo": 0, "voiceNo": 0 }].sort(sort_points_asc) to [{ "ontime": 0, "MNN": 48, "staffNo": 1, "voiceNo": 1 }, { "ontime": 1, "MNN": 60, "staffNo": 0, "voiceNo": 0 }, { "ontime": 1, "MNN": 60, "staffNo": 0, "voiceNo": 1 }, { "ontime": 1.5, "MNN": 62, "staffNo": 0, "voiceNo": 0 }]', function(){
    var a = [{ "ontime": 1, "MNN": 60, "staffNo": 0, "voiceNo": 1 }, { "ontime": 0, "MNN": 48, "staffNo": 1, "voiceNo": 1 }, { "ontime": 1.5, "MNN": 62, "staffNo": 0, "voiceNo": 0 }, { "ontime": 1, "MNN": 60, "staffNo": 0, "voiceNo": 0 }].sort(sort_points_asc);
    a.should.eql([{ "ontime": 0, "MNN": 48, "staffNo": 1, "voiceNo": 1 }, { "ontime": 1, "MNN": 60, "staffNo": 0, "voiceNo": 0 }, { "ontime": 1, "MNN": 60, "staffNo": 0, "voiceNo": 1 }, { "ontime": 1.5, "MNN": 62, "staffNo": 0, "voiceNo": 0 }]);
  });
});


describe('#sort_points_asc_by_id', function(){
  it('maps [{"ID": "14.2"}, {"ID": "14.1"}].sort(sort_points_asc_by_id) to [{"ID": "14.1"}, {"ID": "14.2"}]', function(){
    var a = [{"ID": "14.2"}, {"ID": "14.1"}].sort(sort_points_asc_by_id);
    a.should.eql([{"ID": "14.1"}, {"ID": "14.2"}]);
  });
});


describe('#staff_voice_xml2staff_voice_json', function(){
  it('maps staff_voice_xml2staff_voice_json(6, [9, 10], 8) to [10, 1]', function(){
    staff_voice_xml2staff_voice_json(6, [9, 10], 8).should.eql([10, 1]);
  });
});


// File conversion.
describe('#comp_obj2note_point_set', function(){
  it('maps comp_obj2note_point_set({ "id": "KO3S1U", "name": "If ye love me", "composers": [{ "id": "HH123J", "name": "tallis_thomas", "displayName": "Thomas Tallis" }], "keySignatures": [{ "barNo": 1, "keyName": "C major", "fifthsStep": 0, "mode": 0, "ontime": 0 }], "timeSignatures": [{ "barNo": 1, "topNo": 4, "bottomNo": 4, "ontime": 0 }], "notes": [{ "ID": "3", "ontime": 0, "duration": 3, "offtime": 3, "barOn": 1, "beatOn": 1, "barOff": 1, "beatOff": 4, "pitch": "F4", "MNN": 65, "MPN": 63, "staffNo": 0, "voiceNo": 1 }, { "ID": "53", "ontime": 3, "duration": 1, "offtime": 4, "barOn": 1, "beatOn": 4, "barOff": 2, "beatOff": 1, "pitch": "F4", "MNN": 65, "MPN": 63, "staffNo": 0, "voiceNo": 1 }, { "ID": "10", "ontime": 4, "duration": 2, "offtime": 6, "barOn": 2, "beatOn": 1, "barOff": 2, "beatOff": 3, "pitch": "G4", "MNN": 67, "MPN": 64, "staffNo": 0, "voiceNo": 1 }, { "ID": "32", "ontime": 6, "duration": 3, "offtime": 9, "barOn": 2, "beatOn": 3, "barOff": 3, "beatOff": 2, "pitch": "A4", "MNN": 69, "MPN": 65, "staffNo": 0, "voiceNo": 1 }] }) to [[0, 65, 63, 3, 0, 0.8], [3, 65, 63, 1, 0, 0.8], [4, 67, 64, 2, 0, 0.8], [6, 69, 65, 3, 0, 0.8]]', function(){
    comp_obj2note_point_set({ "id": "KO3S1U", "name": "If ye love me", "composers": [{ "id": "HH123J", "name": "tallis_thomas", "displayName": "Thomas Tallis" }], "keySignatures": [{ "barNo": 1, "keyName": "C major", "fifthsStep": 0, "mode": 0, "ontime": 0 }], "timeSignatures": [{ "barNo": 1, "topNo": 4, "bottomNo": 4, "ontime": 0 }], "notes": [{ "ID": "3", "ontime": 0, "duration": 3, "offtime": 3, "barOn": 1, "beatOn": 1, "barOff": 1, "beatOff": 4, "pitch": "F4", "MNN": 65, "MPN": 63, "staffNo": 0, "voiceNo": 1 }, { "ID": "53", "ontime": 3, "duration": 1, "offtime": 4, "barOn": 1, "beatOn": 4, "barOff": 2, "beatOff": 1, "pitch": "F4", "MNN": 65, "MPN": 63, "staffNo": 0, "voiceNo": 1 }, { "ID": "10", "ontime": 4, "duration": 2, "offtime": 6, "barOn": 2, "beatOn": 1, "barOff": 2, "beatOff": 3, "pitch": "G4", "MNN": 67, "MPN": 64, "staffNo": 0, "voiceNo": 1 }, { "ID": "32", "ontime": 6, "duration": 3, "offtime": 9, "barOn": 2, "beatOn": 3, "barOff": 3, "beatOff": 2, "pitch": "A4", "MNN": 69, "MPN": 65, "staffNo": 0, "voiceNo": 1 }] }).should.eql([[0, 65, 63, 3, 0, 0.8], [3, 65, 63, 1, 0, 0.8], [4, 67, 64, 2, 0, 0.8], [6, 69, 65, 3, 0, 0.8]]);
  });
});


describe('#split_point_set_by_staff', function(){
  it('maps split_point_set_by_staff([[0, 52, 55, .5, 1], [.25, 76, 69, .5, 0], [.5, 54, 56, .5, 3], [.75, 75, 68, .5, 0], [1, 56, 57, .5, 0], [1.25, 74, 68, .5, 1], [1.5, 57, 58, .5, 1], [1.75, 73, 67, .5, 0], [2, 59, 59, .5, 0], [2.25, 71, 66, .5, 3]], 4) to [[[.25, 76, 69, .5, 0], [.75, 75, 68, .5, 0], [1, 56, 57, .5, 0], [1.75, 73, 67, .5, 0], [2, 59, 59, .5, 0]], [[0, 52, 55, .5, 1], [1.25, 74, 68, .5, 1], [1.5, 57, 58, .5, 1]], [[.5, 54, 56, .5, 3], [2.25, 71, 66, .5, 3]]]', function(){
    split_point_set_by_staff([[0, 52, 55, .5, 1], [.25, 76, 69, .5, 0], [.5, 54, 56, .5, 3], [.75, 75, 68, .5, 0], [1, 56, 57, .5, 0], [1.25, 74, 68, .5, 1], [1.5, 57, 58, .5, 1], [1.75, 73, 67, .5, 0], [2, 59, 59, .5, 0], [2.25, 71, 66, .5, 3]], 4).should.eql([[[.25, 76, 69, .5, 0], [.75, 75, 68, .5, 0], [1, 56, 57, .5, 0], [1.75, 73, 67, .5, 0], [2, 59, 59, .5, 0]], [[0, 52, 55, .5, 1], [1.25, 74, 68, .5, 1], [1.5, 57, 58, .5, 1]], [[.5, 54, 56, .5, 3], [2.25, 71, 66, .5, 3]]]);
  });
});


// Keyscape.
describe('#fifth_steps_mode', function(){
  it('maps fifth_steps_mode([[0, 60, 2], [0, 67, 1], [1, 65, 1], [2, 60, 2], [2, 64, 1], [3, 72, 1], [4, 62, 1]], krumhansl_and_kessler_key_profiles) to ["C major", 0.85, 0, 0]', function(){
    var ans = fifth_steps_mode([[0, 60, 2], [0, 67, 1], [1, 65, 1], [2, 60, 2], [2, 64, 1], [3, 72, 1], [4, 62, 1]], krumhansl_and_kessler_key_profiles);
    ans[1] = Math.round(100*ans[1])/100;
    ans.should.eql(["C major", 0.85, 0, 0]);
  });

  it('maps fifth_steps_mode([[0, 57, 2], [0, 64, 1], [1, 62, 1], [2, 56, 2], [2, 60, 1], [3, 59, 1], [4, 57, 1]], aarden_key_profiles) to ["A minor", 0.71, 3, 5]', function(){
    var ans2 = fifth_steps_mode([[0, 57, 2], [0, 64, 1], [1, 62, 1], [2, 56, 2], [2, 60, 1], [3, 59, 1], [4, 57, 1]], aarden_key_profiles);
    ans2[1] = Math.round(100*ans2[1])/100;
    ans2.should.eql(["A minor", 0.59, 3, 5]);
  });
});


describe('#tonic_pitch_closest', function(){
  it('maps tonic_pitch_closest([[0, 60, 2], [0, 67, 1], [1, 65, 1], [2, 60, 2], [2, 64, 1], [3, 72, 1], [4, 62, 1]], "G major") to [67, 64]', function(){
    tonic_pitch_closest([[0, 60, 2], [0, 67, 1], [1, 65, 1], [2, 60, 2], [2, 64, 1], [3, 72, 1], [4, 62, 1]], "G major").should.eql([67, 64]);
  });
});


// Chord labeling.
describe('#connect_or_not', function(){
  it('maps connect_or_not([3, 5], 8) to 0', function(){
    connect_or_not([3, 5], 8).should.equal(1);
  });
});


describe('#find_segment_against_template', function(){
  it('maps find_segment_against_template({ "points": [[2, 55, 57, 2], [2, 64, 62, 1], [2, 72, 67, 1]] }, chord_templates_pbmin7ths) to { "score": 3, "index": 0, "vector": [0, 4, 7] }', function(){
    find_segment_against_template({ "points": [[2, 55, 57, 2], [2, 64, 62, 1], [2, 72, 67, 1]] }, chord_templates_pbmin7ths).should.eql({ "score": 3, "index": 0, "vector": [0, 4, 7] });
  });
});


describe('#HarmAn_forward', function(){
  it('maps HarmAn_forward(segment([[-1, 74, 68, 0.75, 0], [-0.25, 71, 66, 0.25, 0], [0, 55, 57, 0.5, 1], [0, 74, 68, 1, 0], [0.5, 59, 59, 0.5, 1], [1, 62, 61, 0.5, 1], [1.5, 59, 59, 0.5, 1], [2, 62, 61, 0.5, 1], [2, 67, 64, 1, 0], [2.5, 59, 59, 0.5, 1], [3, 57, 58, 0.5, 1], [3, 66, 63, 1, 0], [3.5, 60, 60, 0.5, 1], [4, 62, 61, 0.5, 1], [4.5, 60, 60, 0.5, 1], [5, 62, 61, 0.5, 1], [5, 81, 72, 0.75, 0], [5.5, 60, 60, 0.5, 1], [5.75, 78, 70, 0.25, 0], [6, 54, 56, 0.5, 1], [6, 81, 72, 1, 0], [6.5, 57, 58, 0.5, 1], [7, 62, 61, 0.5, 1], [7.5, 57, 58, 0.5, 1], [8, 62, 61, 0.5, 1], [8, 72, 67, 1, 0], [8.5, 57, 58, 0.5, 1], [9, 55, 57, 0.5, 1], [9, 71, 66, 1, 0], [9.5, 59, 59, 0.5, 1], [10, 62, 61, 0.5, 1], [10.5, 59, 59, 0.5, 1]]), chord_templates_pbmin7ths, chord_lookup_pbmin7ths) to [{"ontime":-1,"offtime":3,"points":[[-1,74,68,0.75,0],[-0.25,71,66,0.25,0],[0,55,57,0.5,1],[0,74,68,1,0],[0.5,59,59,0.5,1],[1,62,61,0.5,1],[1.5,59,59,0.5,1],[2,62,61,0.5,1],[2,67,64,1,0],[2.5,59,59,0.5,1]],"score":12,"index":7,"name":"G major"},{"ontime":3,"offtime":9,"points":[[3,57,58,0.5,1],[3,66,63,1,0],[3.5,60,60,0.5,1],[4,62,61,0.5,1],[4.5,60,60,0.5,1],[5,62,61,0.5,1],[5,81,72,0.75,0],[5.5,60,60,0.5,1],[5.75,78,70,0.25,0],[6,54,56,0.5,1],[6,81,72,1,0],[6.5,57,58,0.5,1],[7,62,61,0.5,1],[7.5,57,58,0.5,1],[8,62,61,0.5,1],[8,72,67,1,0],[8.5,57,58,0.5,1]],"score":22,"index":14,"name":"D 7"},{"ontime":9,"offtime":11,"points":[[9,55,57,0.5,1],[9,71,66,1,0],[9.5,59,59,0.5,1],[10,62,61,0.5,1],[10.5,59,59,0.5,1]],"score":6,"index":7,"name":"G major"}]', function(){
    HarmAn_forward(segment([[-1, 74, 68, 0.75, 0], [-0.25, 71, 66, 0.25, 0], [0, 55, 57, 0.5, 1], [0, 74, 68, 1, 0], [0.5, 59, 59, 0.5, 1], [1, 62, 61, 0.5, 1], [1.5, 59, 59, 0.5, 1], [2, 62, 61, 0.5, 1], [2, 67, 64, 1, 0], [2.5, 59, 59, 0.5, 1], [3, 57, 58, 0.5, 1], [3, 66, 63, 1, 0], [3.5, 60, 60, 0.5, 1], [4, 62, 61, 0.5, 1], [4.5, 60, 60, 0.5, 1], [5, 62, 61, 0.5, 1], [5, 81, 72, 0.75, 0], [5.5, 60, 60, 0.5, 1], [5.75, 78, 70, 0.25, 0], [6, 54, 56, 0.5, 1], [6, 81, 72, 1, 0], [6.5, 57, 58, 0.5, 1], [7, 62, 61, 0.5, 1], [7.5, 57, 58, 0.5, 1], [8, 62, 61, 0.5, 1], [8, 72, 67, 1, 0], [8.5, 57, 58, 0.5, 1], [9, 55, 57, 0.5, 1], [9, 71, 66, 1, 0], [9.5, 59, 59, 0.5, 1], [10, 62, 61, 0.5, 1], [10.5, 59, 59, 0.5, 1]]), chord_templates_pbmin7ths, chord_lookup_pbmin7ths).should.eql([{"ontime":-1,"offtime":3,"points":[[-1,74,68,0.75,0],[-0.25,71,66,0.25,0],[0,55,57,0.5,1],[0,74,68,1,0],[0.5,59,59,0.5,1],[1,62,61,0.5,1],[1.5,59,59,0.5,1],[2,62,61,0.5,1],[2,67,64,1,0],[2.5,59,59,0.5,1]],"score":12,"index":7,"name":"G major"},{"ontime":3,"offtime":9,"points":[[3,57,58,0.5,1],[3,66,63,1,0],[3.5,60,60,0.5,1],[4,62,61,0.5,1],[4.5,60,60,0.5,1],[5,62,61,0.5,1],[5,81,72,0.75,0],[5.5,60,60,0.5,1],[5.75,78,70,0.25,0],[6,54,56,0.5,1],[6,81,72,1,0],[6.5,57,58,0.5,1],[7,62,61,0.5,1],[7.5,57,58,0.5,1],[8,62,61,0.5,1],[8,72,67,1,0],[8.5,57,58,0.5,1]],"score":22,"index":14,"name":"D 7"},{"ontime":9,"offtime":11,"points":[[9,55,57,0.5,1],[9,71,66,1,0],[9.5,59,59,0.5,1],[10,62,61,0.5,1],[10.5,59,59,0.5,1]],"score":6,"index":7,"name":"G major"}]);
  });
});


describe('#points_belonging_to_interval', function(){
  it('maps points_belonging_to_interval([[0, 60, 60, 2], [0, 67, 64, 1], [1, 65, 63, 1], [2, 60, 60, 2], [2, 64, 62, 1], [3, 72, 67, 1], [4, 62, 61, 1]], 1, 3) to [[0, 60, 60, 2], [1, 65, 63, 1], [2, 60, 60, 2], [2, 64, 62, 1]]', function(){
    points_belonging_to_interval([[0, 60, 60, 2], [0, 67, 64, 1], [1, 65, 63, 1], [2, 60, 60, 2], [2, 64, 62, 1], [3, 72, 67, 1], [4, 62, 61, 1]], 1, 3).should.eql([[0, 60, 60, 2], [1, 65, 63, 1], [2, 60, 60, 2], [2, 64, 62, 1]]);
  });
});


describe('#score_segment_against_template', function(){
  it('maps score_segment_against_template({ "points": [[2, 60, 60, 2], [2, 64, 62, 1]] }, [0, 4, 7]) to 1', function(){
    score_segment_against_template({ "points": [[2, 60, 60, 2], [2, 64, 62, 1]] }, [0, 4, 7]).should.equal(1);
  });
});


describe('#segment', function(){
  it('maps segment([[0, 60, 60, 2], [0, 67, 64, 1], [1, 65, 63, 1], [2, 60, 60, 2], [2, 64, 62, 1], [3, 72, 67, 1], [4, 62, 61, 1]]) to [{ "ontime": 0, "offtime": 1, "points": [[0, 60, 60, 2], [0, 67, 64, 1]] }, { "ontime": 1, "offtime": 2, "points": [[0, 60, 60, 2], [1, 65, 63, 1]] }, { "ontime": 2, "offtime": 3, "points": [[2, 60, 60, 2], [2, 64, 62, 1]] }, { "ontime": 3, "offtime": 4, "points": [[2, 60, 60, 2], [3, 72, 67, 1]] }, { "ontime": 4, "offtime": 5, "points": [[4, 62, 61, 1]] }]', function(){
    segment([[0, 60, 60, 2], [0, 67, 64, 1], [1, 65, 63, 1], [2, 60, 60, 2], [2, 64, 62, 1], [3, 72, 67, 1], [4, 62, 61, 1]]).should.eql([{ "ontime": 0, "offtime": 1, "points": [[0, 60, 60, 2], [0, 67, 64, 1]] }, { "ontime": 1, "offtime": 2, "points": [[0, 60, 60, 2], [1, 65, 63, 1]] }, { "ontime": 2, "offtime": 3, "points": [[2, 60, 60, 2], [2, 64, 62, 1]] }, { "ontime": 3, "offtime": 4, "points": [[2, 60, 60, 2], [3, 72, 67, 1]] }, { "ontime": 4, "offtime": 5, "points": [[4, 62, 61, 1]] }]);
  });
});


describe('#segment', function(){
  it('maps segment([[0, 60, 60, 2], [0, 67, 64, 1], [1, 65, 63, 1], [2, 60, 60, 2], [2, 64, 62, 1], [4, 62, 61, 1]], false, 0, 3) to [{ "ontime": 0, "offtime": 1, "points": [[0, 60, 60, 2], [0, 67, 64, 1]] }, { "ontime": 1, "offtime": 2, "points": [[0, 60, 60, 2], [1, 65, 63, 1]] }, { "ontime": 2, "offtime": 4, "points": [[2, 60, 60, 2], [2, 64, 62, 1]] }, { "ontime": 4, "offtime": 5, "points": [[4, 62, 61, 1]]}] }]', function(){
    segment([[0, 60, 60, 2], [0, 67, 64, 1], [1, 65, 63, 1], [2, 60, 60, 2], [2, 64, 62, 1], [4, 62, 61, 1]], false, 0, 3).should.eql([{ "ontime": 0, "offtime": 1, "points": [[0, 60, 60, 2], [0, 67, 64, 1]] }, { "ontime": 1, "offtime": 2, "points": [[0, 60, 60, 2], [1, 65, 63, 1]] }, { "ontime": 2, "offtime": 4, "points": [[2, 60, 60, 2], [2, 64, 62, 1]] }, { "ontime": 4, "offtime": 5, "points": [[4, 62, 61, 1]]}]);
  });
});


// Quantisation.
describe('#farey', function(){
  it('maps farey(6) to [0, 0.16667, 1/5, 1/4, 0.33333, 2/5, 1/2, 3/5, 0.66667, 3/4, 4/5, 0.83333, 1]', function(){
    farey(6).should.eql([0, 0.16667, 1/5, 1/4, 0.33333, 2/5, 1/2, 3/5, 0.66667, 3/4, 4/5, 0.83333, 1]);
  });
});


describe('#farey_quantise', function(){
  it('maps farey_quantise([[0.1, 60, 60, 0.76], [0.73, 62, 61, 2.34]]) to [[0, 60, 60, 0.75], [0.75, 62, 61, 2.33333]]', function(){
    farey_quantise([[0.1, 60, 60, 0.76], [0.73, 62, 61, 2.34]]).should.eql([[0, 60, 60, 0.75], [0.75, 62, 61, 2.33333]]);
  });

  it('maps farey_quantise([[0.1, 60, 0.12]], farey(4), [0, 2]) to [[0, 60, 0.25]]', function(){
    farey_quantise([[0.1, 60, 0.12]], farey(4), [0, 2]).should.eql([[0, 60, 0.25]]);
  });

  it('maps farey_quantise([[0.1, 60, 1]], farey(4), [0, 2]) to [[0, 60, 1]]', function(){
    farey_quantise([[0.1, 60, 1]], farey(4), [0, 2]).should.eql([[0, 60, 1]]);
  });
});
