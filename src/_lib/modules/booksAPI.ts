const booksAPI = (() => {
  const cache: { [key: string]: unknown } = {};

  async function _resource(URL: string) {
    if (cache[URL]) return Promise.resolve(cache[URL]);

    try {
      const response = await fetch(URL);
      const result = await response.json();
      cache[URL] = result;

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async function getBooks(): Promise<Book[] | []> {
    try {
      const books = (await _resource("/books.json")) as Book[] | [];
      return books;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  async function getTrendingBooks(): Promise<Book[] | []> {
    try {
      const books = await getBooks();
      return books.filter((book) => book.isTrending);
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  async function getBookById(id: string): Promise<Book | void> {
    try {
      const books = (await _resource("/books.json")) as Book[] | [];
      return books[parseInt(id)];
    } catch (error) {
      console.log(error);
    }
  }

  async function getBooksByCategory(category: string): Promise<Book[] | []> {
    try {
      const books = await getBooks();
      return books.filter((book) => book.category === category);
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  async function getFeaturedBooks(): Promise<Book[] | []> {
    try {
      const books = (await _resource("/featuredBooks.json")) as Book[] | [];
      return books;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  return {
    getBooks,
    getBookById,
    getBooksByCategory,
    getTrendingBooks,
    getFeaturedBooks,
  };
})();

export default booksAPI;
