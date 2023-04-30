#!/bin/bash

# fetch the latest grammar
mkdir grammars
curl --http1.1 https://raw.githubusercontent.com/confluentinc/ksql/master/ksqldb-parser/src/main/antlr4/io/confluent/ksql/parser/SqlBase.g4 --output grammars/SqlBase.g4

# then, comment out a few hard-coded 'Java' lines from the grammar... 
sed -i'' -e 's/public static final/\/\/public static final/g' grammars/SqlBase.g4

# build the parser
rm -rf .antlr
rm -rf lib
docker run --rm -u $(id -u ${USER}):$(id -g ${USER}) -v `pwd`:/work any0ne22/antlr4:4.12.0 java -Xmx500M -cp /usr/local/lib/antlr4-tool.jar org.antlr.v4.Tool -o lib/ -Xexact-output-dir -Dlanguage=JavaScript grammars/SqlBase.g4