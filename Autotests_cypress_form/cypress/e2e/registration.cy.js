import * as main_page from "../locators/main_page.json"; // импорт локаторов с главной страницы
import * as result_page from "../locators/result_page.json" // импорт локаторов страница результата
import * as data from "../helpers/default_data.json" // импорт данных
import * as recovery_password_page from "../locators/recovery_password_page.json" // импорт локаторов страница восстановления пароля

describe('Проверка авторизации', function () {

   beforeEach('Перед тестом', function () {
         cy.visit('/');
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
           });

   afterEach('После теста', function () {
         cy.get(result_page.close).should('be.visible');
        });

   it('Верный пароль и верный логин', function () {
        cy.get(main_page.email).type(data.login); // вводим логин
        cy.get(main_page.password).type(data.password); // вводим пароль
        cy.get(main_page.login_button).click(); // кликаем на вход
        cy.get(result_page.title).should('be.visible'); // заголовок виден на экране 
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяем ответ
    })

    it('Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // кликаем на забыли пароль
        cy.get(recovery_password_page.email).type(data.login); // вводим логин
        cy.get(recovery_password_page.send_button).click(); // нажимаем на кнопку
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // проверяем текст на результирующей странице
    })

    it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); // вводим логин
        cy.get(main_page.password).type('iLoveqastudio2'); // вводим неверный пароль
        cy.get(main_page.login_button).click(); // нажимаем на вход
        cy.get(result_page.title).should('be.visible'); // заголовок виден на экране
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяем ответ
    })

    it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('margeryzhuk@yandex.ru'); // вводим неверный логин
        cy.get(main_page.password).type(data.password); // вводим верный пароль
        cy.get(main_page.login_button).click(); // нажимаем на вход
        cy.get(result_page.title).should('be.visible'); // заголовок виден на экране
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяем текст ошибки
    })

    it('Валидация на наличие @', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // вводим логин без @
        cy.get(main_page.password).type(data.password); // вводим верный пароль
        cy.get(main_page.login_button).click(); // нажимаем на вход
        cy.get(result_page.title).should('be.visible'); // заголовок виден на экране
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // проверяем текст ошибки
    })

    it('Верный пароль и верный логин - приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // вводим логин с разным регистром
        cy.get(main_page.password).type(data.password); // вводим верный пароль
        cy.get(main_page.login_button).click(); // нажимаем на вход
        cy.get(result_page.title).should('be.visible'); // заголовок виден на экране
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяем успешный ответ
    })
})


// npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome