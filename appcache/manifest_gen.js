// Generated by CoffeeScript 1.3.1
(function() {
  var assetUrlsIn, fs, fullPath, fullUrl, manifest, timestamp, urls, warning;

  fs = require('fs');

  fullPath = function(path) {
    return __dirname + '/' + path;
  };

  fullUrl = function(path) {
    return '/' + path;
  };

  assetUrlsIn = function(dir, format) {
    var filenames, name, urls;
    filenames = fs.readdirSync(fullPath('../' + dir));
    urls = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = filenames.length; _i < _len; _i++) {
        name = filenames[_i];
        if (name.match(format)) {
          _results.push(fullUrl(dir + '/' + name));
        }
      }
      return _results;
    })();
    return urls;
  };

  manifest = fs.readFileSync(fullPath('/manifest.tmpl'), 'utf8');

  warning = "# DO NOT EDIT THIS FILE DIRECTLY!\n";

  warning += "# Instead, edit manifest.tmpl and run manifest_gen.js to generate.\n";

  manifest = manifest.replace("{WARNING}", warning);

  timestamp = (new Date).getTime();

  manifest = manifest.replace("{MANIFEST_ID}", timestamp);

  urls = [fullUrl('ponify.js')];

  urls = urls.concat(assetUrlsIn('images', /\.png$/));

  urls = urls.concat(assetUrlsIn('flash', /\.swf$/));

  urls = urls.concat(assetUrlsIn('sounds', /\.mp3$/));

  manifest = manifest.replace("{ASSET_URLS}", urls.join("\n"));

  fs.writeFile(fullPath('angryponies.appcache'), manifest);

  console.log("Successfully wrote to angryponies.appcache");

}).call(this);
