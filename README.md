<h1 align="center">
    <img alt="Design+Code" src="https://res.cloudinary.com/lucasarena/image/upload/v1586864237/Icons/typescript_ey1iu6.png" width="200" />
    <img alt="Design+Code" src="https://res.cloudinary.com/lucasarena/image/upload/v1586733217/Icons/react-icon_eoqw5q.png" width="350" />
    <br>
    Easy Carros by Lucas Arena
</h1>

<h4 align="center">
  App to control the check in and check out of vehicles
</h4>
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/lukemorales/react-native-design-code.svg">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/lukemorales/react-native-design-code.svg">

  <a href="https://github.com/lukemorales/react-native-design-code/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/lukemorales/react-native-design-code.svg">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/lukemorales/react-native-design-code.svg">
</p>

<p align="center">
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

<p align="center">
  <img alt="App Demo" src="https://res.cloudinary.com/lucasarena/image/upload/v1594410100/Repositories/FCamara%20Teste/preview-app_sdamix.gif">
</p>

## :rocket: Technologies

This project was developed with the following technologies:
-  [TypeScript](https://github.com/microsoft/TypeScript)
-  [ReactJS](https://github.com/facebook/react)
-  [jest](https://github.com/facebook/jest)
-  [express](https://github.com/expressjs/express)
-  [express-async-errors](https://github.com/davidbanham/express-async-errors)
-  [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
-  [typeorm](https://github.com/typeorm/typeorm)
-  [sqlite3](https://github.com/sqlite/sqlite)
-  [tsyringe](https://github.com/microsoft/tsyringe)
-  [styled-components](https://www.styled-components.com/)
-  [axios](https://github.com/axios/axios)
-  [unform](https://github.com/Rocketseat/unform)
-  [yup](https://github.com/jquense/yup)
-  [cpf-cnpj-validator](https://github.com/danielfariati/cpf-cnpj-validator)
-  [date-fns](https://github.com/date-fns/date-fns)
-  [dotenv](https://github.com/motdotla/dotenv)
-  [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
-  [uuid](https://github.com/uuidjs/uuid)
-  [celebrate](https://github.com/arb/celebrate)
-  [cors](https://github.com/expressjs/cors)
-  [polished](https://github.com/styled-components/polished)
-  [VS Code][vc] with [EditorConfig][vceditconfig] and [ESLint][vceslint]

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v10.16][nodejs] or higher + [Yarn v1.13][yarn] or higher installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/lucasArena/test-node-js-react app
```

To start the app's back-end,  you need to acess the server folder, install de dependecies, run the migrations and than execute the command to start the server

```bash
# Enter in the server folder 
$ cd server

# Install the dependencies packages (you can use npm as well)
yarn install

# Run the migrations to create the table on archive database.sqlite
yarn dev:typeorm migration:run

# Start back-end server
yarn dev:server
```

To start the frontend's app, you need to acess the web folder, install de dependecies execute the command to start the application

```bash
# Enter in the web folder 
$ cd web

# Install the dependencies packages (you can use npm as well)
yarn install

# Start front-end
yarn start
```

## API documentation
### Users
**Request:**
```json
POST /users
Accept: application/json
Content-Type: application/json

{
	"name": "Lucas Arena",
	"email": "lucasarena@gmail.com",
	"password": "123456"
}
```
**Successful Response:**
```json
Status: 200 OK
Server: My RESTful API
Content-Type: application/json

{
  "name": "Lucas Arena",
  "email": "lucasarena@gmail.com",
  "password": "$2a$08$S2D2lUFlvxkiJNWaq44bju8OfwdNM1a8k8jDxDCQUbwlAOkV8iJgq",
  "id": "1d7b1974-c0d9-428d-adc9-5e75251b32a7",
  "created_at": "2020-07-10T20:43:37.000Z",
  "updated_at": "2020-07-10T20:43:37.000Z"
}
```

### Sessions
**Request:**
```json
POST /sessions
Accept: application/json
Content-Type: application/json

{
	"email": "lucasarena@gmail.com",
	"password": "123456"
}
```
**Successful Response:**
```json
Status: 200 OK
Server: My RESTful API
Content-Type: application/json

{
  "user": {
    "id": "47cde645-97bf-43b9-8fc3-9e0be1655211",
    "name": "Lucas Arena",
    "email": "lucasarena@gmail.com",
    "password": "$2a$08$f3hdyKdeiZyXh/t.IcyKCO1HwWnn.q3kQXb5qac8MBEu/9dzTQB62",
    "created_at": "2020-07-10T20:45:06.000Z",
    "updated_at": "2020-07-10T20:45:06.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTQ0MTM5NzcsImV4cCI6MTU5NTAxODc3N30.uJuKVz3S67xb3YrHs6CZUMqY3jChpcy5oJjOV0eEG8s"
}
```

### Establishments
**Request:**
```json
GET /establishments
Accept: application/json
Content-Type: application/json
```
**Successful Response:**
```json
Status: 200 OK
Server: My RESTful API
Content-Type: application/json

[
  {
    "id": "05ee3196-d42d-4d2e-8566-1adc904ba0c4",
    "name": "Lucas estacionamentos",
    "cnpj": 25225723000110,
    "address": "Rua prefeito armindo faustino de mello, 41",
    "phone": "11 99943-2124",
    "quantity_motorcycles": 1,
    "quantity_cars": 1,
    "created_at": "2020-07-10T20:50:00.000Z",
    "updated_at": "2020-07-10T20:50:00.000Z"
  }
]
```

**Request:**
```json
GET /establishments/:id
Accept: application/json
Content-Type: application/json
```
**Successful Response:**
```json
Status: 200 OK
Server: My RESTful API
Content-Type: application/json

{
   "id": "05ee3196-d42d-4d2e-8566-1adc904ba0c4",
   "name": "Lucas estacionamentos",
   "cnpj": 25225723000110,
   "address": "Rua prefeito armindo faustino de mello, 41",
   "phone": "11 99943-2124",
   "quantity_motorcycles": 1,
   "quantity_cars": 1,
   "created_at": "2020-07-10T20:50:00.000Z",
   "updated_at": "2020-07-10T20:50:00.000Z"
}
```

**Request:**
```json
POST /establishments/
Accept: application/json
Content-Type: application/json

{
	"name": "Lucas estacionamentos",
	"cnpj": 25225723000110,
	"address": "Rua prefeito armindo faustino de mello, 41",
	"phone": "11 99943-2124",
	"quantity_motorcycles": 1,
	"quantity_cars": 1
}
```
**Successful Response:**
```json
Status: 200 OK
Server: My RESTful API
Content-Type: application/json

{
  "name": "Lucas estacionamentos",
  "cnpj": 25225723000110,
  "address": "Rua prefeito armindo faustino de mello, 41",
  "phone": "11 99943-2124",
  "quantity_motorcycles": 1,
  "quantity_cars": 1,
  "id": "05ee3196-d42d-4d2e-8566-1adc904ba0c4",
  "created_at": "2020-07-10T20:50:00.000Z",
  "updated_at": "2020-07-10T20:50:00.000Z"
}
```

**Request:**
```json
PUT /establishments/:id
Accept: application/json
Content-Type: application/json

{
	"name": "Lucas estacionamentos 1",	
	"address": "Rua prefeito armindo faustino de mello, 41",
	"phone": "11 99943-2124",
	"quantity_motorcycles": 4,
	"quantity_cars": 2
}
```
**Successful Response:**
```json
Status: 200 OK
Server: My RESTful API
Content-Type: application/json

{
   "id": "05ee3196-d42d-4d2e-8566-1adc904ba0c4",
   "name": "Lucas estacionamentos",
   "cnpj": 25225723000110,
   "address": "Rua prefeito armindo faustino de mello, 41",
   "phone": "11 99943-2124",
   "quantity_motorcycles": 1,
   "quantity_cars": 1,
   "created_at": "2020-07-10T20:50:00.000Z",
   "updated_at": "2020-07-10T20:50:00.000Z"
}
```

**Request:**
```json
DELETE /establishments/:id
Accept: application/json
Content-Type: application/json
```
**Successful Response:**
```json
Status: 200 OK
Server: My RESTful API
Content-Type: application/json
{
   "id": "05ee3196-d42d-4d2e-8566-1adc904ba0c4",
   "name": "Lucas estacionamentos",
   "cnpj": 25225723000110,
   "address": "Rua prefeito armindo faustino de mello, 41",
   "phone": "11 99943-2124",
   "quantity_motorcycles": 1,
   "quantity_cars": 1,
   "created_at": "2020-07-10T20:50:00.000Z",
   "updated_at": "2020-07-10T20:50:00.000Z"
}
```

### Vehicles
**Request:**
```json
GET /vehicles
Accept: application/json
Content-Type: application/json
```
**Successful Response:**
```json
Status: 200 OK
Server: My RESTful API
Content-Type: application/json

[
  {
    "id": "3d9d32ce-4cb1-4ce3-99de-cab16e9537e6",
    "brand": "Toyota",
    "model": "Corolla",
    "color": "red",
    "plate": "TTT-1321",
    "type_id": "118b0196-43ba-4e53-a257-ae8c8db482cb",
    "created_at": "2020-07-09T15:13:38.000Z",
    "updated_at": "2020-07-09T15:13:38.000Z",
    "type": {
      "id": "118b0196-43ba-4e53-a257-ae8c8db482cb",
      "name": "Carro",
      "created_at": "2020-07-09T12:51:28.000Z",
      "updated_at": "2020-07-09T12:51:28.000Z"
    }
  },
]
```

**Request:**
```json
GET /vehicles/:id
Accept: application/json
Content-Type: application/json
```
**Successful Response:**
```json
Status: 200 OK
Server: My RESTful API
Content-Type: application/json

{
  "id": "3d9d32ce-4cb1-4ce3-99de-cab16e9537e6",
  "brand": "Toyota",
  "model": "Corolla",
  "color": "red",
  "plate": "TTT-1321",
  "type_id": "118b0196-43ba-4e53-a257-ae8c8db482cb",
  "created_at": "2020-07-09T15:13:38.000Z",
  "updated_at": "2020-07-09T15:13:38.000Z",
  "type": {
    "id": "118b0196-43ba-4e53-a257-ae8c8db482cb",
    "name": "Carro",
    "created_at": "2020-07-09T12:51:28.000Z",
    "updated_at": "2020-07-09T12:51:28.000Z"
  }
}
```

**Request:**
```json
POST /vehicles/
Accept: application/json
Content-Type: application/json

{
	"brand": "Toyota",
	"model": "Corolla",
	"color": "red",
	"plate": "TTT-1321",
	"type_id": "118b0196-43ba-4e53-a257-ae8c8db482cb"
}
```
**Successful Response:**
```json
Status: 200 OK
Server: My RESTful API
Content-Type: application/json

{
	"brand": "Toyota",
	"model": "Corolla",
	"color": "red",
	"plate": "TTT-1321",
   "type_id": "118b0196-43ba-4e53-a257-ae8c8db482cb",
   "created_at": "2020-07-09T12:51:28.000Z",
   "updated_at": "2020-07-09T12:51:28.000Z"
}
```

**Request:**
```json
PUT /vehicles/:id
Accept: application/json
Content-Type: application/json
{
	"brand": "Toyota",
	"model": "Corolla",
	"color": "red",
	"plate": "TTT-1321",
	"type_id": "118b0196-43ba-4e53-a257-ae8c8db482cb"
}
```
**Successful Response:**
```json
Status: 200 OK
Server: My RESTful API
Content-Type: application/json
{
   "id": "3d9d32ce-4cb1-4ce3-99de-cab16e9537e6",
   "brand": "Toyota",
   "model": "Corolla",
   "color": "red",
   "plate": "TTT-1321",
   "type_id": "118b0196-43ba-4e53-a257-ae8c8db482cb",
   "created_at": "2020-07-09T15:13:38.000Z",
   "updated_at": "2020-07-09T15:13:38.000Z",
   "type": {
      "id": "118b0196-43ba-4e53-a257-ae8c8db482cb",
      "name": "Carro",
      "created_at": "2020-07-09T12:51:28.000Z",
      "updated_at": "2020-07-09T12:51:28.000Z"
   }
}
```

**Request:**
```json
DELETE /vehicles/:id
Accept: application/json
Content-Type: application/json
```
**Successful Response:**
```json
Status: 200 OK
Server: My RESTful API
Content-Type: application/json
{
  "id": "3d9d32ce-4cb1-4ce3-99de-cab16e9537e6",
  "brand": "Toyota",
  "model": "Corolla",
  "color": "red",
  "plate": "TTT-1321",
  "type_id": "118b0196-43ba-4e53-a257-ae8c8db482cb",
  "created_at": "2020-07-09T15:13:38.000Z",
  "updated_at": "2020-07-09T15:13:38.000Z",
  "type": {
    "id": "118b0196-43ba-4e53-a257-ae8c8db482cb",
    "name": "Carro",
    "created_at": "2020-07-09T12:51:28.000Z",
    "updated_at": "2020-07-09T12:51:28.000Z"
   }
}
```
### Transactions
**Request:**
```json
GET /transactions
Accept: application/json
Content-Type: application/json
```
**Successful Response:**
```json
Status: 200 OK
Server: My RESTful API
Content-Type: application/json
[
  {
    "id": "b0d659c5-bae4-4c4c-b49a-b53ef66bfc46",
    "establishment_id": "8f76d77c-1a0c-42e1-983c-601c4409359d",
    "vehicle_id": "3d9d32ce-4cb1-4ce3-99de-cab16e9537e6",
    "type": "in",
    "created_at": "2020-07-10T01:31:42.000Z",
    "updated_at": "2020-07-10T01:31:42.000Z",
    "establishment": {
      "id": "8f76d77c-1a0c-42e1-983c-601c4409359d",
      "name": "Lucas estacionamentos",
      "cnpj": 18278565000109,
      "address": "Rua prefeito armindo faustino de mello, 41",
      "phone": "12 31232-1321",
      "quantity_motorcycles": 35,
      "quantity_cars": 1,
      "created_at": "2020-07-09T14:56:48.000Z",
      "updated_at": "2020-07-10T14:53:35.000Z"
    },
    "vehicle": {
      "id": "3d9d32ce-4cb1-4ce3-99de-cab16e9537e6",
      "brand": "Toyota",
      "model": "Corolla",
      "color": "red",
      "plate": "TTT-1321",
      "type_id": "ad797ad6-0f4f-4d09-8508-5f08fae45c64",
      "created_at": "2020-07-09T15:13:38.000Z",
      "updated_at": "2020-07-10T14:52:47.000Z",
      "type": {
        "id": "ad797ad6-0f4f-4d09-8508-5f08fae45c64",
        "name": "Moto",
        "created_at": "2020-07-09T12:51:28.000Z",
        "updated_at": "2020-07-09T12:51:28.000Z"
      }
    }
  }
]
```

**Request:**
```json
POST /transactions
Accept: application/json
Content-Type: application/json
{
	"establishment_id": "8f76d77c-1a0c-42e1-983c-601c4409359d",
	"vehicle_id": "3d9d32ce-4cb1-4ce3-99de-cab16e9537e6",
	"type": "in"
}
```
**Successful Response:**
```json
Status: 200 OK
Server: My RESTful API
Content-Type: application/json

{
  "establishment_id": "8f76d77c-1a0c-42e1-983c-601c4409359d",
  "vehicle_id": "3d9d32ce-4cb1-4ce3-99de-cab16e9537e6",
  "type": "in",
  "id": "f9773f5e-3fcf-453a-8747-5ea8a3db662c",
  "created_at": "2020-07-09T22:18:04.000Z",
  "updated_at": "2020-07-09T22:18:04.000Z"
}
```

Made with ♥ by Lucas Arena :wave: [Get in touch!](https://www.linkedin.com/in/lucas-arena-771959136/)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
