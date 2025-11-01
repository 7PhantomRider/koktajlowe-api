# Cocktail API
Rozwiązanie zadania rekrutacyjnego do Koła Naukowego Solvro 
Projekt pozwala na zarządzanie składnikami oraz ich składnikami przez REST API

## działanie
- CRUD (Create, Read, Update, Delete) dla koktajli
- database w MySQL, gdzie każdy koktajl ma wiele składników (OneToMany Relationship)
- endpointy przetestowane w Postman

## użyte technologie
- NestJS
- PrismaORM
- MySQL
- Postman

## struktura
cocktail-api/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── cocktails/
│   │   ├── cocktails.controller.ts
│   │   ├── cocktails.module.ts
│   │   └── cocktails.service.ts
│   ├── app.module.ts
│   └── main.ts
├── .env
└── README.md

## uruchamianie
### zależności
bash
npm install
### plik .env
DATABASE_URL="mysql://root:root1234@localhost:3306/cocktails_db"
### baza danych
npx prisma db push
### serwer start
npm run start
### adres apki
http://localhost:3000

## testowanie API
### GET
/cocktails
lista wszystkich koktajli
### GET
/cocktails/:id
jeden koktajl
### POST
/cocktails
dodaj nowy
### PUT
/cocktails/:id
edytuj go
### DELETE
/cocktails/:id
usuń go

## screenshoty TESTów
![Postman GET](./screenshots/Postman-GET.png)
![Postman POST](./screenshots/Postman-POST.png)
![Databaza koktajli](./screenshots/SQL-Cocktail.png)
![Databaza składników](./screenshots/SQL-Ingredient.png)

## note
projekt stricte rekrutacyjny ale posłużył mi jako pierwsza piaskownica pisania w NestJS co było cenną lekcją
spodobał mi się pomysł by stał się z niego full stack-owy projekt z choćby prostym front-endem do wizualizacją tego procesu zarządzania
jest to na pewno kolejny krok, lecz na ten moment skupię się na tworzeniu tego co backendowe

kolejnym krokiem rozszerzenia projektu są niewątpliwie
- wspomniane w miłych do posiadania : filtrowanie z sortowaniem
- ale i mój wymarzony prosty interfejs frontendowy np. w React, pewne easter eggi z tym związane są ju widoczne w projekcie choćby kolumna IMAGE w databazie

## kto
Pozdrawiam ciepło
Seweryn Nekrasz
nekraszseweryn@gmail.com

