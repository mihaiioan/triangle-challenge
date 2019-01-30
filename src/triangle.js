const errors = require('./errors');
const triangleTypes = require('./triangle-types');

// not implemented: check for big numbers (increase the complexity)
// Suitable solutions can be provided using `Number.isFinite()` or by working with strings (and using external libraries, like: https://github.com/MikeMcl/bignumber.js/)
class Triangle {
	constructor(a, b, c) {
		if (a instanceof Array && a.length === 3 && b === undefined && c === undefined) {
			this.edges = [...a];
		} else {
			if (arguments.length === 3 && a && b && c) {
				this.edges = [a, b, c];
			} else {
				throw new Error(errors.wrongArgsNumber);
			}
		}
	}

	edgesLengthsHaveWrongType() {
		return this.edges.filter(edge => typeof edge !== 'number' || isNaN(edge)).length;
	}

	edgesLengthsAreNegative() {
		return this.edges.filter(edge => edge <= 0).length;
	}

	edgesNotFormTriangle() {
		this.edges.sort((a,b) => a-b);
		return this.edges[0] + this.edges[1] <= this.edges[2];
	}

	getTriangleType() {
		if (this.edgesLengthsHaveWrongType()) {
			throw new Error(errors.wrongArgType);
		}
		if (this.edgesLengthsAreNegative()) {
			throw new Error(errors.negativeOrZeroSides);
		}
		if (this.edgesNotFormTriangle()) {
			throw new Error(errors.invalidTriangleSides);
		}

		// const numberOfDifferentEdges = Object.keys(this.edges.reduce((a,b) => {
		// 	a[b] = (a[b] || 0) + 1;
		// 	return a;
		// }, {})).length;
		const numberOfDifferentEdges = new Set(this.edges).size; // faster

		return triangleTypes[numberOfDifferentEdges];
	}
}

module.exports = Triangle;
