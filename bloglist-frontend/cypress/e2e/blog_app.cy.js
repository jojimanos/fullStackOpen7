describe('blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const firstUser = {
      name: 'gandalf',
      userName: 'gandalf',
      password: '123456'
    }
    const secondUser = {
      name: 'openheimer',
      userName: 'openheimer',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', firstUser)
    cy.request('POST', 'http://localhost:3003/api/users/', secondUser)
    cy.visit('http://localhost:3000')
  })
  it('login form is shown', function () {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })
  describe('login form functionalities', function () {
    it('typing and using the login form', function () {
      cy.visit('http://localhost:3000')
      cy.get('#userName').type('gandalf')
      cy.get('#password').type('123456')
      cy.get('#submitButton').click()

      cy.contains('Welcome gandalf')
      cy.contains('blogs')
    })
    it('login error for userName', function () {

      cy.get('#userName').type('saruman')
      cy.get('#password').type('123456')
      cy.get('#submitButton').click()

      cy.contains('Wrong credentials')
    })
    it('login error for password', function () {

      cy.get('#userName').type('gandalf')
      cy.get('#password').type('444444')
      cy.get('#submitButton').click()

      cy.get('.error').should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
  describe('when logged in', () => {
    it('create a new blog', function () {
      cy.get('#userName').type('gandalf')
      cy.get('#password').type('123456')
      cy.get('#submitButton').click()

      cy.contains('Welcome gandalf')
      cy.contains('blogs')
      cy.contains('create blog').click()

      cy.get('#author').type('guenon')
      cy.get('#title').type('vedanta')
      cy.get('#url').type('url')

      cy.contains('Create').click()
    })
    it('like a blog', function () {
      cy.get('#userName').type('gandalf')
      cy.get('#password').type('123456')
      cy.get('#submitButton').click()

      cy.contains('Welcome gandalf')
      cy.contains('blogs')
      cy.contains('create blog').click()

      cy.get('#author').type('guenon')
      cy.get('#title').type('vedanta')
      cy.get('#url').type('url')

      cy.contains('Create').click()

      cy.get('#hide-view').click()
      cy.get('#likeButton').click()
    })
    it('user can delete created blog', () => {
      cy.get('#userName').type('gandalf')
      cy.get('#password').type('123456')
      cy.get('#submitButton').click()

      cy.contains('Welcome gandalf')
      cy.contains('blogs')
      cy.contains('create blog').click()

      cy.get('#author').type('guenon')
      cy.get('#title').type('vedanta')
      cy.get('#url').type('url')

      cy.contains('Create').click()

      cy.contains('vedanta')

      cy.contains("Delete").click()

      cy.contains('vedanta').should('not.exist')
    })
    it('only creator can see the delete button', () => {
      cy.get('#userName').type('gandalf')
      cy.get('#password').type('123456')
      cy.get('#submitButton').click()

      cy.contains('Welcome gandalf')
      cy.contains('blogs')
      cy.contains('create blog').click()

      cy.get('#author').type('guenon')
      cy.get('#title').type('vedanta')
      cy.get('#url').type('url')

      cy.contains('Create').click()

      cy.contains('Logout').click()

      cy.contains('Login')

      cy.get('#userName').type('openheimer')
      cy.get('#password').type('123456')
      cy.get('#submitButton').click()

      cy.contains('Delete').should('not.exist')
    })
    it('blogs are ordered by likes', () => {
      cy.get('#userName').type('gandalf')
      cy.get('#password').type('123456')
      cy.get('#submitButton').click()

      cy.contains('create blog').click()
      cy.get('#author').type('guenon')
      cy.get('#title').type('vedanta')
      cy.get('#url').type('url')

      cy.contains('Create').click()

      cy.get('#hide-view').eq(0).click()
      cy.get('#likeButton').click()
      cy.get('#1')
      cy.get('#likeButton').click()
      cy.get('#2')
      cy.get('#hide-view').eq(0).click()

      cy.contains('create blog').click()
      cy.get('#author').type('guenon')
      cy.get('#title').type('the cross')
      cy.get('#url').type('url')

      cy.contains('Create').click()
      cy.contains('the cross').click()

      cy.contains('the cross').parent().find('#hide-view').click()
      cy.contains('the cross').parent().find('#likeButton').click()

      cy.get(".blog").first().should('contain', 'vedanta')
      cy.get(".blog").eq(1).should('contain', 'the cross')
    })
  })
})