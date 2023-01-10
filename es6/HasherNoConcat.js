// Imports
const fs = require("fs")
const path = require("path")
const mu = require("maia-util")
// import PointSet from './PointSet'

export default class HasherNoConcat {
  constructor(_mapPath) {
    if (_mapPath !== undefined) {
      this.map = require(_mapPath)
    } else {
      this.map = {}
    }
  }


  contains(aKey) {
    return this.map[aKey]
  }


  // The expected format is with ontime in the first dimension and pitch in the
  // second dimension of pts. It is assumed that pts is sorted
  // lexicographically.
  create_hash_entries(
    pts, fnam, mode = "duples", insertMode = "increment and file with fnams",
    tMin = 0.1, tMax = 10, pMin = 1, pMax = 12, folder = __dirname
  ) {
    const npts = pts.length
    // console.log("npts:", npts)
    let nh = 0

    switch (mode) {
      case "duples":
        for (let i = 0; i < npts - 1; i++) {
          const v0 = pts[i]
          let j = i + 1
          while (j < npts) {
            const v1 = pts[j]
            const td = v1[0] - v0[0]
            const apd = Math.abs(v1[1] - v0[1])
            // console.log("i:", i, "j:", j)
            // Decide whether to make a hash entry.
            if (td > tMin && td < tMax && apd >= pMin && apd <= pMax) {
              // Make a hash entry, something like "±pdtd"
              const he = this.create_hash_entry(
                [v1[1] - v0[1], td], mode,
                v0[0], fnam,
                tMin, tMax
              )
              this.insert(he)
              nh++
            } // End whether to make a hash entry.
            if (td >= tMax) {
              j = npts - 1
            }
            j++
          } // End while.
        } // for (let i = 0;
        break

      case "triples":
        for (let i = 0; i < npts - 2; i++) {
          const v0 = pts[i]
          let j = i + 1
          while (j < npts - 1) {
            const v1 = pts[j]
            const td1 = v1[0] - v0[0]
            const apd1 = Math.abs(v1[1] - v0[1])
            // console.log("i:", i, "j:", j)
            // Decide whether to proceed to v1 and v2.
            if (td1 > tMin && td1 < tMax && apd1 >= pMin && apd1 <= pMax) {
              let k = j + 1
              while (k < npts) {
                const v2 = pts[k]
                const td2 = v2[0] - v1[0]
                const apd2 = Math.abs(v2[1] - v1[1])
                // console.log("j:", j, "k:", k)
                // Decide whether to make a hash entry.
                if (td2 > tMin && td2 < tMax && apd2 >= pMin && apd2 <= pMax) {
                  // Make a hash entry, something like "±pd1±pd2tdr"
                  const he = this.create_hash_entry(
                    [v1[1] - v0[1], v2[1] - v1[1], td2 / td1], mode,
                    v0[0], fnam,
                    tMin, tMax
                  )
                  this.insert(he, insertMode, folder, [i, j, k])
                  nh++
                } // End whether to make a hash entry.
                if (td2 >= tMax) {
                  k = npts - 1
                }
                k++
              } // End k while.
            }
            if (td1 >= tMax) {
              j = npts - 2
            }
            j++
          } // End j while.
        } // for (let i = 0;
        break

      default:
        console.log("Should not get to default in create_hash_entries() switch.")
    }

    return nh
  }


  create_hash_entry(vals, mode, ctime, fnam, tMin, tMax) {
    let str = "", isInteger
    switch (mode) {
      case "duples":
        // Sense-check pitch difference.
        const apd = Math.abs(vals[0])
        if (apd >= 100 || Math.round(vals[0]) !== vals[0]) {
          console.log("Unexpected pitch difference:", vals[0])
          console.log("Returning.")
          return
        }
        if (vals[0] >= 0) {
          str += "+"
        } else {
          str += "-"
        }
        if (apd < 10) {
          str += "0"
        }
        str += apd
        // Sense-check time difference.
        isInteger = Math.round(vals[1]) === vals[1]
        if (vals[1] >= tMax || vals[1] < tMin) {
          console.log("Unexpected time difference:", vals[1])
          console.log("Returning.")
          return
        }
        // Round time difference to 1 d.p. and append to str.
        str += Math.round(10 * vals[1]) / 10
        if (isInteger) {
          str += ".0"
        }
        break

      case "triples":
        // Sense-check pitch difference.
        vals.slice(0, 2).forEach(function (v, idx) {
          const apd = Math.abs(v)
          if (apd >= 100 || Math.round(v) !== v) {
            console.log("Unexpected pitch difference:", v, idx)
            console.log("Returning.")
            return
          }
          if (v >= 0) {
            str += "+"
          } else {
            str += "-"
          }
          if (apd < 10) {
            str += "0"
          }
          str += apd
        })
        // Sense-check time difference ratio.
        if (vals[2] >= tMax / tMin || vals[2] < tMin / tMax) {
          console.log("Unexpected time difference:", vals[2])
          console.log("Returning.")
          return
        }
        // If ratio less than 1, invert and give it a negative sign so that such
        // values are as accurately represented as positive values.
        // console.log("vals[2] before inversion:", vals[2])
        let sign = "+"
        if (vals[2] < 1) {
          vals[2] = 1 / vals[2]
          sign = "-"
        }
        // console.log("vals[2] after inversion:", vals[2])
        str += sign
        // Round time difference ratio to 1 d.p. and append to str.
        const dp1 = Math.round(10 * vals[2]) / 10
        isInteger = Math.round(dp1) === dp1
        // console.log("isInteger:", isInteger)
        str += dp1
        if (isInteger) {
          str += ".0"
        }
        // console.log("str:", str)
        break

      default:
        console.log("Should not get to default in create_hash_entry() switch.")
    }
    return {
      "hash": str,
      "ctimes": [ctime],
      "fnams": [fnam]
    }
  }


  // Obsolete
  get_piece_names(countBins, binSize, topN = 100){
    let out = []

    countBins.forEach(function(value, key){
      const pieceHist = countBins.get(key)
      pieceHist.forEach(function(setSize, idx){
        out.push(
          {
            "pieceId": key,
            "index": idx,
            "setSize": setSize
          }
        )
      })
    })

    // "out" contains the index of bin,
    // and it is sorted based on the corresponding number of hash entries contained in "hist".
    out.sort(function (a, b) {
      return b.setSize - a.setSize
    })
    out = out.slice(0, topN)

    return out.map(function(entry){
      return{
        "winningPiece": entry.pieceId, "edge": entry.index * binSize, "count": entry.setSize
      }
    })
  }



  insert(hashEntry, method = "hash and lookup", dir, tripleIdx) {
    const key = hashEntry.hash
    const lookup = this.contains(key)
    switch (method) {
      case "hash and lookup":
        if (lookup !== undefined) {
          // Extend ctimes and fnams arrays.
          lookup.ctimes.push(hashEntry.ctimes[0])
          lookup.fnams.push(hashEntry.fnams[0])
        } else {
          delete hashEntry.hash
          this.map[key] = hashEntry
        }
        break
      case "increment and file with fnams":
        if (lookup !== undefined) {
          this.map[key].increment++
        } else {
          this.map[key] = {
            "increment": 1,
            "log": fs.openSync(path.join(dir, key + ".json"), "a")
          }
        }
        fs.writeSync(
          this.map[key].log,
          JSON.stringify(
            [
              Math.round(100 * hashEntry.ctimes[0]) / 100,
              hashEntry.fnams[0]
            ]
          ) + ","
        )
        break
        case "increment and file with fnams and tripleIdx": // save triples of points for visualising
          if (lookup !== undefined) {
            this.map[key].increment++
          } else {
            this.map[key] = {
              "increment": 1,
              "log": fs.openSync(path.join(dir, key + ".json"), "a")
            }
          }
          fs.writeSync(
            this.map[key].log,
            JSON.stringify(
              [
                Math.round(100 * hashEntry.ctimes[0]) / 100,
                hashEntry.fnams[0],
                tripleIdx
              ]
            ) + ","
          )
          break
      case "increment and file":
        if (lookup !== undefined) {
          this.map[key].increment++
        } else {
          this.map[key] = {
            "increment": 1,
            "log": fs.openSync(
              path.join(dir, key + ".json"), "a"
              // {"flags": "a"}
            )
          }
        }
        const content = JSON.stringify(Math.round(100 * hashEntry.ctimes[0]) / 100) + "," // 82.3MB
        // const content = JSON.stringify(Math.round(10 * hashEntry.ctimes[0]) / 10) + "," // 72.MB
        // const content = JSON.stringify(hashEntry.ctimes[0]) + "," // 162.9MB
        fs.writeSync(this.map[key].log, content)
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
        break
      default:
        console.log("Should not get to default in insert()!")
    }

  }


  // The expected format is with time in the first dimension and pitch in the
  // second dimension of pts. It is assumed that pts is sorted
  // lexicographically.
  // maxOntimes: the max ontime of each piece of music in a dataset.
  match_hash_entries(
    pts, mode = "duples", tMin, tMax, pMin, pMax, maxOntimes, binSize,
    folder = __dirname, topN = 100
  ) {
    let uninh = new Set()
    // const bins = Math.ceil(maxOntimes[maxOntimes.length - 1] / binSize);
    let countBins = new Map()
    // let countBin = new Array(bins).fill(0).map(() => {
    //   return new Set()
    // })
    pts = pts.slice(0, 80)
    const npts = pts.length
    let nh = 0
    let queLookupHashPointIdx = new Map() // save matched query triples according to each countBin index.

    // Collect the topN matches. Will keep this sorted descending by setSize
    // property.
    let out = []
    let jdx = 0 // Increment to populate out and throw away any unused entries.

    switch (mode) {
      case "duples":
        for (let i = 0; i < npts - 1; i++) {
          const v0 = pts[i]
          let j = i + 1
          while (j < npts) {
            const v1 = pts[j]
            const td = v1[0] - v0[0]
            const apd = Math.abs(v1[1] - v0[1])
            // console.log("i:", i, "j:", j)
            // Decide whether to make a hash entry.
            if (td > tMin && td < tMax && apd >= pMin && apd <= pMax) {
              // Make a hash entry, something like "±pdtd"
              const he = this.create_hash_entry(
                [v1[1] - v0[1], td], mode, v0[0]
              )
              // console.log("he:", he)
              // Is there a match?
              const lookup = this.contains(he.hash)
              if (lookup !== undefined) {
                // There's a match!
                lookup.ctimes.forEach(function (ctime) {
                  tInDset.push(ctime)
                  tInQuery.push(he.ctimes[0])
                })
              }
              nh++
            } // End whether to make a hash entry.
            if (td >= tMax) {
              j = npts - 1
            }
            j++
          } // End while.
        } // for (let i = 0;

        return {
          "nosHashes": nh,
          "uninosHashes": uninh.size,
          "countBins": countBins.map((value => {
            return value.size
          }))
        }
        //break

      case "triples":
        loop1:
          for (let i = 0; i < npts - 2; i++) {
            const v0 = pts[i]
            let j = i + 1
            while (j < npts - 1) {
              const v1 = pts[j]
              const td1 = v1[0] - v0[0]
              const apd1 = Math.abs(v1[1] - v0[1])
              // console.log("i:", i, "j:", j)
              // Decide whether to proceed to v1 and v2.
              if (td1 > tMin && td1 < tMax && apd1 >= pMin && apd1 <= pMax) {
                let k = j + 1
                while (k < npts) {
                  const v2 = pts[k]
                  const td2 = v2[0] - v1[0]
                  const apd2 = Math.abs(v2[1] - v1[1])
                  // console.log("j:", j, "k:", k)
                  // Decide whether to make a hash entry.
                  if (td2 > tMin && td2 < tMax && apd2 >= pMin && apd2 <= pMax) {
                    const he = this.create_hash_entry(
                      [v1[1] - v0[1], v2[1] - v1[1], td2 / td1], mode, v0[0]
                    )
                    if (fs.existsSync(path.join(folder, he.hash + ".json"))) {
                      const lookupStr = fs.readFileSync(
                        path.join(folder, he.hash + ".json"), "utf8"
                      ).slice(0, -1)
                      let lookup = JSON.parse("[" + lookupStr + "]")
                      lookup.forEach(function(item){
                        let tmp_fname = item[1]
                        let tmp_ontime = item[0]
                        // create a new countBin when a new music with quired hash appears.
                        if(!countBins.has(tmp_fname)){
                          const bins = Math.ceil(maxOntimes[tmp_fname] / binSize)
                          countBins.set(tmp_fname, new Array(bins).fill(0).map(() => {return new Set()}))
                        }
                        // Important line, and where other transformation operations
                        // could be supported in future.
                        let dif = tmp_ontime - he.ctimes[0]
                        if (dif >= 0 && dif <= maxOntimes[tmp_fname]){
                          var index_now = Math.floor(dif / binSize);
                          var setArray = countBins.get(tmp_fname);
                          var target = setArray[index_now];
                          target.add(he.hash);
                        }
                      })
                    }
                    uninh.add(he.hash)
                    nh++
                    if (nh > 5000) {
                      break loop1
                    }
                  } // End whether to make a hash entry.
                  if (td2 >= tMax) {
                    k = npts - 1
                  }
                  k++
                } // End k while.
              }
              if (td1 >= tMax) {
                j = npts - 2
              }
              j++
            } // End j while.
          } // for (let i = 0;
        
          // Collect the topN matches. Will keep this sorted descending by setSize
          // property.
          for (let key of countBins.keys()){
            const countBinsForPiece = countBins.get(key).map((value => {
              return value.size
            }))
            countBinsForPiece.forEach(function(count, idx){
              if (
                jdx === 0 || // Nothing in it.
                jdx < topN - 1 || // Still isn't full given value of topN.
                count > out[out.length - 1]["setSize"] // Bigger match than current minimum.
              ){
                out[jdx] = {
                  "winningPiece": key,
                  "edge": idx*binSize,
                  "setSize": count
                }
                out.sort(function(a, b){
                  return b.setSize - a.setSize
                })
                if (jdx < topN - 1){
                  jdx++
                }
              }
            })
          }
        break

      case "tripleIdx":
        loop1:
          for (let i = 0; i < npts - 2; i++) {
            const v0 = pts[i]
            let j = i + 1
            while (j < npts - 1) {
              const v1 = pts[j]
              const td1 = v1[0] - v0[0]
              const apd1 = Math.abs(v1[1] - v0[1])
              // console.log("i:", i, "j:", j)
              // Decide whether to proceed to v1 and v2.
              if (td1 > tMin && td1 < tMax && apd1 >= pMin && apd1 <= pMax) {
                let k = j + 1
                while (k < npts) {
                  const v2 = pts[k]
                  const td2 = v2[0] - v1[0]
                  const apd2 = Math.abs(v2[1] - v1[1])
                  // console.log("j:", j, "k:", k)
                  // Decide whether to make a hash entry.
                  if (td2 > tMin && td2 < tMax && apd2 >= pMin && apd2 <= pMax) {
                    const he = this.create_hash_entry(
                      [v1[1] - v0[1], v2[1] - v1[1], td2 / td1], "triples", v0[0]
                    )
                    if (fs.existsSync(path.join(folder, he.hash + ".json"))) {
                      const lookupStr = fs.readFileSync(
                        path.join(folder, he.hash + ".json"), "utf8"
                      ).slice(0, -1)
                      let lookup = JSON.parse("[" + lookupStr + "]")
                      lookup.forEach(function(item){
                        let tmp_fname = item[1]
                        let tmp_ontime = item[0]
                        // create a new countBin when a new music with quired hash appears.
                        if(!countBins.has(tmp_fname)){
                          const bins = Math.ceil(maxOntimes[tmp_fname] / binSize)
                          countBins.set(tmp_fname, new Array(bins).fill(0).map(() => {return new Set()}))
                          queLookupHashPointIdx.set(tmp_fname, new Array(bins).fill(0).map(() => {return new Set()})) // Initialising
                        }
                        // Important line, and where other transformation operations
                        // could be supported in future.
                        let dif = tmp_ontime - he.ctimes[0]
                        if (dif >= 0 && dif <= maxOntimes[tmp_fname]){
                          let index_now = Math.floor(dif / binSize)
                          let setArray = countBins.get(tmp_fname)
                          let target = setArray[index_now]
                          if(!target.has(he.hash)){
                            target.add(he.hash)
                            let queArray = queLookupHashPointIdx.get(tmp_fname)
                            let tarQueBin = queArray[index_now]
                            tarQueBin.add([[i, j, k], item[2]])
                          }
                        }
                      })
                    }
                    uninh.add(he.hash)
                    nh++
                    if (nh > 5000) {
                      break loop1
                    }
                  } // End whether to make a hash entry.
                  if (td2 >= tMax) {
                    k = npts - 1
                  }
                  k++
                } // End k while.
              }
              if (td1 >= tMax) {
                j = npts - 2
              }
              j++
            } // End j while.
          } // for (let i = 0;

          // Collect the topN matches. Will keep this sorted descending by setSize
          // property.
          for (let key of countBins.keys()){
            const countBinsForPiece = countBins.get(key).map((value => {
              return value.size
            }))
            countBinsForPiece.forEach(function(count, idx){
              if (
                jdx === 0 || // Nothing in it.
                jdx < topN - 1 || // Still isn't full given value of topN.
                count > out[out.length - 1]["setSize"] // Bigger match than current minimum.
              ){
                out[jdx] = {
                  "winningPiece": key,
                  "edge": idx*binSize,
                  "setSize": count,
                  "queLookupTriplets": Array.from(queLookupHashPointIdx.get(key)[idx])
                }
                out.sort(function(a, b){
                  return b.setSize - a.setSize
                })
                if (jdx < topN - 1){
                  jdx++
                }
              }
            })
          }
        break
      
      default:
        console.log("Should not get to default in match_hash_entries() switch.")
    }

    return {
      "nosHashes": nh,
      "uninosHashes": uninh.size,
      "countBins": out
    }


  }
}
