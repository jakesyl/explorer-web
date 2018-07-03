import { describe } from 'riteway'
import { Actions } from '../actions/index'
import { user } from './User'

const createUser = ({
  token = '123',
  profile = {
    email: 'anon@test.com',
    apiTokens: new Array(),
    verified: false,
    createdAt: '',
  },
} = {}) => ({
  token,
  profile,
})

describe('user reducer', async (should: any) => {
  const { assert } = should()

  assert({
    given: 'default state and SIGN_IN_SUCCESS action with user',
    should: 'state with user',
    actual: user(
      createUser(),
      Actions.SignIn.onSignInSuccess(
        createUser({
          token: 'abc',
          profile: {
            email: 'jesse@test.com',
            apiTokens: new Array(),
            verified: true,
            createdAt: 'test',
          },
        })
      )
    ),
    expected: createUser({
      token: 'abc',
      profile: {
        email: 'jesse@test.com',
        apiTokens: new Array(),
        verified: true,
        createdAt: 'test',
      },
    }),
  })

  assert({
    given: 'default state and PROFILE_SUCCESS action with user',
    should: 'state with payload as user',
    actual: user(
      createUser({ token: '123' }),
      Actions.Profile.onProfileSuccess({
        email: 'jesse@test.com',
        apiTokens: new Array(),
        verified: true,
        createdAt: 'test',
      })
    ),
    expected: createUser({
      token: '123',
      profile: {
        email: 'jesse@test.com',
        apiTokens: new Array(),
        verified: true,
        createdAt: 'test',
      },
    }),
  })
})
