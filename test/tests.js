import chai from 'chai';
import KsqlValidator from '../src/KsqlValidator.js';

chai.should();

describe('KsqlValidator', () => {
    describe('#validate()', () => {
        it('validates lowercase commands', () => {
            const errors = KsqlValidator.validate('list topics;');
            errors.should.be.empty;
        });

        it('validates uppercase commands', () => {
            const errors = KsqlValidator.validate('LIST TOPICS;');
            errors.should.be.empty;
        });

        it('reports a missing semicolon', () => {
            const errors = KsqlValidator.validate('list topics');
            errors.should.have.lengthOf(1);
            errors[0].should.have.property('msg').match(/missing ';' at '<EOF>'/);
        });

        it('reports an unknown keyword', () => {
            const errors = KsqlValidator.validate('foo topics');
            errors.should.have.lengthOf(1);
            errors[0].should.have.property('msg').match(/^mismatched input 'foo' expecting/);
        });

        it('supports comments', () => {
            const errors = KsqlValidator.validate('list topics; -- list some topics');
            errors.should.be.empty;
        });

        it('supports multi-line queries', () => {
            const errors = KsqlValidator.validate('list topics;\nlist streams;');
            errors.should.be.empty;
        });
    });
});