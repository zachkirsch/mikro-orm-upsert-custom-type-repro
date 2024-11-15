import {
  Entity,
  MikroORM,
  PostgreSqlDriver,
  PrimaryKey,
  Property,
  Unique,
} from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Point } from "./types/Point";
import { PointType } from "./types/PointType";

@Entity()
class Person {
  @PrimaryKey()
  id!: number;

  @Unique()
  @Property()
  name!: string;

  @Property({ type: PointType })
  homeAddress!: Point;
}

let orm: MikroORM;

beforeAll(async () => {
  orm = await MikroORM.init({
    driver: PostgreSqlDriver,
    dbName: "postgres",
    user: "postgres",
    password: "password",
    port: 1000,
    host: "localhost",
    entities: [Person],
    allowGlobalContext: true, // only for testing
    metadataProvider: TsMorphMetadataProvider,
  });
  await orm.schema.refreshDatabase();
});

afterAll(async () => {
  await orm.close(true);
});

test("basic CRUD example", async () => {
  await orm.em.upsert(Person, {
    name: "John",
    homeAddress: {
      latitude: 0,
      longitude: 0,
    },
  });
});
