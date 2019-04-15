export default () => ({
  visitor: {
    CallExpression(path, state) {
      if(path.node.callee.type == 'Import') {
        path.node.callee.type = 'Identifier';
        path.node.callee.name = (state.opts.by || '__import__');
      }
    },
  },
});
