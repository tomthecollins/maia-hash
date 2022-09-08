==============

Hashing and fingerprinting functions supporting various applications by Music Artificial Intelligence Algorithms, Inc.

## Local Installation

Set yourself up with an installation of [Node.js](https://nodejs.org/). Then open up a terminal window and navigate to a directory where you want to experiment with MAIA Hash.

### User

**Server-side use/command-line use.** See [here](https://github.com/tomthecollins/maia-hash/blob/master/test/interval_histogram.js) for example usage. Apologies you have to scroll past the big Composition object to get to the interesting stuff at lines 462-476.

At the moment this package is not published on [npm](http://npmjs.com/). If the package is published on npm, a user would add it to the package.json file of their own repo, under dependencies, something like this
```javascript
"dependencies": {
  ...
  "maia-hash": "^a.b.c",
  ...
}
```
where "a.b.c" is the semantic version, and run
```bash
npm install
```
from command line to obtain it. Then they would be able to write
```javascript
const mh = require("maia-hash")
let h = new mh.OntimePitchHasher()
```
where...
```javascript
console.log("sthg")
```

**Client-side use.** Copy the file [maia-hash.js](https://github.com/tomthecollins/maia-hash/blob/main/maia-hash.js) to some directory where you need it, and add something like
```html
<script src="./maia-hash.js"></script>
```

### Developer

With [Node.js](https://nodejs.org/) set up, clone the MAIA Hash repository from [here](https://bitbucket.org/tomthecollins/maia-hash/) and run `npm install` to acquire the dependencies. Some packages, such as Rollup, might need a general install.

Please follow these steps when making additions or changes:

1. Additions or changes to the code should be made in the es6 folder;
2. When documenting, follow the JSDoc format used therein;
3. Write unit tests below each method/function;
4. Execute `npm run compile` to convert the various components in the es6 into the corresponding components in the dist folder, and to combine them into an IIFE (called maia-hash.js, in the root of the repository);
5. Execute `jsdoc --configure .jsdoc.config.js dist` to update the documentation, which gets written to the docs folder, and check it looks good and reads well;
6. Say in step 1 you added a new file to the es6 folder called hello_world.js, then now it's time to check on your unit tests by executing `node hello_world.js` and seeing whether the `console.log()`s match your expected output;
7. Once you are satisfied with your unit tests, comment them out and paste them to test/index.js, following the chai format used therein. Execute `npm test` to verify that there are ticks everywhere and in particular that your new tests are being invoked;
8. Do the usual `git add .`, `git commit -m "Short meaningful message"`, and `git push`, and we'll see it on the other side as a pull request;
9. There should not be any need for you to edit the version in package.json;
10. Please keep any data files out of the repository by editing the .gitignore file.

## Hello-world examples

TBD

## Tests

TBD

## Contributing

TBD

## Release History

* 0.0.4 Removed an outdated histogram operation.
* 0.0.0-3 Initial release and bug fixes
