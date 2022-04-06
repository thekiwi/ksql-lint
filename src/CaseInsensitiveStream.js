export default class CaseInsensitiveStream {
    constructor(stream) {
        this._stream = stream;
    }

    LA(offset) {
        const c = this._stream.LA(offset);
        if (c <= 0) {
            return c;
        }
        return String.fromCodePoint(c).toUpperCase().codePointAt(0);
    }

    reset() {
        return this._stream.reset();
    }
    
    consume() {
        return this._stream.consume();
    }
    
    LT(offset) {
        return this._stream.LT(offset);
    }
    
    mark() {
        return this._stream.mark();
    }
    
    release(marker) {
        return this._stream.release(marker);
    }
    
    seek(_index) {
        return this._stream.seek(_index);
    }
    
    getText(start, stop) {
        return this._stream.getText(start, stop);
    }
    
    toString() {
        return this._stream.toString();
    }
    
    get index() {
        return this._stream.index;
    }

    get size() {
        return this._stream.size;
    }
}