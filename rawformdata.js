var
  fs = require('fs'),
  path = require('path'),
  buffer = require('buffer'),
  mime = require('mime'),
  crypto = require('crypto'),
  CRLF = "\r\n";

var RawFormData = function() {
  this.boundary = '--' + crypto.createHash('md5').update('' + +new Date).digest('hex');
  this.data = [];
};

RawFormData.prototype = {
  addField: function(key, value) {
    this.data.push(new Buffer([
			this.boundary,
			'Content-Disposition: form-data; name="' + key + '";' + CRLF,
			value + CRLF
		].join(CRLF), 'ascii'));
  },
  addFile: function(name, filename, file) {
    file = path.join(__dirname, filename);
		this.data.push(new Buffer([
			this.boundary,
			'Content-Disposition: form-data; name="' + name + '"; filename="' + filename + '";',
			'Content-Type: ' + (mime.lookup(file) || 'application/octet-stream') + ';' + CRLF + CRLF
		].join(CRLF), 'ascii'));
		this.data.push(fs.readFileSync(file));
  },
  getBuffer: function() {
    for(var data = [], i = 0, l = this.data.length; i < l; i++)
      data.push(this.data[i]);
    data.push(new Buffer(this.boundary + '--', 'ascii'));
    return data;
  },
  getHeaders: function() {
		for(var data = this.getBuffer(), length = i = 0, l = data.length; i < l; i++)
			length += data[i].length;
		return {
		  'Content-Type': 'multipart/form-data; boundary="' + this.boundary.substr(2) + '"',
		  'Content-Length': length
		};
  }
};

module.exports = RawFormData;
