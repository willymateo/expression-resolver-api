# expression-resolver-api

<p align="center">

[![Run unit tests](https://github.com/willymateo/expression-resolver-api/actions/workflows/unit-tests.yml/badge.svg)](https://github.com/willymateo/expression-resolver-api/actions/workflows/unit-tests.yml)
[![Run end-to-end tests](https://github.com/willymateo/expression-resolver-api/actions/workflows/e2e-tests.yml/badge.svg)](https://github.com/willymateo/expression-resolver-api/actions/workflows/e2e-tests.yml)

</p>

This API is capable of resolving basic mathematical expresssions in a string

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API documentation

### Resolve a mathematical expression in a string

```http
POST /math/resolve
```

#### Request - Body

```json
{
  "mathExpression": "10 * (2 + 5) * 10"
}
```

#### Response

```json
{
  "result": 700
}
```
