import { LIFT_CURRENT_PAGE_TO_STATE } from '../constants/action-types';
import { LIFT_TOKEN_TO_STATE } from '../constants/action-types';
import { LIFT_UPDATED_USER } from '../constants/action-types';
import { LOGOUT_USER } from '../constants/action-types';


export const liftCurrentPageToState = page => (
  { type: LIFT_CURRENT_PAGE_TO_STATE, payload: page }
)

export const liftTokenToState = data => (
  {
    type: LIFT_TOKEN_TO_STATE,
    payload: {
      token: data.token,
      user: data.user
    }
  }
)

export const liftUpdatedUser = user => (
  {
    type: LIFT_UPDATED_USER,
    payload: user
  }
)

export const logout = () => (
  { type: LOGOUT_USER }
)
