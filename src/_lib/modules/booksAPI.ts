const booksAPI = (() => {
  async function getBooks(): Promise<Book[] | []> {
    try {
      const response = await fetch("/books.json");
      const books: Book[] | [] = await response.json();

      return books;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  return { getBooks };
})();

export default booksAPI;
