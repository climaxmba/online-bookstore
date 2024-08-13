type Category = "Fiction" | "Adventure" | "Mystery" | "History"

interface Review {
  author: string;
  message: string;
  rating: number;
}

interface Book {
  id: string;
  title: string;
  rating: number;
  reviews: Review[] | [];
  author: string;
  price: number;
  category: Category;
  isTrending: boolean;
  image: string;
  discount: number;
}

interface CartItem {
  item: Book;
  quantity: number;
}
