// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

// Convenção do projeto (CLAUDE.md): estilo nunca fica dentro do componente.
// Todo StyleSheet vive em um arquivo irmão `Nome.styles.ts`.
const noStyleInComponents = [
  {
    selector:
      "CallExpression[callee.object.name='StyleSheet'][callee.property.name='create']",
    message:
      'StyleSheet.create não pode ficar em arquivo .tsx. Mova para o arquivo Nome.styles.ts irmão.',
  },
  {
    selector:
      "ImportDeclaration[source.value='react-native'] > ImportSpecifier[imported.name='StyleSheet']",
    message:
      'Arquivo .tsx não importa StyleSheet. Importe `styles` de ./Nome.styles.',
  },
  {
    selector: "JSXAttribute[name.name='style'] > JSXExpressionContainer > ObjectExpression",
    message:
      'Sem estilo inline (style={{ ... }}). Crie a regra em Nome.styles.ts e use style={styles.x}.',
  },
  {
    selector:
      "JSXAttribute[name.name='style'] > JSXExpressionContainer > ArrayExpression > ObjectExpression",
    message:
      'Sem objeto de estilo inline dentro de style={[...]}. Crie a variante em Nome.styles.ts.',
  },
];

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'no-restricted-syntax': ['error', ...noStyleInComponents],
    },
  },
]);
