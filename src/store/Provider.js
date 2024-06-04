import reducer, { initState } from './reducer';

const { useReducer } = require('react');
const { Context } = require('./Context');

function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, initState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    );
}

export default Provider;
