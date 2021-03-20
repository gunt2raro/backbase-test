# BackbaseTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Folders Structure

Inside this folder are the common stuff for the layouts or global components.

    /src/app/common/

All the components used by the pages
Each module has its own folder.

    /src/app/components/

Here goes all the enums used on the project,
in this case I only used the filtertype enum.

    /src/app/enums/

Layouts folder, each layout has it's own folder

    /src/layouts/

Models folder contains all the models used on the project.

    /src/app/models/

Modules folder contains all the modules divided by a folder for each module.

    /src/app/modules/

Pages folder contains all the pages displayed, usually each one has a route.

    /src/app/dashboard/

Routes folder contains all the routes files.

    /src/app/routes/

Services contains all the services used on the project.

    /src/app/services/

## Models

I used 5 models to define the transaction object on the mock array.

    AmountCurrency {
        amount: number
        currencyCode: string
    }

    Merchant {
        name: string
        accountNumber: string
    }

    TransactionDate {
        valueDate: number
    }

    TransactionInfo {
        type: string
        creditDebitIndicator: string
        amountCurrency: AmountCurrency
    }

    Transaction {
        merchant: Merchant
        categoryCode: string
        dates: TransactionDate
        transaction: TransactionInfo
    }

## Services

I only used one service on the project, the TransactionService, which has two behavior subjects, one for the transacions and other of the accountBalance.

The create function gets a transaction and then reduces the account balance and updates the array with the new transaction on top.

getAcccountBalance will return the current account balance value.

setTransactions will update the whole current transactions array.

## Modules

Only created the main module wich has the dashboardcomponent page and the global module.

## Dashboard

It's the only page that I created to display the test.

## Routes 

Only the main module routes, has the dashboard route.

## Layouts

Only one layout called the main layout for the main module, here I display the common header.

## Components

It's divided by modules; the dashboard module contains:

TransactionFormComponent; where the transaction form is declared, here you can create and review the transaction.

TransactionsComponent; where the list of transactions takes place, here you can filter the transactions by amount, date and beneficiary.

TransactionComponent; where the transaction gets defined, dispays date by month and day, beneficiary, type of transaction, beneficiary icon and amount.

## Styles

I defined the styles for the cards on a css class "t-card", I used this on both cards of the page.

Used "control-container" class to defined form inputs.

Has a header, body and footer. It is responsive.