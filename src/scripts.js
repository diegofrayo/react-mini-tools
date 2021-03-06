const StringUtilities = {

  toUpperCase: (input) => {
    return input.trim().replace(/\s/g, '_').toUpperCase();
  },

  toLowerCamelCase: (input) => {
    return input.split(' ').reduce((prevVal, currVal, index) => {
      if (index !== 0) {
        currVal = currVal.charAt(0).toUpperCase() + currVal.substring(1);
      }
      return prevVal + currVal;
    }, '');
  },

  toUpperCamelCase: (input) => {
    return input.split(' ').reduce((prevVal, currVal, index) => {
      currVal = currVal.charAt(0).toUpperCase() + currVal.substring(1);
      return prevVal + currVal;
    }, '');
  }

};

const CodeGenerator = {

  generateConstantsCode: (input) => {
    return `
<pre class="prettyprint" id="pre-code-constants">
  export const ${StringUtilities.toUpperCase(input)} = '${StringUtilities.toUpperCase(input)}';
  export const ${StringUtilities.toUpperCase(input)}_FAILURE = '${StringUtilities.toUpperCase(input)}_FAILURE';
  export const ${StringUtilities.toUpperCase(input)}_REQUEST = '${StringUtilities.toUpperCase(input)}_REQUEST';
  export const ${StringUtilities.toUpperCase(input)}_SUCCESS = '${StringUtilities.toUpperCase(input)}_SUCCESS';
</pre>`;
  },

  generateActionsCode: (input) => {
    return `
<pre class="prettyprint" id="pre-code-actions">
  // redux
  import {
    ${StringUtilities.toUpperCase(input)},
    ${StringUtilities.toUpperCase(input)}_FAILURE,
    ${StringUtilities.toUpperCase(input)}_REQUEST,
    ${StringUtilities.toUpperCase(input)}_SUCCESS,
  } from 'constants';

  export function ${StringUtilities.toLowerCamelCase(input)}() {
    return {
      type: ${StringUtilities.toUpperCase(input)},
    };
  }

  export function ${StringUtilities.toLowerCamelCase(input)}Request() {
    return {
      type: ${StringUtilities.toUpperCase(input)}_REQUEST,
    };
  }

  export function ${StringUtilities.toLowerCamelCase(input)}Success() {
    return {
      type: ${StringUtilities.toUpperCase(input)}_SUCCESS,
    };
  }

  export function ${StringUtilities.toLowerCamelCase(input)}Failure() {
    return {
      type: ${StringUtilities.toUpperCase(input)}_FAILURE,
    };
  }

  // redux
  import {
    ${StringUtilities.toLowerCamelCase(input)} as ${StringUtilities.toLowerCamelCase(input)}Action,
    ${StringUtilities.toLowerCamelCase(input)}Failure as ${StringUtilities.toLowerCamelCase(input)}FailureAction,
    ${StringUtilities.toLowerCamelCase(input)}Request as ${StringUtilities.toLowerCamelCase(input)}RequestAction,
    ${StringUtilities.toLowerCamelCase(input)}Success as ${StringUtilities.toLowerCamelCase(input)}SuccessAction,
  } from 'actions';

  const mapDispatchToProps = dispatch => ({
    actions: {
      ${StringUtilities.toLowerCamelCase(input)}: () => dispatch(${StringUtilities.toLowerCamelCase(input)}Action()),
      ${StringUtilities.toLowerCamelCase(input)}Failure: () => dispatch(${StringUtilities.toLowerCamelCase(input)}FailureAction()),
      ${StringUtilities.toLowerCamelCase(input)}Request: () => dispatch(${StringUtilities.toLowerCamelCase(input)}RequestAction()),
      ${StringUtilities.toLowerCamelCase(input)}Success: () => dispatch(${StringUtilities.toLowerCamelCase(input)}SuccessAction()),
    },
  });
</pre>`;
  },

  generateReducersCode: (input) => {
    return `
<pre class="prettyprint" id="pre-code-reducers">
  // redux
  import {
    ${StringUtilities.toUpperCase(input)},
    ${StringUtilities.toUpperCase(input)}_FAILURE,
    ${StringUtilities.toUpperCase(input)}_REQUEST,
    ${StringUtilities.toUpperCase(input)}_SUCCESS,
  } from 'constants';

  case ${StringUtilities.toUpperCase(input)}:
    return state;

  case ${StringUtilities.toUpperCase(input)}_FAILURE:
    return state;

  case ${StringUtilities.toUpperCase(input)}_REQUEST:
    return state;

  case ${StringUtilities.toUpperCase(input)}_SUCCESS:
    return state;
</pre>`;
  },

  generateSagasCode: (input) => {
    return `
<pre class="prettyprint" id="pre-code-sagas">
  // redux
  import {
    ${StringUtilities.toLowerCamelCase(input)}Failure as ${StringUtilities.toLowerCamelCase(input)}FailureAction,
    ${StringUtilities.toLowerCamelCase(input)}Success as ${StringUtilities.toLowerCamelCase(input)}SuccessAction,
  } from 'actions';
  import {
    ${StringUtilities.toUpperCase(input)}_REQUEST,
  } from 'constants';

  export function* ${StringUtilities.toLowerCamelCase(input)}Saga() {
    try{
      yield put(${StringUtilities.toLowerCamelCase(input)}SuccessAction());
    } catch (err) {
      yield put(${StringUtilities.toLowerCamelCase(input)}FailureAction());
    }
  }

  function* watch${StringUtilities.toUpperCamelCase(input)}() {
    yield * takeEvery(${StringUtilities.toUpperCase(input)}_REQUEST, ${StringUtilities.toLowerCamelCase(input)}Saga);
  }

  yield fork(watch${StringUtilities.toUpperCamelCase(input)});
</pre>`;
  },

  generateAllCode: function (inputValue) {
    if (inputValue) {
      inputValue = inputValue.trim().toLowerCase();
      this.codeBlocks = {
        actions: CodeGenerator.generateActionsCode(inputValue),
        constants: CodeGenerator.generateConstantsCode(inputValue),
        reducers: CodeGenerator.generateReducersCode(inputValue),
        sagas: CodeGenerator.generateSagasCode(inputValue)
      };
      setTimeout(() => {
        document.getElementById('code-block-actions').innerHTML = marked(this.codeBlocks.actions);
        document.getElementById('code-block-constants').innerHTML = marked(this.codeBlocks.constants);
        document.getElementById('code-block-reducers').innerHTML = marked(this.codeBlocks.reducers);
        document.getElementById('code-block-sagas').innerHTML = marked(this.codeBlocks.sagas);
        PR.prettyPrint();
      }, 500);
    }
  }

};

var app = new Vue({
  el: '#app',
  data: {
    codeBlocks: {},
    inputValue: ''
  },
  methods: {
    generateCode: CodeGenerator.generateAllCode
  }
});

new Clipboard('.btn-copy');
