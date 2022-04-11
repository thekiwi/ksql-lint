import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { Command } from 'commander';
import KsqlValidator from './KsqlValidator.js';

const program = new Command();
program
    .name('ksql-lint')
    .usage('./migrations/*.ksql')
    .argument('<glob>', 'ksql files to lint')
    .showHelpAfterError();

program.parse();

const options = { nodir: true };
const files = [];
program.args.forEach(arg => {
    glob.sync(arg, options).forEach(f => files.push(f));
});

const errors = [];
files.forEach(filePath => {
    const contents = fs.readFileSync(filePath).toString(); 
    const messages = KsqlValidator.validate(contents);
    if (messages.length) {
        errors.push({ filePath, messages });
    }
});

if (errors.length) {
    let count = 0;
    errors.forEach(e => {
        e.messages.forEach(msg => {
            console.log(`${path.resolve(e.filePath)}:${msg.line}:${msg.column} \n  error : ${msg.message}`);
            count++;
        });
    });
    console.error(`${count} error${count > 1 ? 's' : ''} across ${errors.length} file${errors.length > 1 ? 's' : ''}`)
    process.exit(1);
} else {
    console.log(`Checked ${files.length} files, found 0 errors`);
    process.exit(0);
}