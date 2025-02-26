import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { bookService } from './book.service';
import { bookSchemaValidation } from './book.validation';

const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = req.body;

    // Validate the book data using Zod
    const validatedBook = bookSchemaValidation.parse(book);

    // Save the book in the database
    const result = await bookService.createBookInDB(validatedBook);

    res.status(201).json({
      message: 'Book created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        success: false,
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    res.status(500).json({
      message: 'An error occurred while creating the book',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await bookService.getAllBooksfromDb(searchTerm as string);
    
    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching books',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await bookService.getBookByIdFromDb(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching book',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;
    const result = await bookService.updateBookByIdFromDb(productId, updatedData);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.json({
      message: 'Book updated successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while updating book',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await bookService.deleteBookByIdFromDb(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      message: 'Book deleted successfully',
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while deleting book',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Export controller
export const bookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
