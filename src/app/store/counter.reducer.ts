import { createReducer } from '@ngrx/store';
interface each {
  count: number;
}
const intialState: each = {
  count: 0,
};
export const counterReducer = createReducer(intialState);
