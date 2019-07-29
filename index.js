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
      const transform = path.value.specifiers
        .reduce((acc, curr) => {
          return acc.concat(
            `import ${curr.local.name} from 'containers/${curr.imported.name}'`
          );
        }, [])
        .join("\n");

      return transform;
    })
    .toSource();
};
