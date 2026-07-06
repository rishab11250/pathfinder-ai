export function createOutputRules(rules) {
  return rules;
}
export function createJsonOutputRules(schema) {
  return `Provide the output in the following JSON format ONLY:

${schema}`;
}