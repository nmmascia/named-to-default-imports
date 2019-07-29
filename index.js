module.exports = function(file, api) {
  const { jscodeshift: j } = api;
  return j(file.source)
    .find(j.ImportDeclaration, {
      source: {
        type: "Literal",
        value: "containers"
      }
    })
    .replaceWith(path => {
      const transform = path.value.specifiers.reduce((acc, curr) => {
        acc += `import ${curr.local.name} from 'containers/${
          curr.imported.name
        }'\n`;
        return acc;
      }, "");
      return transform;
    })
    .toSource();
};
