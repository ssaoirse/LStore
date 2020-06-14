export class Product {
    id: number;
    name: String;
    description: String;
    original_price: number;
    discount_price: number;
    default_image: Array<String>;
    product_size: Array<String>;
    product_color: Array<String>;
    quantity: number;
    isWishlist: number;
    product_reviews:any;
    
    currency_symble:any;
    selected_color:any;
    selected_size:any;
}