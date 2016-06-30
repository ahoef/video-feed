var expect = chai.expect;
var should = chai.should();

describe('Video Feed Tests', function() {
    describe('convertDate(str)', function() {
        it('Should return a string', function() {
	       expect(convertDate()).to.be.a('string');
	    });

        it('Should return a readable date equal to the JS date object', function() {
           expect(convertDate("2014-02-17 03:24:45")).to.equal('Mon Feb 17 2014');
        });
    });

    describe('removeProtocol(url)', function() {
        it('Should return a string', function() {
           expect(removeProtocol('https://vimeo.com/86877247')).to.be.a('string');
        });

        it('Should return a url string with no https protocol', function() {
           expect(removeProtocol('https://vimeo.com/86877247').indexOf('https')).to.equal(-1);
        });

        it('Should return a url string with no http protocol', function() {
           expect(removeProtocol('https://vimeo.com/86877247').indexOf('http')).to.equal(-1);
        });
    });
});



