export type Category = 'all' | 'special' | 'bunpho' | 'banhmi';

export type FoodItem = {
  id: string;
  name: string;
  nameEn?: string;
  kcal?: number;
  price: number;
  category: Category;
  image?: string;
  badges?: string[];
  isAvailable?: boolean;
};

export type CartItem = {
  item: FoodItem;
  quantity: number;
  note?: string;
};
