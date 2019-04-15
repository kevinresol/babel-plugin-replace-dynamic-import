import babelTemplate from 'babel-template';
import dynamicImportSyntax from 'babel-plugin-syntax-dynamic-import';
import * as types from 'babel-types';

const IMPORT = 'Import';
const CALL = 'CallExpression';

const generateSourceNode = node => {
  const astNode = node[0];
  let path = types.templateLiteral(
    [
      types.templateElement({ raw: '' }),
      types.templateElement({ raw: '' }, true)
    ],
    node,
  );
  if (types.isStringLiteral(astNode) || types.isTemplateLiteral(astNode)) {
    path = node;
  }
  return path;
};



export default () => ({
  inherits: dynamicImportSyntax,
  visitor: {
    Program: {
      enter(path, state) {
        path.traverse({
          [CALL]: path => {
            if (path.node.callee.type === IMPORT) {
              const sourcePath = generateSourceNode(path.node.arguments);
              path.replaceWith(babelTemplate(`${state.opts.by || '__import__'}(sourcePath)`)({ sourcePath }));
            }
          },
        });
      },
    },
  },
});
