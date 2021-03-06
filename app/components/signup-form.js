import Ember from 'ember';
import { task } from 'ember-concurrency';

const {
  Component,
  computed,
  computed: { alias, and, gte },
  get,
  run: { later },
  set
} = Ember;

export default Component.extend({
  classNames: ['form--centered', 'signup-form'],
  emailValid: false,
  hasError: false,
  usernameValid: false,

  canSubmit: and('emailValid', 'passwordValid', 'usernameValid'),
  passwordLength: alias('password.length'),
  passwordValid: gte('passwordLength', 6),

  password: computed('user.password', function() {
    return get(this, 'user.password') || '';
  }),

  actions: {
    emailValidated(result) {
      set(this, 'emailValid', result);
    },

    signUp() {
      if (get(this, 'canSubmit')) {
        get(this, '_submit').perform();
      } else {
        this._shakeButton();
      }
    },

    usernameValidated(result) {
      set(this, 'usernameValid', result);
    }
  },

  _setError() {
    set(this, 'hasError', true);
  },

  _shakeButton() {
    if (!get(this, 'hasError')) {
      set(this, 'hasError', true);
      later(this, function() {
        set(this, 'hasError', false);
      }, 1000);
    }
  },

  _submit: task(function* () {
    let credentials = {
      identification: get(this, 'user.email'),
      password: get(this, 'user.password')
    };

    let promise = get(this, 'user').save().then(() => {
      get(this, 'signIn')(credentials);
    }).catch((error) => {
      get(this, 'handleErrors')(error);
    });

    yield promise;
  }).drop()
});
