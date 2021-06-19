# STAR WARS API

## Description

REST API built using [Nest](https://github.com/nestjs/nest) for managing character list of starwars universe. 
It can run serverless using [AWS](https://aws.amazon.com/lambda) and [Serverless](https://www.serverless.com/framework/docs/providers/aws/).

### Prerequisites

- [Node](https://nodejs.org/en/)
- [yarn](https://classic.yarnpkg.com/en/docs/install)
- [Nest](https://github.com/nestjs/nest)
- [AWS CLI](https://github.com/nestjs/nest) - optional

## Installation

```bash
$ yarn install
```

## AWS Lambda

To deploy the application on [AWS Lambda](https://aws.amazon.com/lambda) you need to set up AWS credentials for example
using [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html).

More advanced guide can be found on [Serverless DOCS](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/).

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

# serverless locally
$ yarn run sls:offline
```

## Deploy the app

```bash
# deploying app to aws
$ yarn run deploy
```

## Running tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```