# node-rawformdata

Generate raw form data for posting and uploading via http or https.request()

## Installation

`npm install rawformdata`

## Usage overview

	var http = require('http'),
		RawFormData = require('rawformdata');

	var rawFormData = new RawFormData();

	rawFormData.addField('name', 'Chad Smith');
	rawFormData.addField('email', 'chad@nospam.me');
	rawFormData.addFile('resume', 'resume.pdf');

	var req = http.request({
		host: 'examplesite.com',
		path: '/upload',
		method: 'POST',
		headers: rawFormData.getHeaders()
	});

	for(var buffer = rawFormData.getBuffer(), i = 0, len = buffer.length; i < len; i++)
		req.write(buffer[i]);

	req.end();

## Methods

* `rawFormData.addField(fieldname, value)` - Adds a new form field named fieldname with a value of value
* `rawFormData.addFile(fieldname, filename)` - Adds a new file field named fieldname with the content of filename
* `rawFormData.getHeaders()` - Returns an object containing the Content-Type and Content-Length headers
* `rawFormData.getBuffer()` - Returns an array of the buffered raw form data 

## TODO

See the [issue tracker](http://github.com/chadsmith/node-rawformdata/issues).

## Author

[Chad Smith](http://twitter.com/chadsmith) ([chad@nospam.me](mailto:chad@nospam.me)).

## License
This project is [UNLICENSED](http://unlicense.org/).
