import Immutable from 'seamless-immutable';
import { SET_INVALID_FIELD } from '../constants';

export const initialState = Immutable({
  invalidFields: [],
});

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_INVALID_FIELD: {
      if (payload.isValid) {
        const fields = Immutable.without(
          state.invalidFields,
          f => f === payload.field
        );

        return state.set('invalidFields', fields);
      }

      if (state.invalidFields.find(f => f === payload.field)) {
        return state;
      }
      return state.set(
        'invalidFields',
        [...state.invalidFields, payload.field].sort()
      );
    }
    default:
      return state;
  }
};
