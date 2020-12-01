import { ErrorBase } from '@app/models';

export interface RootState {
  error: ErrorBase;
}

export const rootStateInitialState: RootState = {
  error: null,
};
