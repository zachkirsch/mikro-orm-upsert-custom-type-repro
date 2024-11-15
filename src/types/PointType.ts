import { Type } from "@mikro-orm/postgresql";
import { Point } from "./Point";

export class PointType extends Type<Point | undefined, string | undefined> {
  convertToDatabaseValue(value: Point | undefined): string | undefined {
    if (!value) {
      return value;
    }

    return `SRID=4326;POINT(${value.longitude} ${value.latitude})`;
  }

  convertToJSValue(value: unknown): Point | undefined {
    if (typeof value !== "string") {
      return undefined;
    }

    const match = value.match(/POINT\(([^ ]+) ([^ ]+)\)/);

    if (match == null) {
      return undefined;
    }
    const [_, longitude, latitude] = match;
    if (latitude == null || longitude == null) {
      return undefined;
    }

    return new Point(parseFloat(latitude), parseFloat(longitude));
  }

  convertToJSValueSQL(key: string): string {
    return `ST_AsText(${key})`;
  }

  convertToDatabaseValueSQL(key: string): string {
    return `ST_GeomFromText(${key}, 4326)`;
  }

  getColumnType(): string {
    return "geometry(Point, 4326)";
  }
}
