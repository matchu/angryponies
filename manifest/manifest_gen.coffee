fs = require 'fs'

HOST = 'http://angryponies.herokuapp.com'

fullPath = (path) -> __dirname + '/' + path
fullUrl  = (path) -> HOST      + '/' + path

assetUrlsIn = (dir, format) ->
  filenames = fs.readdirSync fullPath('../' + dir)
  urls = (fullUrl(dir + '/' + name) for name in filenames when name.match(format))
  return urls

manifest = fs.readFileSync fullPath('/manifest.tmpl'), 'utf8'

timestamp = (new Date).getTime()
manifest = manifest.replace "{MANIFEST_ID}", timestamp

urls = [fullUrl('ponify.js')]
urls = urls.concat assetUrlsIn 'images', /\.png$/
urls = urls.concat assetUrlsIn('flash', /\.swf$/)
urls = urls.concat assetUrlsIn('sounds', /\.mp3$/)
manifest = manifest.replace "{ASSET_URLS}", urls.join("\n")

fs.writeFile fullPath('fowl.manifest'), manifest
console.log "Successfully wrote to fowl.manifest"