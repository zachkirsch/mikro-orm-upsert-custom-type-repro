## upsert() with custom type failure (`column.split is not a function`)

Issue: https://github.com/mikro-orm/mikro-orm/issues/6241

Repro:

1. In one terminal: `docker compose up`
2. In another terminal:
   ```
   npm install
   npm run test
   ```

Error:

```
% npm run test

> test
> jest

 FAIL  src/example.test.ts
  ✕ basic CRUD example (15 ms)

  ● basic CRUD example

    DriverException: column.split is not a function

      46 |
      47 | test("basic CRUD example", async () => {
    > 48 |   await orm.em.upsert(Person, {
         |   ^
      49 |     name: "John",
      50 |     homeAddress: {
      51 |       latitude: 0,

      at PostgreSqlExceptionConverter.convertException (node_modules/@mikro-orm/core/platforms/ExceptionConverter.js:8:16)
      at PostgreSqlExceptionConverter.convertException (node_modules/@mikro-orm/postgresql/PostgreSqlExceptionConverter.js:48:22)
      at PostgreSqlDriver.convertException (node_modules/@mikro-orm/core/drivers/DatabaseDriver.js:345:54)
      at node_modules/@mikro-orm/core/drivers/DatabaseDriver.js:349:24
      at PostgreSqlDriver.nativeUpdate (node_modules/@mikro-orm/knex/AbstractSqlDriver.js:504:19)
      at SqlEntityManager.upsert (node_modules/@mikro-orm/core/EntityManager.js:666:21)
      at Object.<anonymous> (src/example.test.ts:58:3)
      at node_modules/knex/lib/dialects/postgres/query/pg-querycompiler.js:162:20
          at Array.map (<anonymous>)
      at PostgreSqlQueryCompiler._merge (node_modules/knex/lib/dialects/postgres/query/pg-querycompiler.js:160:10)
      at PostgreSqlQueryCompiler.insert (node_modules/knex/lib/dialects/postgres/query/pg-querycompiler.js:36:19)
      at PostgreSqlQueryCompiler.toSQL (node_modules/knex/lib/query/querycompiler.js:75:29)
      at QueryBuilder_PostgreSQL.toSQL (node_modules/knex/lib/query/querybuilder.js:84:44)
      at QueryBuilder.toQuery (node_modules/@mikro-orm/knex/query/QueryBuilder.js:547:41)
      at QueryBuilder.execute (node_modules/@mikro-orm/knex/query/QueryBuilder.js:637:28)
      at PostgreSqlDriver.nativeUpdate (node_modules/@mikro-orm/knex/AbstractSqlDriver.js:504:41)
      at SqlEntityManager.upsert (node_modules/@mikro-orm/core/EntityManager.js:666:37)
      at Object.<anonymous> (src/example.test.ts:48:16)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        1.209 s, estimated 2 s
Ran all test suites.
```
