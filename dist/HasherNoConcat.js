"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Imports
var fs = require("fs");
var path = require("path");
var mu = require("maia-util");
// import PointSet from './PointSet'

var HasherNoConcat = function () {
  function HasherNoConcat(_mapPath) {
    _classCallCheck(this, HasherNoConcat);

    if (_mapPath !== undefined) {
      this.map = require(_mapPath);
    } else {
      this.map = {};
    }
  }

  _createClass(HasherNoConcat, [{
    key: "contains",
    value: function contains(aKey) {
      return this.map[aKey];
    }

    // The expected format is with ontime in the first dimension and pitch in the
    // second dimension of pts. It is assumed that pts is sorted
    // lexicographically.

  }, {
    key: "create_hash_entries",
    value: function create_hash_entries(pts, fnam) {
      var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "duples";
      var insertMode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "increment and file with fnams";
      var tMin = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.1;
      var tMax = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 10;
      var pMin = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;
      var pMax = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 12;
      var folder = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : __dirname;

      var npts = pts.length;
      // console.log("npts:", npts)
      var nh = 0;

      switch (mode) {
        case "duples":
          for (var i = 0; i < npts - 1; i++) {
            var v0 = pts[i];
            var j = i + 1;
            while (j < npts) {
              var v1 = pts[j];
              var td = v1[0] - v0[0];
              var apd = Math.abs(v1[1] - v0[1]);
              // console.log("i:", i, "j:", j)
              // Decide whether to make a hash entry.
              if (td > tMin && td < tMax && apd >= pMin && apd <= pMax) {
                // Make a hash entry, something like "±pdtd"
                var he = this.create_hash_entry([v1[1] - v0[1], td], mode, v0[0], fnam, tMin, tMax);
                this.insert(he);
                nh++;
              } // End whether to make a hash entry.
              if (td >= tMax) {
                j = npts - 1;
              }
              j++;
            } // End while.
          } // for (let i = 0;
          break;

        case "triples":
          for (var _i = 0; _i < npts - 2; _i++) {
            var _v = pts[_i];
            var _j = _i + 1;
            while (_j < npts - 1) {
              var _v2 = pts[_j];
              var td1 = _v2[0] - _v[0];
              var apd1 = Math.abs(_v2[1] - _v[1]);
              // console.log("i:", i, "j:", j)
              // Decide whether to proceed to v1 and v2.
              if (td1 > tMin && td1 < tMax && apd1 >= pMin && apd1 <= pMax) {
                var k = _j + 1;
                while (k < npts) {
                  var v2 = pts[k];
                  var td2 = v2[0] - _v2[0];
                  var apd2 = Math.abs(v2[1] - _v2[1]);
                  // console.log("j:", j, "k:", k)
                  // Decide whether to make a hash entry.
                  if (td2 > tMin && td2 < tMax && apd2 >= pMin && apd2 <= pMax) {
                    // Make a hash entry, something like "±pd1±pd2tdr"
                    var _he = this.create_hash_entry([_v2[1] - _v[1], v2[1] - _v2[1], td2 / td1], mode, _v[0], fnam, tMin, tMax);
                    this.insert(_he, insertMode, folder);
                    nh++;
                  } // End whether to make a hash entry.
                  if (td2 >= tMax) {
                    k = npts - 1;
                  }
                  k++;
                } // End k while.
              }
              if (td1 >= tMax) {
                _j = npts - 2;
              }
              _j++;
            } // End j while.
          } // for (let i = 0;
          break;

        default:
          console.log("Should not get to default in create_hash_entries() switch.");
      }

      return nh;
    }
  }, {
    key: "create_hash_entry",
    value: function create_hash_entry(vals, mode, ctime, fnam, tMin, tMax) {
      var str = "",
          isInteger = void 0;
      switch (mode) {
        case "duples":
          // Sense-check pitch difference.
          var apd = Math.abs(vals[0]);
          if (apd >= 100 || Math.round(vals[0]) !== vals[0]) {
            console.log("Unexpected pitch difference:", vals[0]);
            console.log("Returning.");
            return;
          }
          if (vals[0] >= 0) {
            str += "+";
          } else {
            str += "-";
          }
          if (apd < 10) {
            str += "0";
          }
          str += apd;
          // Sense-check time difference.
          isInteger = Math.round(vals[1]) === vals[1];
          if (vals[1] >= tMax || vals[1] < tMin) {
            console.log("Unexpected time difference:", vals[1]);
            console.log("Returning.");
            return;
          }
          // Round time difference to 1 d.p. and append to str.
          str += Math.round(10 * vals[1]) / 10;
          if (isInteger) {
            str += ".0";
          }
          break;

        case "triples":
          // Sense-check pitch difference.
          vals.slice(0, 2).forEach(function (v, idx) {
            var apd = Math.abs(v);
            if (apd >= 100 || Math.round(v) !== v) {
              console.log("Unexpected pitch difference:", v, idx);
              console.log("Returning.");
              return;
            }
            if (v >= 0) {
              str += "+";
            } else {
              str += "-";
            }
            if (apd < 10) {
              str += "0";
            }
            str += apd;
          });
          // Sense-check time difference ratio.
          if (vals[2] >= tMax / tMin || vals[2] < tMin / tMax) {
            console.log("Unexpected time difference:", vals[2]);
            console.log("Returning.");
            return;
          }
          // If ratio less than 1, invert and give it a negative sign so that such
          // values are as accurately represented as positive values.
          // console.log("vals[2] before inversion:", vals[2])
          var sign = "+";
          if (vals[2] < 1) {
            vals[2] = 1 / vals[2];
            sign = "-";
          }
          // console.log("vals[2] after inversion:", vals[2])
          str += sign;
          // Round time difference ratio to 1 d.p. and append to str.
          var dp1 = Math.round(10 * vals[2]) / 10;
          isInteger = Math.round(dp1) === dp1;
          // console.log("isInteger:", isInteger)
          str += dp1;
          if (isInteger) {
            str += ".0";
          }
          // console.log("str:", str)
          break;

        default:
          console.log("Should not get to default in create_hash_entry() switch.");
      }
      return {
        "hash": str,
        "ctimes": [ctime],
        "fnams": [fnam]
      };
    }

    // Obsolete

  }, {
    key: "get_piece_names",
    value: function get_piece_names(countBins, binSize) {
      var topN = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

      var out = [];

      countBins.forEach(function (value, key) {
        var pieceHist = countBins.get(key);
        pieceHist.forEach(function (setSize, idx) {
          out.push({
            "pieceId": key,
            "index": idx,
            "setSize": setSize
          });
        });
      });

      // "out" contains the index of bin,
      // and it is sorted based on the corresponding number of hash entries contained in "hist".
      out.sort(function (a, b) {
        return b.setSize - a.setSize;
      });
      out = out.slice(0, topN);

      return out.map(function (entry) {
        return {
          "winningPiece": entry.pieceId, "edge": entry.index * binSize, "count": entry.setSize
        };
      });
    }
  }, {
    key: "insert",
    value: function insert(hashEntry) {
      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "hash and lookup";
      var dir = arguments[2];

      var key = hashEntry.hash;
      var lookup = this.contains(key);
      switch (method) {
        case "hash and lookup":
          if (lookup !== undefined) {
            // Extend ctimes and fnams arrays.
            lookup.ctimes.push(hashEntry.ctimes[0]);
            lookup.fnams.push(hashEntry.fnams[0]);
          } else {
            delete hashEntry.hash;
            this.map[key] = hashEntry;
          }
          break;
        case "increment and file with fnams":
          if (lookup !== undefined) {
            this.map[key].increment++;
          } else {
            this.map[key] = {
              "increment": 1,
              "log": fs.openSync(path.join(dir, key + ".json"), "a")
            };
          }
          fs.writeSync(this.map[key].log, JSON.stringify([Math.round(100 * hashEntry.ctimes[0]) / 100, hashEntry.fnams[0]]) + ",");
          break;
        case "increment and file":
          if (lookup !== undefined) {
            this.map[key].increment++;
          } else {
            this.map[key] = {
              "increment": 1,
              "log": fs.openSync(path.join(dir, key + ".json"), "a"
              // {"flags": "a"}
              )
            };
          }
          var content = JSON.stringify(Math.round(100 * hashEntry.ctimes[0]) / 100) + ","; // 82.3MB
          // const content = JSON.stringify(Math.round(10 * hashEntry.ctimes[0]) / 10) + "," // 72.MB
          // const content = JSON.stringify(hashEntry.ctimes[0]) + "," // 162.9MB
          fs.writeSync(this.map[key].log, content);
          // this.map[key].log.write(content)

          // fs.writeFileSync(
          //   path.join(dir, key + ".json"),
          //   JSON.stringify(
          //     [
          //       Math.round(10*hashEntry.ctimes[0])/10,
          //       hashEntry.fnams[0]
          //     ]
          //   )
          //   + ",",
          //   { "flag": "a" }
          // )
          break;
        default:
          console.log("Should not get to default in insert()!");
      }
    }

    // The expected format is with time in the first dimension and pitch in the
    // second dimension of pts. It is assumed that pts is sorted
    // lexicographically.
    // maxOntimes: the max ontime of each piece of music in a dataset.

  }, {
    key: "match_hash_entries",
    value: function match_hash_entries(pts) {
      var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "duples";
      var tMin = arguments[2];
      var tMax = arguments[3];
      var pMin = arguments[4];
      var pMax = arguments[5];
      var maxOntimes = arguments[6];
      var binSize = arguments[7];

      var _this = this;

      var folder = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : __dirname;
      var topN = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 100;

      var uninh = new Set();
      // const bins = Math.ceil(maxOntimes[maxOntimes.length - 1] / binSize);
      var countBins = new Map();
      // let countBin = new Array(bins).fill(0).map(() => {
      //   return new Set()
      // })
      pts = pts.slice(0, 80);
      var npts = pts.length;
      var nh = 0;

      switch (mode) {
        case "duples":
          for (var i = 0; i < npts - 1; i++) {
            var v0 = pts[i];
            var j = i + 1;
            while (j < npts) {
              var v1 = pts[j];
              var td = v1[0] - v0[0];
              var apd = Math.abs(v1[1] - v0[1]);
              // console.log("i:", i, "j:", j)
              // Decide whether to make a hash entry.
              if (td > tMin && td < tMax && apd >= pMin && apd <= pMax) {
                (function () {
                  // Make a hash entry, something like "±pdtd"
                  var he = _this.create_hash_entry([v1[1] - v0[1], td], mode, v0[0]);
                  // console.log("he:", he)
                  // Is there a match?
                  var lookup = _this.contains(he.hash);
                  if (lookup !== undefined) {
                    // There's a match!
                    lookup.ctimes.forEach(function (ctime) {
                      tInDset.push(ctime);
                      tInQuery.push(he.ctimes[0]);
                    });
                  }
                  nh++;
                })();
              } // End whether to make a hash entry.
              if (td >= tMax) {
                j = npts - 1;
              }
              j++;
            } // End while.
          } // for (let i = 0;
          break;

        case "triples":
          loop1: for (var _i2 = 0; _i2 < npts - 2; _i2++) {
            var _v3 = pts[_i2];
            var _j2 = _i2 + 1;
            while (_j2 < npts - 1) {
              var _v4 = pts[_j2];
              var td1 = _v4[0] - _v3[0];
              var apd1 = Math.abs(_v4[1] - _v3[1]);
              // console.log("i:", i, "j:", j)
              // Decide whether to proceed to v1 and v2.
              if (td1 > tMin && td1 < tMax && apd1 >= pMin && apd1 <= pMax) {
                var k = _j2 + 1;
                while (k < npts) {
                  var v2 = pts[k];
                  var td2 = v2[0] - _v4[0];
                  var apd2 = Math.abs(v2[1] - _v4[1]);
                  // console.log("j:", j, "k:", k)
                  // Decide whether to make a hash entry.
                  if (td2 > tMin && td2 < tMax && apd2 >= pMin && apd2 <= pMax) {
                    var _ret2 = function () {
                      var he = _this.create_hash_entry([_v4[1] - _v3[1], v2[1] - _v4[1], td2 / td1], mode, _v3[0]);
                      if (fs.existsSync(path.join(folder, he.hash + ".json"))) {
                        var lookupStr = fs.readFileSync(path.join(folder, he.hash + ".json"), "utf8").slice(0, -1);
                        var lookup = JSON.parse("[" + lookupStr + "]");
                        lookup.forEach(function (item) {
                          var tmp_fname = item[1];
                          var tmp_ontime = item[0];
                          // create a new countBin when a new music with quired hash appears.
                          if (!countBins.has(tmp_fname)) {
                            var bins = Math.ceil(maxOntimes[tmp_fname] / binSize);
                            countBins.set(tmp_fname, new Array(bins).fill(0).map(function () {
                              return new Set();
                            }));
                          }
                          // Important line, and where other transformation operations
                          // could be supported in future.
                          var dif = tmp_ontime - he.ctimes[0];
                          if (dif >= 0 && dif <= maxOntimes[tmp_fname]) {
                            var index_now = Math.floor(dif / binSize);
                            var setArray = countBins.get(tmp_fname);
                            var target = setArray[index_now];
                            target.add(he.hash);
                          }
                        });
                      }
                      uninh.add(he.hash);
                      nh++;
                      if (nh > 5000) {
                        return "break|loop1";
                      }
                    }();

                    if (_ret2 === "break|loop1") break loop1;
                  } // End whether to make a hash entry.
                  if (td2 >= tMax) {
                    k = npts - 1;
                  }
                  k++;
                } // End k while.
              }
              if (td1 >= tMax) {
                _j2 = npts - 2;
              }
              _j2++;
            } // End j while.
          } // for (let i = 0;
          break;
        default:
          console.log("Should not get to default in match_hash_entries() switch.");
      }

      // Collect the topN matches. Will keep this sorted descending by setSize
      // property.
      var out = new Array(topN);
      var jdx = 0; // Increment to populate out and throw away any unused entries.
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var key = _step.value;

          var countBinsForPiece = countBins.get(key).map(function (value) {
            return value.size;
          });
          countBinsForPiece.forEach(function (count, idx) {
            if (jdx === 0 || // Nothing in it.
            jdx < topN - 1 || // Still isn't full given value of topN.
            count > out[jdx]["setSize"] // Bigger match than current minimum.
            ) {
                out[jdx] = {
                  "winningPiece": key,
                  "edge": idx * binSize,
                  "setSize": count
                };
                out.sort(function (a, b) {
                  return b.setSize - a.setSize;
                });
                if (jdx < topN - 1) {
                  jdx++;
                }
              }
          });
        };

        for (var _iterator = countBins.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (jdx < topN - 1) {
        out = out.slice(0, jdx);
      }

      return {
        "nosHashes": nh,
        "uninosHashes": uninh.size,
        "countBins": out
      };
    }
  }]);

  return HasherNoConcat;
}();

exports.default = HasherNoConcat;