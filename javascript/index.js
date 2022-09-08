import Schema from "./src/Schema/Schema.js";
import Flag from "./src/Schema/Flag/Flag.js";
import BooleanType from "./src/Schema/Flag/Types/BooleanType.js";
import StringType from "./src/Schema/Flag/Types/StringType.js";
import IntegerType from "./src/Schema/Flag/Types/IntegerType.js";
import ArgumentsParser from "./src/ArgumentsParser.js";

const userInput = '-l -p 8080 -d /usr/logs';

const schema = new Schema();
schema.addFlags([
    new Flag("l", new BooleanType()),
    new Flag("p", new IntegerType()),
    new Flag("d", new StringType()),
]);

const argumentsParser = new ArgumentsParser(schema);
argumentsParser.parse(userInput);

console.log(argumentsParser.getValues());