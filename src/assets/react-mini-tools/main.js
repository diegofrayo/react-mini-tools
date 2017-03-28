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
export const ${StringUtilities.toUpperCase(input) + '_REQUEST'} = '${StringUtilities.toUpperCase(input) + '_REQUEST'}';
export const ${StringUtilities.toUpperCase(input) + '_SUCCESS'} = '${StringUtilities.toUpperCase(input) + '_SUCCESS'}';
export const ${StringUtilities.toUpperCase(input) + '_FAILURE'} = '${StringUtilities.toUpperCase(input) + '_FAILURE'}';
</pre>`;
	},

	generateActionsCode: (input) => {
		return `
<pre class="prettyprint" id="pre-code-actions">
export function ${StringUtilities.toLowerCamelCase(input)}() {
	return {
		type: ${StringUtilities.toUpperCase(input) + '_REQUEST'}
	};
}

const dispatch = this.props.dispatch;
dispatch(${StringUtilities.toLowerCamelCase(input)}());
</pre>`;
	},

	generateReducersCode: (input) => {
		return `
<pre class="prettyprint" id="pre-code-reducers">
[${StringUtilities.toUpperCase(input) + ''}](state, action) {
	return {...state};
},
[${StringUtilities.toUpperCase(input) + '_REQUEST'}](state, action) {
	return {...state};
},
[${StringUtilities.toUpperCase(input) + '_SUCCESS'}](state, action) {
	return {...state};
},
[${StringUtilities.toUpperCase(input) + '_FAILURE'}](state, action) {
	return {...state};
}
</pre>`;
	},

	generateSagasCode: (input) => {
		return `
<pre class="prettyprint" id="pre-code-sagas">
export function* ${StringUtilities.toLowerCamelCase(input) + 'Saga'}() {

	try{

		yield put({
			type: ${StringUtilities.toUpperCase(input) + '_SUCCESS'},
			payload: ''
		});

		yield put({
			type: ${StringUtilities.toUpperCase(input) + '_FAILURE'},
			payload: ''
		});

	} catch (err) {
		yield put({
			type: ${StringUtilities.toUpperCase(input) + '_FAILURE'},
			payload: ''
		});
	}

};

function* watch${StringUtilities.toUpperCamelCase(input)}() {
	yield * takeEvery(${StringUtilities.toUpperCase(input) + '_REQUEST'}, ${StringUtilities.toLowerCamelCase(input) + 'Saga'});
}

yield fork(watch${StringUtilities.toUpperCamelCase(input)});
</pre>`;
	},

	generateAllCode: function(inputValue) {
		if (inputValue) {
			inputValue = inputValue.trim().toLowerCase();
			this.codeBlocks = {
				constants: CodeGenerator.generateConstantsCode(inputValue),
				actions: CodeGenerator.generateActionsCode(inputValue),
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