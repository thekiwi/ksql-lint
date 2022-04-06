# ksql-lint
CLI tool to lint KSQLDB commands/queries, for use in CI/CD, using [the official KSQLDB grammar](https://github.com/confluentinc/ksql/blob/master/ksqldb-parser/src/main/antlr4/io/confluent/ksql/parser/SqlBase.g4) and using that parser to validate KSQLDB statements. 

## To Use

1. Generate the parser by running `./generate.sh`
2. Run `node index.js` to use the parser to validate some test cases


## Exit codes
When linting files, ksql-lint will exit with one of the following exit codes:

0: Linting was successful and there are no linting errors. If the --max-warnings flag is set to n, the number of linting warnings is at most n.
1: Linting was successful and there is at least one linting error, or there are more linting warnings than allowed by the --max-warnings option.
2: Linting was unsuccessful due to a configuration problem or an internal error.
