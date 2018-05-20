'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('convertToCamelCase function test', () => {
    it('should return null', () => {
        var result = index.convertToCamelCase(null);
        expect(result).to.be.null;
    });
    it('should return empty object', () => {
        var result = index.convertToCamelCase({});
        expect(result).to.be.empty;
    });
    it('should return empty array', () => {
        var result = index.convertToCamelCase([]);
        expect(result).to.be.empty;
    });
    it('should return string', () => {
        var result = index.convertToCamelCase('string');
        expect(result).to.equal('string');
    });
    it('should return number', () => {
        var result = index.convertToCamelCase(0);
        expect(result).to.equal(0);
    });
    it('should return lowercase property name', () => {
        var result = index.convertToCamelCase({ Test: 'test' });
        expect(result).to.have.key('test');
    });
    it('should return new object', () => {
        var initial = {};
        var result = index.convertToCamelCase(initial);
        expect(result).to.satisfy(a => a !== initial);
    });
    it('should return new array', () => {
        var initial = [];
        var result = index.convertToCamelCase(initial);
        expect(result).to.satisfy(a => a !== initial);
    });
});

describe('convertToPascalCase function test', () => {
    it('should return null', () => {
        var result = index.convertToPascalCase(null);
        expect(result).to.be.null;
    });
    it('should return empty object', () => {
        var result = index.convertToPascalCase({});
        expect(result).to.be.empty;
    });
    it('should return empty array', () => {
        var result = index.convertToPascalCase([]);
        expect(result).to.be.empty;
    });
    it('should return string', () => {
        var result = index.convertToPascalCase('string');
        expect(result).to.equal('string');
    });
    it('should return number', () => {
        var result = index.convertToPascalCase(0);
        expect(result).to.equal(0);
    });
    it('should return uppercase property name', () => {
        var result = index.convertToPascalCase({ test: 'test' });
        expect(result).to.have.key('Test');
    });
    it('should return new object', () => {
        var initial = {};
        var result = index.convertToPascalCase(initial);
        expect(result).to.satisfy(a => a !== initial);
    });
    it('should return new array', () => {
        var initial = [];
        var result = index.convertToPascalCase(initial);
        expect(result).to.satisfy(a => a !== initial);
    });
});

describe('convertToSnakeCase function test', () => {
    it('should return null', () => {
        var result = index.convertToSnakeCase(null);
        expect(result).to.be.null;
    });
    it('should return empty object', () => {
        var result = index.convertToSnakeCase({});
        expect(result).to.be.empty;
    });
    it('should return empty array', () => {
        var result = index.convertToSnakeCase([]);
        expect(result).to.be.empty;
    });
    it('should return string', () => {
        var result = index.convertToSnakeCase('string');
        expect(result).to.equal('string');
    });
    it('should return number', () => {
        var result = index.convertToSnakeCase(0);
        expect(result).to.equal(0);
    });
    it('should return lowercase property name with underscore', () => {
        var result = index.convertToSnakeCase({ testProperty: 'test' });
        expect(result).to.have.key('test_property');
    });
    it('should return lowercase property name with single underscore', () => {
        var result = index.convertToSnakeCase({ testABC: 'test' });
        expect(result).to.have.key('test_abc');
    });
    it('should return lowercase property name with single underscore', () => {
        var result = index.convertToSnakeCase({ ABCTest: 'test' });
        expect(result).to.have.key('abc_test');
    });
    it('should return lowercase property name with underscores', () => {
        var result = index.convertToSnakeCase({ testABCTest: 'test' });
        expect(result).to.have.key('test_abc_test');
    });
    it('should return new object', () => {
        var initial = {};
        var result = index.convertToSnakeCase(initial);
        expect(result).to.satisfy(a => a !== initial);
    });
    it('should return new array', () => {
        var initial = [];
        var result = index.convertToSnakeCase(initial);
        expect(result).to.satisfy(a => a !== initial);
    });
});