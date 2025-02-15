import * as main from "../locators/allpokemons_page.json" // импорт локаторов главная страница
import * as authorisation from "../locators/authorisation_page.json" // импорт локаторов страница авторизации
import * as card from "../locators/card_page.json" // импорт локаторов страница банковской карты
import * as data from "../helpers/default_data.json" // импорт данных

describe('Проверка авторизации', function () {

        it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
            cy.visit('/');                          // переходим на сайт https://pokemonbattle.ru/
            cy.get(authorisation.email).type(data.login);          // вводим логин
            cy.get(authorisation.password).type(data.password);   // вводим пароль
            cy.get(authorisation.button).click();                // нажимаем кнопку вход
            cy.wait(2000);                                      //подождать
            cy.get(main.trainer_button).click({ force: true }); // Клик в шапке на аватар тренера
            cy.get('[href="/shop"]').click();                               // нажимаем кнопку сменить аватар
            cy.get('.available > .shop__button').first().click({ force: true });   // кликаем купить у первого аватара в доступе
            cy.get(card.card_number).type(data.card);                     // вводим номер карты
            cy.get(card.cvv).type(data.cvv);                             // вводим CVV карты
            cy.get(card.date).type(data.date);                           // вводим срок действия карты
            cy.get(card.name).type(data.name);                          // вводим имя владельца действия карты
            cy.get(card.button_pay).click();                           // нажимаем кнопку Оплатить
            cy.get(card.code).type(data.code);                        // вводим код подтверждения СМС
            cy.get(card.button_submit).click();                      // нажимаем кнопку Отправить
            cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения об успешной покупке
        });
    });


// npx cypress run --spec cypress/e2e/poke.cy.js --browser chromenpx