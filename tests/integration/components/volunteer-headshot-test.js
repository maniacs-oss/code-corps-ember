import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import volunteerHeadshot from '../../pages/components/volunteer-headshot';

let page = PageObject.create(volunteerHeadshot);

const roles = [
  'Developer',
  'Ember Developer',
  'UX Designer',
  'Software Engineer',
  'Project Coordinator',
  'Designer & Developer'
];

function generateUserRoles() {
  let userRoles = [];

  roles.forEach(function(roleName) {
    userRoles.push({
      role: {
        name: roleName
      }
    });
  });

  return userRoles;
}

moduleForComponent('volunteer-headshot', 'Integration | Component | volunteer headshot', {
  integration: true,
  beforeEach() {
    this.set('user', {
      name: 'Test User',
      photoThumbUrl: 'http://fillmurray.com/200/200',
      userRoles: generateUserRoles()
    });
    page.setContext(this);
    page.render(hbs`{{volunteer-headshot volunteer=user}}`);
  }
});

test('it renders the volunteer\'s name', function(assert) {
  assert.expect(1);
  assert.equal(page.name, this.get('user.name'));
});

test('it computes the name if it is not present', function(assert) {
  let firstName = 'Split';
  let lastName = 'Name';

  this.set('user.name', null);
  this.set('user.firstName', firstName);
  this.set('user.lastName', lastName);

  assert.equal(page.name, `${firstName} ${lastName}`);
});

test('it randomly selects one of the available roles', function(assert) {
  assert.expect(1);
  assert.ok(roles.includes(page.role));
});

test('it sets the image alt text', function(assert) {
  assert.expect(1);
  assert.equal(page.image.alt, `${this.get('user.name')}\'s headshot`);
});

test('it sets the image src', function(assert) {
  assert.expect(1);
  assert.equal(page.image.src, this.get('user.photoThumbUrl'));
});