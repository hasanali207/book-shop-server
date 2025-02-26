import { TBook } from "./book.interface";
import { bookModel } from "./book.model";

const createBookInDB = async (book: TBook) => {
    return await bookModel.create(book);
};

const getAllBooksfromDb = async (searchTerm: string) => {
    let filter = {};

    if (searchTerm) {
        filter = {
            $or: [
                { title: { $regex: searchTerm, $options: "i" } },
                { author: { $regex: searchTerm, $options: "i" } },
                { category: { $regex: searchTerm, $options: "i" } }
            ]
        };
    }

    return await bookModel.find(filter);
};

const getBookByIdFromDb = async (_id: string) => {
    return await bookModel.findById(_id);
};

const updateBookByIdFromDb = async (_id: string, book: Partial<TBook>) => {
    return await bookModel.findByIdAndUpdate(_id, book, { new: true });
};

const deleteBookByIdFromDb = async (_id: string) => {
    return await bookModel.findByIdAndDelete(_id);
};

export const bookService = {
    createBookInDB,
    getAllBooksfromDb,
    getBookByIdFromDb,
    updateBookByIdFromDb,
    deleteBookByIdFromDb
};
