//letter.js should control whether or not a letter appears as a "_" or as itself on-screen.
function Letter(letterGuessed) {
	this.letterGuessed = letterGuessed;
	this.appear = false;

	this.letterRender = function() {
		return this.letterGuessed;
	};
}

module.exports = Letter;