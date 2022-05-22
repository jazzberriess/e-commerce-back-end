# E-commerce Back End
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)

A back-end e-commerce platform that uses RESTful API calls combined with an SQL powered database to store data in order to create, read, update and delete items.

## Table of Contents

* [Technologies](#technologies)
* [Installation](#installation)
* [Usage](#usage)
* [Live Demo](#live-demo)
* [Resources](#resources)
* [License](#license)

## Technologies
This application was built using the following technologies and languages:
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [MySQL 2 NPM](https://www.npmjs.com/package/mysql2)
* [Sequelize](https://sequelize.org/)
* [dotenv NPM](https://www.npmjs.com/package/dotenv)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Insomnia](https://insomnia.rest/)
* JavaScript
* SQL (via Sequelize)

## Installation

To run the E-commerce Back End, you'll first need to clone the [e-commerce-back-end repo on GitHub](https://github.com/jazzberriess/e-commerce-back-end) or download the zipfile then install node.js, and other dependencies. To test the API requests, you'll need to install Insomnia, or a similar API client, such as Postman.

To install the dependencies included in this repo, navigate to the root directory of the cloned or downloaded repo. In either your terminal, command line or using the integrated terminal in your code editor of choice, enter the following command:

`npm i`

OR

`npm install`

If you're including the `package-lock.json` file from this repo in your own files, then run the following command instead:

`npm ci`

## Usage

To use the Ecommerce Back End, clone or download the repo and install the dependencies as instructed above.

Next, you'll need to source the database in your SQL database by navigating to the db folder. Then access your SQL database and enter:

`SOURCE schema.sql`

You can then add seed data if you wish. To do so, navigate to the root folder in either your terminal, command line or using the integrated terminal in your code editor of choice and enter:

`npm run seed`

Next, to begin the application enter:

`npm start`

You can then make API requests and update data in Insomnia or your API client of choice.

Responses will be printed in the API client.

## Live Demo
### [Video demonstration of the application being used](https://drive.google.com/file/d/1K9t86SzMkcO1G-ORgk4DgXfTfBcnRQ7m/view)
in the integrated terminal in VS Code for sourcing and seeding the database. API requests are tested in Insomnia.

### Gif demo of the 'category' API calls:
![Gif demo of the application's category API calls](./images/demo-category-api-calls.gif)

## Resources
* [Sequelize Documentation](https://sequelize.org/docs/v6/getting-started/)
* [Sequelize's Update Method - example included](https://medium.com/@sarahdherr/sequelizes-update-method-example-included-39dfed6821d)
* [How to implement many to many association in sequelize](https://stackoverflow.com/questions/22958683/how-to-implement-many-to-many-association-in-sequelize)
* [Using underscored: true still returns attributes in camelCase](https://github.com/sequelize/sequelize/issues/10857#issuecomment-601471753)
* [Why does Sequelize add extra columns to SELECT query?](https://stackoverflow.com/questions/49424040/why-does-sequelize-add-extra-columns-to-select-query)
* [duplicate foreign key column using sequelize](https://stackoverflow.com/questions/32870428/duplicate-foreign-key-column-using-sequelize)
* [Bash tips: Colors and formatting](https://misc.flogisoft.com/bash/tip_colors_and_formatting)
* Class notes and recordings


## License

This project is covered under the [MIT license](https://github.com/jazzberriess/employee-management-system/blob/main/LICENSE)

&copy; 2022 Christi Scappatura