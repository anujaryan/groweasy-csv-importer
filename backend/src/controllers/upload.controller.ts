import { Request, Response } from "express";
import { parseCSV } from "../parser/csvParser";
import { extractCRM } from "../services/ai.service";

/**
 * Preview uploaded CSV
 */
export const previewCSV = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "No CSV uploaded",
      });
      return;
    }

    const rows = await parseCSV(req.file.buffer);

    res.status(200).json({
      success: true,
      headers: Object.keys(rows[0] || {}),
      totalRows: rows.length,
      preview: rows.slice(0, 20),
    });
  } catch (error) {
    console.error("Preview Error:", error);

    res.status(500).json({
      success: false,
      message: "CSV Parsing Failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Import CSV using AI
 */
export const importCSV = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
      return;
    }

    const rows = await parseCSV(req.file.buffer);

    if (rows.length === 0) {
      res.status(400).json({
        success: false,
        message: "CSV is empty",
      });
      return;
    }

    const result = await extractCRM(rows);

    res.status(200).json({
      success: true,
      totalRecords: rows.length,
      imported: result,
    });
  } catch (error) {
    console.error("Import Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to import CSV",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};