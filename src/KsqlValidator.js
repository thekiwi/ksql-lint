import antlr4 from 'antlr4';
import SqlBaseLexer from '../lib/SqlBaseLexer.js';
import SqlBaseParser from '../lib/SqlBaseParser.js';
import CaseInsensitiveStream from './CaseInsensitiveStream.js';

class SyntaxErrorListener extends antlr4.error.ErrorListener {
    constructor() {
        super();
        this.errors = [];
    }
    syntaxError(recognizer, offendingSymbol, line, column, message, err) {
        this.errors.push({
            symbol: offendingSymbol.toString(),
            line,
            column,
            message
        });
    }
}

export default class KsqlValidator {
    static validate(input) {
        const chars = new antlr4.InputStream(input);
        const lexer = new SqlBaseLexer(new CaseInsensitiveStream(chars));
        const tokens = new antlr4.CommonTokenStream(lexer);
        const parser = new SqlBaseParser(tokens);
        parser.buildParseTrees = true;
        parser.removeErrorListeners();
        const listener = new SyntaxErrorListener();
        parser.addErrorListener(listener);
        // lexer.removeErrorListeners();
        // lexer.addErrorListener(new ExprErrorListener());
        const tree = parser.statements();
        return listener.errors;
    }
}