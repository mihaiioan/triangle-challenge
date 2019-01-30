const expect = require('chai').expect;
const Triangle = require('../src/triangle');
const errors = require('../src/errors');
const triangleTypes = require('../src/triangle-types');

describe('Triangle', () => {
	let fnct;
	beforeEach(() => {
		fnct = function(...args) {
			return new Triangle(...args);
		};
	});
	describe('invalid arguments', () => {
		it('no arguments', () => {
			expect(fnct).to.throw(errors.wrongArgsNumber);
		});

		it('too little arguments', () => {
			expect(fnct.bind(fnct, 1, 2)).to.throw(errors.wrongArgsNumber);
		});

		it('too many arguments', () => {
			expect(fnct.bind(fnct, 1, 2, 3, 4)).to.throw(errors.wrongArgsNumber);
		});

		it('passed `undefined`', () => {
			expect(fnct.bind(fnct, 1, undefined, 2)).to.throw(errors.wrongArgsNumber);
		});

		it('passed `null`', () => {
			expect(fnct.bind(fnct, 1, 2, null)).to.throw(errors.wrongArgsNumber);
		});

		it('passed `string`', () => {
			const triangle = new Triangle('1', '2', 3);
			expect(triangle.getTriangleType.bind(triangle)).to.throw(errors.wrongArgType);
		});

		it('passed `bool`', () => {
			const triangle = new Triangle(1, true, 3);
			expect(triangle.getTriangleType.bind(triangle)).to.throw(errors.wrongArgType);
		});

		it('passed `object`', () => {
			const triangle = new Triangle(1, {}, 3);
			expect(triangle.getTriangleType.bind(triangle)).to.throw(errors.wrongArgType);
		});

		it('passed `NaN`', () => {
			expect(fnct.bind(fnct, 1, Number.NaN, 3)).to.throw(errors.wrongArgsNumber);
		});

		it('passed `Infinity`', () => {
			const triangle = new Triangle(1, Number.POSITIVE_INFINITY, 3);
			expect(triangle.getTriangleType.bind(triangle)).to.throw(errors.invalidTriangleSides);
		});

		it('passed `0`', () => {
			expect(fnct.bind(fnct, 1, 0, 3)).to.throw(errors.wrongArgsNumber);
		});

		it('passed negative value', () => {
			const triangle = new Triangle(1, -2, 3);
			expect(triangle.getTriangleType.bind(triangle)).to.throw(errors.negativeOrZeroSides);
		});

		it('passes array and other arguments', () => {
			const triangle = new Triangle([1, 2, 3], -2, 3);
			expect(triangle.getTriangleType.bind(triangle)).to.throw(errors.wrongArgType);
		});

		it('passes array and no other arguments', () => {
			expect(fnct.bind(fnct, [1, 2])).to.throw(errors.wrongArgsNumber);
		});
	  
		it('passed sides cannot form a triangle', () => {
			let triangle;
			
			triangle = new Triangle(1, 1, 3);
			expect(triangle.getTriangleType.bind(triangle)).to.throw(errors.invalidTriangleSides);

			triangle= new Triangle(1, 3, 1);
			expect(triangle.getTriangleType.bind(triangle)).to.throw(errors.invalidTriangleSides);

			triangle= new Triangle(3, 1, 1);
			expect(triangle.getTriangleType.bind(triangle)).to.throw(errors.invalidTriangleSides);
		});
	});
	describe('valid arguments', () => {
		it('accept an array', () => {
			expect(fnct.bind(fnct, [1, 2, 3])).not.to.throw();
		});
		it('accept 3 numbers', () => {
			expect(fnct.bind(fnct, 1, 2, 3)).not.to.throw();
		});
	});
	describe('it gets the triangle type', () => {
		const big = 9999;
		const small = 1.0 / big;
		it('of an equilateral triangle', () => {
			const type = new Triangle(big, big, big).getTriangleType();
			expect(type).to.equal(triangleTypes['1']);
		});

		it('of a small equilateral triangle', () => {
			const type = new Triangle(small, small, small).getTriangleType();
			expect(type).to.equal(triangleTypes['1']);
		});

		it('of an isosceles triangle', () => {
			const type = new Triangle(big, big, small).getTriangleType();
			expect(type).to.equal(triangleTypes['2']);
		});

		it('of a big isosceles triangle', () => {
			const type = new Triangle(big, small, big).getTriangleType();
			expect(type).to.equal(triangleTypes['2']);
		});

		it('of a small isosceles triangle', () => {
			const type = new Triangle(small * 1.1, small, small).getTriangleType();
			expect(type).to.equal(triangleTypes['2']);
		});

		it('of a scalene triangle', () => {
			const type = new Triangle(3, 4, 5).getTriangleType();
			expect(type).to.equal(triangleTypes['3']);
		});

		it('of a small scalene triangle', () => {
			const type = new Triangle(small, small * 1.1, small * 1.2).getTriangleType();
			expect(type).to.equal(triangleTypes['3']);
		});

		it('of a big scalene triangle', () => {
			const type = new Triangle(big, big * small, big + small).getTriangleType();
			expect(type).to.equal(triangleTypes['3']);
		});
	});
});