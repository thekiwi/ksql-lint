# ksql-lint

CLI tool to lint KSQLDB commands/queries, for use in CI/CD, using [the official KSQLDB grammar](https://github.com/confluentinc/ksql/blob/master/ksqldb-parser/src/main/antlr4/io/confluent/ksql/parser/SqlBase.g4) and using that parser to validate KSQLDB statements. 

## To Use

1. Run as a CLI by typing `npx ksql-lint ./migrations/*.ksql`

## Exit codes

When linting files, ksql-lint will exit with one of the following exit codes:

0: Linting was successful and there are no errors.

1: Linting was successful and there is at least one linting error.
