const booksAPI = (() => {
  async function getBooks(): Promise<Book[] | void> {
    try {
      const response = await fetch("/books.json");
      const books = await response.json();

      return books;
    } catch (error) {
      console.log(error);
    }
  }

  return { getBooks };
})();

export default booksAPI;
