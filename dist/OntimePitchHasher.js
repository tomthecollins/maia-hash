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

var OntimePitchHasher = function () {
  function OntimePitchHasher(_mapPath) {
    _classCallCheck(this, OntimePitchHasher);

    if (_mapPath !== undefined) {
      this.map = require(_mapPath);
    } else {
      this.map = {};
    }
  }

  _createClass(OntimePitchHasher, [{
    key: "contains",
    value: function contains(aKey) {
      return this.map[aKey];
    }

    // The expected format is with ontime in the first dimension and pitch in the
    // second dimension of pts. It is assumed that pts is sorted
    // lexicographically.

  }, {
    key: "create_hash_entries",
    value: function create_hash_entries(pts, cumuTime, fnam) {
      var mode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "duples";
      var insertMode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "increment and file with fnams";
      var tMin = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.1;
      var tMax = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 10;
      var pMin = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
      var pMax = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 12;
      var folder = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : __dirname;

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
                var he = this.create_hash_entry([v1[1] - v0[1], td], mode, cumuTime + v0[0], fnam, tMin, tMax);
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
                    var _he = this.create_hash_entry([_v2[1] - _v[1], v2[1] - _v2[1], td2 / td1], mode, cumuTime + _v[0], fnam, tMin, tMax);
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

    // This method is inefficient and could be improved. I don't think it's worth
    // obtaining the name of each piece when most of the entries of countBins
    // are zero. Therefore, I've sliced it to topN.

  }, {
    key: "get_piece_names",
    value: function get_piece_names(countBins, ctimes, fnams, binSize) {
      var topN = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 100;

      var out = [];
      // "out" contains the index of bin,
      // and it is sorted based on the corresponding number of hash entries contained in "hist".
      for (var i = 0; i < countBins.length; i++) {
        out.push(i);
      }
      out.sort(function (a, b) {
        return countBins[b] - countBins[a];
      });
      out = out.slice(topN);

      return out.map(function (idx) {
        for (var _i2 = 0; _i2 < ctimes.length; _i2++) {
          if (idx * binSize <= ctimes[_i2]) {
            return {
              "winningPiece": fnams[_i2 - 1], "edge": idx * binSize, "count": countBins[idx]
            };
          }
        }
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

  }, {
    key: "match_hash_entries",
    value: function match_hash_entries(pts) {
      var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "duples";
      var tMin = arguments[2];
      var tMax = arguments[3];
      var pMin = arguments[4];
      var pMax = arguments[5];
      var ctimes = arguments[6];

      var _this = this;

      var binSize = arguments[7];
      var folder = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : __dirname;

      var uninh = new Set();
      var bins = Math.ceil(ctimes[ctimes.length - 1] / binSize);
      var countBins = new Array(bins).fill(0).map(function () {
        return new Set();
      });
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
          loop1: for (var _i3 = 0; _i3 < npts - 2; _i3++) {
            var _v3 = pts[_i3];
            var _j2 = _i3 + 1;
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
                        lookup.forEach(function (value) {
                          var dif = value - he.ctimes[0];
                          if (dif >= 0 && dif <= ctimes[ctimes.length - 1]) {
                            countBins[Math.floor(dif / binSize)].add(he.hash);
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

      return {
        "nosHashes": nh,
        "uninosHashes": uninh.size,
        "countBins": countBins.map(function (value) {
          return value.size;
        })
      };
    }
  }]);

  return OntimePitchHasher;
}();

exports.default = OntimePitchHasher;