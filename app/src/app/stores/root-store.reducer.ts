import { Action, createReducer, on } from "@ngrx/store";
import { RootActions } from './root-store.action';
import { RootState, rootStateInitialState } from './root-store.state';

const _rootReducer = createReducer(
    rootStateInitialState,
    on(RootActions.setError, (state, { error }) => {
        return {
            ...state,
            error
        }
    })
);

export const rootReducer = (state: RootState, action: Action) => _rootReducer(state, action)