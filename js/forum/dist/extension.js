'use strict';

System.register('tituspijean-auth-ldap/components/LDAPLogInModal', ['flarum/app', 'flarum/components/Modal', 'flarum/components/ForgotPasswordModal', 'flarum/components/Alert', 'flarum/components/Button', 'flarum/components/LogInButtons', 'flarum/utils/extractText'], function (_export, _context) {
  "use strict";

  var app, Modal, ForgotPasswordModal, Alert, Button, LogInButtons, extractText, translationPrefix, LDAPLogInModal;
  return {
    setters: [function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default;
    }, function (_flarumComponentsForgotPasswordModal) {
      ForgotPasswordModal = _flarumComponentsForgotPasswordModal.default;
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsLogInButtons) {
      LogInButtons = _flarumComponentsLogInButtons.default;
    }, function (_flarumUtilsExtractText) {
      extractText = _flarumUtilsExtractText.default;
    }],
    execute: function () {
      translationPrefix = 'tituspijean-auth-ldap.forum.';

      LDAPLogInModal = function (_Modal) {
        babelHelpers.inherits(LDAPLogInModal, _Modal);

        function LDAPLogInModal() {
          babelHelpers.classCallCheck(this, LDAPLogInModal);
          return babelHelpers.possibleConstructorReturn(this, (LDAPLogInModal.__proto__ || Object.getPrototypeOf(LDAPLogInModal)).apply(this, arguments));
        }

        babelHelpers.createClass(LDAPLogInModal, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(LDAPLogInModal.prototype.__proto__ || Object.getPrototypeOf(LDAPLogInModal.prototype), 'init', this).call(this);

            /**
             * The value of the identification input.
             *
             * @type {Function}
             */
            this.identification = m.prop(this.props.identification || '');

            /**
             * The value of the password input.
             *
             * @type {Function}
             */
            this.password = m.prop(this.props.password || '');

            /**
             * The value of the remember me input.
             *
             * @type {Function}
             */
            this.remember = m.prop(!!this.props.remember);
          }
        }, {
          key: 'className',
          value: function className() {
            return 'LogInModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans(translationPrefix + 'log_in_with') + ' ' + app.forum.attribute('LDAP_method_name');
          }
        }, {
          key: 'content',
          value: function content() {
            return [m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'Form Form--centered' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m('input', { className: 'FormControl', name: 'identification', type: 'text', placeholder: extractText(app.translator.trans('core.forum.log_in.username_or_email_placeholder')),
                    bidi: this.identification,
                    disabled: this.loading })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  m('input', { className: 'FormControl', name: 'password', type: 'password', placeholder: extractText(app.translator.trans('core.forum.log_in.password_placeholder')),
                    bidi: this.password,
                    disabled: this.loading })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'div',
                    null,
                    m(
                      'label',
                      { className: 'checkbox' },
                      m('input', { type: 'checkbox', bidi: this.remember, disabled: this.loading }),
                      app.translator.trans('core.forum.log_in.remember_me_label')
                    )
                  )
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  Button.component({
                    className: 'Button Button--primary Button--block',
                    type: 'submit',
                    loading: this.loading,
                    children: app.translator.trans('core.forum.log_in.submit_button')
                  })
                )
              )
            )];
          }
        }, {
          key: 'onready',
          value: function onready() {
            this.$('[name=' + (this.identification() ? 'password' : 'identification') + ']').select();
          }
        }, {
          key: 'LDAPlogin',
          value: function LDAPlogin(data) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var width = 600;
            var height = 400;
            var $window = $(window);
            var url = app.forum.attribute('baseUrl') + '/auth/ldap';
            var name = "ldapauth";

            var form = document.createElement("form");
            form.setAttribute("method", "POST");
            form.setAttribute("action", url);
            form.setAttribute("target", name);
            for (var i in data) {
              if (data.hasOwnProperty(i)) {
                var input = document.createElement('input');
                input.type = 'hidden';
                input.name = i;
                input.value = data[i];
                form.appendChild(input);
              }
            }
            document.body.appendChild(form);

            window.open("", name, 'width=' + width + ',' + ('height=' + height + ',') + ('top=' + ($window.height() / 2 - height / 2) + ',') + ('left=' + ($window.width() / 2 - width / 2) + ',') + 'status=no,scrollbars=no,resizable=no');

            form.submit();
            document.body.removeChild(form);
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            e.preventDefault();

            this.loading = true;

            var identification = this.identification();
            var password = this.password();
            var remember = this.remember();

            this.LDAPlogin({ identification: identification, password: password, remember: remember }, { errorHandler: this.onerror.bind(this) }).then(function () {
              return window.location.reload();
            }, this.loaded.bind(this));
          }
        }, {
          key: 'onerror',
          value: function onerror(error) {
            if (error.status === 401) {
              error.alert.props.children = app.translator.trans('core.forum.log_in.invalid_login_message');
            }

            babelHelpers.get(LDAPLogInModal.prototype.__proto__ || Object.getPrototypeOf(LDAPLogInModal.prototype), 'onerror', this).call(this, error);
          }
        }]);
        return LDAPLogInModal;
      }(Modal);

      _export('default', LDAPLogInModal);
    }
  };
});;
"use strict";

System.register("tituspijean-auth-ldap/main", ["flarum/extend", "flarum/app", "flarum/components/HeaderSecondary", "flarum/components/SettingsPage", "flarum/components/Button", "tituspijean-auth-ldap/components/LDAPLogInModal"], function (_export, _context) {
	"use strict";

	var extend, app, HeaderSecondary, SettingsPage, Button, LDAPLogInModal, translationPrefix;
	return {
		setters: [function (_flarumExtend) {
			extend = _flarumExtend.extend;
		}, function (_flarumApp) {
			app = _flarumApp.default;
		}, function (_flarumComponentsHeaderSecondary) {
			HeaderSecondary = _flarumComponentsHeaderSecondary.default;
		}, function (_flarumComponentsSettingsPage) {
			SettingsPage = _flarumComponentsSettingsPage.default;
		}, function (_flarumComponentsButton) {
			Button = _flarumComponentsButton.default;
		}, function (_tituspijeanAuthLdapComponentsLDAPLogInModal) {
			LDAPLogInModal = _tituspijeanAuthLdapComponentsLDAPLogInModal.default;
		}],
		execute: function () {
			translationPrefix = 'tituspijean-auth-ldap.forum.';


			app.initializers.add('tituspijean-auth-ldap', function () {

				extend(HeaderSecondary.prototype, 'items', addLoginLink);
				extend(HeaderSecondary.prototype, 'items', removeIfOnlyUse);

				extend(SettingsPage.prototype, 'accountItems', removeProfileActions);
				extend(SettingsPage.prototype, 'settingsItems', checkRemoveAccountSection);

				function addLoginLink(items) {
					if (items.has('logIn')) {
						items.add('logInLDAP', Button.component({
							children: app.translator.trans(translationPrefix + 'log_in_with') + ' ' + app.forum.attribute('LDAP_method_name'),
							className: 'Button Button--link',
							onclick: function onclick() {
								return app.modal.show(new LDAPLogInModal());
							}
						}), 0);
					}
				}

				function removeIfOnlyUse(items) {
					if (app.forum.attribute('onlyUseLDAP')) {
						if (items.has('signUp')) {
							items.remove('signUp');
						}
						if (items.has('logIn')) {
							items.remove('logIn');
						}
					}
				}

				function removeProfileActions(items) {
					items.remove('changeEmail');
					items.remove('changePassword');
				}

				function checkRemoveAccountSection(items) {
					if (items.has('account') && items.get('account').props.children.length === 0) {
						items.remove('account');
					}
				}
			});
		}
	};
});