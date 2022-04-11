import chai from 'chai';
import sinon from 'sinon';
import antlr4 from 'antlr4';
import CaseInsensitiveStream from '../src/CaseInsensitiveStream.js';

chai.should();

describe('CaseInsensitiveStream', () => {
    const mockStream = sinon.stub(new antlr4.InputStream('AbCd'));

    describe('#LA()', () => {
        it('converts characters to upper-case', () => {
            const stream = new antlr4.InputStream('AbCd');
            const cis = new CaseInsensitiveStream(stream);
            cis.LA(1).should.equal(65);
            cis.LA(2).should.equal(66);
            cis.LA(3).should.equal(67);
            cis.LA(4).should.equal(68);
        });
    });

    describe('#reset()', () => {
        it('calls the internal stream', () => {
            const cis = new CaseInsensitiveStream(mockStream);
            cis.reset();
            mockStream.reset.calledOnce.should.equal(true);
        });
    });

    describe('#consume()', () => {
        it('calls the internal stream', () => {
            const cis = new CaseInsensitiveStream(mockStream);
            cis.consume();
            mockStream.consume.calledOnce.should.equal(true);
        });
    });

    describe('#LT()', () => {
        it('calls the internal stream with the correct argument', () => {
            const cis = new CaseInsensitiveStream(mockStream);
            cis.LT(123);
            mockStream.LT.calledOnce.should.equal(true);
            mockStream.LT.calledWith(123).should.equal(true);
        });
    });

    describe('#mark()', () => {
        it('calls the internal stream', () => {
            const cis = new CaseInsensitiveStream(mockStream);
            cis.mark();
            mockStream.mark.calledOnce.should.equal(true);
        });
    });

    describe('#release()', () => {
        it('calls the internal stream with the correct argument', () => {
            const cis = new CaseInsensitiveStream(mockStream);
            cis.release(123);
            mockStream.release.calledOnce.should.equal(true);
            mockStream.release.calledWith(123).should.equal(true);
        });
    });

    describe('#seek()', () => {
        it('calls the internal stream with the correct argument', () => {
            const cis = new CaseInsensitiveStream(mockStream);
            cis.seek(123);
            mockStream.seek.calledOnce.should.equal(true);
            mockStream.seek.calledWith(123).should.equal(true);
        });
    });

    describe('#getText()', () => {
        it('calls the internal stream with the correct argument', () => {
            const cis = new CaseInsensitiveStream(mockStream);
            cis.getText(1, 2);
            mockStream.getText.calledOnce.should.equal(true);
            mockStream.getText.calledWith(1, 2).should.equal(true);
        });
    });

    describe('#toString()', () => {
        it('calls the internal stream', () => {
            const cis = new CaseInsensitiveStream(mockStream);
            cis.toString();
            mockStream.toString.calledOnce.should.equal(true);
        });
    });

});