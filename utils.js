
exports.log = function(message) {
    send({
        type: 'log',
        message: message,
    });
}

exports.camelize = function(str) {
	return str
		.replace(/^[_.\- ]+/, '')
		.toLowerCase()
		.replace(/[_.\- ]+(\w|$)/g, (m, p1) => p1.toUpperCase());
}