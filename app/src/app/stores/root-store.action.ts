import { ErrorBase } from '@app/models';
import { createAction, props } from '@ngrx/store';

export namespace RootActions {
    enum RootActionsEnum {
        SetError = '[Root] Set Error'
    }

    export const setError = createAction(
        RootActionsEnum.SetError,
        props<{ error: ErrorBase }>()
    );
}