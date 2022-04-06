import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { Command } from 'commander';
import KsqlValidator from './KsqlValidator.js';

const program = new Command();
program
    .name('ksql-lint')
    .argument('<glob...>', 'ksql files to lint');

program.parse();

const errors = [];
const options = {};
program.args.forEach(arg => {
    const files = glob.sync(arg, options);
    files.forEach(filePath => {
        const contents = fs.readFileSync(filePath).toString(); 
        const messages = KsqlValidator.validate(contents);
        if (messages.length) {
            errors.push({ filePath, messages });
        }
    });
});

if (errors.length) {
    // errors.forEach(e => console.error(e));

    let count = 0;
    errors.forEach(e => {
        // console.log(path.resolve(e.filePath));
        e.messages.forEach(msg => {
            // console.log(`  ${msg.line}:${msg.column}\terror\t${msg.message}\t${msg.symbol}`);
            console.log(`${path.resolve(e.filePath)}(${msg.line},${msg.column}): error : ${msg.message}`);
            count++;
        });
    });
    console.error(`✖ ${count} errors across ${errors.length} files`)
    process.exit(1);
} else {
    console.log('0 errors found');
    process.exit(0);
}