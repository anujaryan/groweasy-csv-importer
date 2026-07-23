import csv from "csv-parser";
import { Readable } from "stream";

export const parseCSV = (
  buffer: Buffer
): Promise<Record<string, string>[]> => {
  return new Promise((resolve, reject) => {
    const rows: Record<string, string>[] = [];

    Readable.from(buffer)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
};