-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS & AUTH
-- ============================================
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone TEXT UNIQUE NOT NULL,
    name TEXT,
    role TEXT NOT NULL CHECK (role IN ('customer', 'restaurant', 'admin', 'rider')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RESTAURANTS
-- ============================================
CREATE TABLE public.restaurants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    cuisine_type TEXT,
    address TEXT NOT NULL,
    location_lat DECIMAL(10, 8) NOT NULL,
    location_lng DECIMAL(11, 8) NOT NULL,
    rating DECIMAL(2, 1) DEFAULT 0.0,
    rating_count INTEGER DEFAULT 0,
    is_open BOOLEAN DEFAULT true,
    min_order DECIMAL(10, 2) DEFAULT 0.00,
    delivery_fee DECIMAL(10, 2) DEFAULT 0.00,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MENU CATEGORIES
-- ============================================
CREATE TABLE public.menu_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MENU ITEMS
-- ============================================
CREATE TABLE public.menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.menu_categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RIDERS
-- ============================================
CREATE TABLE public.riders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    vehicle_type TEXT CHECK (vehicle_type IN ('bicycle', 'motorcycle', 'car')),
    is_available BOOLEAN DEFAULT true,
    current_location_lat DECIMAL(10, 8),
    current_location_lng DECIMAL(11, 8),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ORDERS
-- ============================================
CREATE TYPE order_status AS ENUM (
    'pending', 'confirmed', 'preparing', 'dispatched', 'delivered', 'cancelled'
);

CREATE TYPE payment_method AS ENUM (
    'card', 'ussd', 'transfer', 'wallet', 'voucher'
);

CREATE TYPE payment_status AS ENUM (
    'pending', 'paid', 'failed', 'refunded'
);

CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES public.users(id),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id),
    rider_id UUID REFERENCES public.riders(id),
    status order_status DEFAULT 'pending',
    subtotal DECIMAL(10, 2) NOT NULL,
    delivery_fee DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    delivery_address TEXT NOT NULL,
    delivery_lat DECIMAL(10, 8),
    delivery_lng DECIMAL(11, 8),
    payment_method payment_method NOT NULL,
    payment_status payment_status DEFAULT 'pending',
    flutterwave_tx_ref TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    confirmed_at TIMESTAMPTZ,
    preparing_at TIMESTAMPTZ,
    dispatched_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ
);

-- ============================================
-- ORDER ITEMS
-- ============================================
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    menu_item_id UUID NOT NULL REFERENCES public.menu_items(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    notes TEXT
);

-- ============================================
-- REVIEWS
-- ============================================
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id),
    customer_id UUID NOT NULL REFERENCES public.users(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(order_id) -- One review per order
);

-- ============================================
-- OTP TOKENS (for auth)
-- ============================================
CREATE TABLE public.otp_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone TEXT NOT NULL,
    token TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    attempts INTEGER DEFAULT 0,
    used BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_restaurants_location ON public.restaurants(location_lat, location_lng);
CREATE INDEX idx_restaurants_owner ON public.restaurants(owner_id);
CREATE INDEX idx_restaurants_cuisine ON public.restaurants(cuisine_type);
CREATE INDEX idx_restaurants_open ON public.restaurants(is_open);
CREATE INDEX idx_menu_items_restaurant ON public.menu_items(restaurant_id);
CREATE INDEX idx_menu_items_category ON public.menu_items(category_id);
CREATE INDEX idx_menu_categories_restaurant ON public.menu_categories(restaurant_id);
CREATE INDEX idx_orders_customer ON public.orders(customer_id);
CREATE INDEX idx_orders_restaurant ON public.orders(restaurant_id);
CREATE INDEX idx_orders_rider ON public.orders(rider_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_payment ON public.orders(payment_status);
CREATE INDEX idx_order_items_order ON public.order_items(order_id);
CREATE INDEX idx_riders_available ON public.riders(is_available);
CREATE INDEX idx_reviews_order ON public.reviews(order_id);
CREATE INDEX idx_otp_phone ON public.otp_tokens(phone);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.riders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_tokens ENABLE ROW LEVEL SECURITY;

-- Users: users can read their own data
CREATE POLICY "Users read own" ON public.users FOR SELECT USING (auth.uid() = id);

-- Restaurants: public read, restaurant owners write
CREATE POLICY "Restaurants public read" ON public.restaurants FOR SELECT USING (true);
CREATE POLICY "Restaurant owners update own" ON public.restaurants FOR UPDATE USING (auth.uid() = owner_id);

-- Menu categories: public read, restaurant owners manage
CREATE POLICY "Menu categories public read" ON public.menu_categories FOR SELECT USING (true);
CREATE POLICY "Restaurant owners manage categories" ON public.menu_categories FOR ALL USING (
    EXISTS (SELECT 1 FROM public.restaurants WHERE id = menu_categories.restaurant_id AND owner_id = auth.uid())
);

-- Menu items: public read
CREATE POLICY "Menu items public read" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "Restaurant owners manage menu" ON public.menu_items FOR ALL USING (
    EXISTS (SELECT 1 FROM public.restaurants WHERE id = menu_items.restaurant_id AND owner_id = auth.uid())
);

-- Orders: customers see own, restaurants see theirs
CREATE POLICY "Customers see own orders" ON public.orders FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Restaurants see their orders" ON public.orders FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.restaurants WHERE id = orders.restaurant_id AND owner_id = auth.uid())
);
CREATE POLICY "Riders see assigned orders" ON public.orders FOR SELECT USING (
    auth.uid() = rider_id OR EXISTS (SELECT 1 FROM public.riders WHERE user_id = auth.uid() AND id = orders.rider_id)
);

-- Order items: public read (for order tracking)
CREATE POLICY "Order items public read" ON public.order_items FOR SELECT USING (true);

-- Reviews: public read, customers create own
CREATE POLICY "Reviews public read" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Customers create own review" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Riders: public read for order tracking
CREATE POLICY "Riders public read" ON public.riders FOR SELECT USING (true);

-- OTP tokens: no public access (service role only)
CREATE POLICY "Service role only" ON public.otp_tokens FOR ALL USING (true);

-- ============================================
-- SEED DATA: 5 Restaurants with Menus
-- ============================================

-- Create owner users for restaurants
INSERT INTO public.users (id, phone, name, role) VALUES
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', '+2348012345678', 'Chioma Adebayo', 'restaurant'),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', '+2348098765432', 'Emeka Nwachukwu', 'restaurant'),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', '+2348055555555', 'Fatima Ibrahim', 'restaurant'),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', '+2348066666666', 'Segun Okonkwo', 'restaurant'),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', '+2348077777777', 'Adaobi Onyeka', 'restaurant');

-- Seed Restaurants
INSERT INTO public.restaurants (id, owner_id, name, description, cuisine_type, address, location_lat, location_lng, rating, rating_count, is_open, min_order, delivery_fee, image_url) VALUES
    ('b1c2d3e4-f5a6-4890-bcde-f23456789011', 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Chicken Republic', 'Authentic Nigerian fast food with a modern twist. Famous for our Jollof Rice and Grilled Chicken.', 'Nigerian', '15 Adeyemo Alakija Street, Victoria Island, Lagos', 6.4281, 3.4219, 4.5, 234, true, 2000, 500, 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789012', 'a1b2c3d4-e5f6-7890-abcd-ef1234567802', 'Baba Jollof', 'The heart of Nigerian cuisine. Our signature jollof rice is made with secret spices passed down generations.', 'Nigerian', '42 Lekki Road, Lekki Phase 1, Lagos', 6.4315, 3.4547, 4.7, 189, true, 1500, 400, 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789013', 'a1b2c3d4-e5f6-7890-abcd-ef1234567803', 'Taste of China', 'Premium Chinese cuisine in the heart of Lagos. From dim sum to signature stir-fry dishes.', 'Chinese', '10B Trans Amadi Road, Ikeja, Lagos', 6.5994, 3.3419, 4.3, 156, true, 2500, 600, 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789014', 'a1b2c3d4-e5f6-7890-abcd-ef1234567804', 'The Burger Joint', 'Crafted burgers with premium beef, fresh vegetables, and secret sauces. American style with Nigerian flavor.', 'American', '25 Admiralty Way, Lekki Phase 1, Lagos', 6.4297, 3.4521, 4.4, 98, true, 1800, 450, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789015', 'a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Amala Sky', 'Traditional Yoruba delicacies served in a modern setting. Try our signature amala with gizzard soup.', 'Yoruba', '88 Ojuelegba Road, Surulere, Lagos', 6.4928, 3.3216, 4.6, 167, true, 1200, 350, 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800');

-- Menu Categories for Chicken Republic
INSERT INTO public.menu_categories (id, restaurant_id, name, sort_order) VALUES
    ('c1d2e3f4-a5b6-4890-cdef-345678901201', 'b1c2d3e4-f5a6-4890-bcde-f23456789011', 'Proteins', 1),
    ('c1d2e3f4-a5b6-4890-cdef-345678901202', 'b1c2d3e4-f5a6-4890-bcde-f23456789011', 'Rice Dishes', 2),
    ('c1d2e3f4-a5b6-4890-cdef-345678901203', 'b1c2d3e4-f5a6-4890-bcde-f23456789011', 'Sides', 3),
    ('c1d2e3f4-a5b6-4890-cdef-345678901204', 'b1c2d3e4-f5a6-4890-bcde-f23456789011', 'Drinks', 4);

-- Menu Items for Chicken Republic
INSERT INTO public.menu_items (restaurant_id, category_id, name, description, price, image_url) VALUES
    ('b1c2d3e4-f5a6-4890-bcde-f23456789011', 'c1d2e3f4-a5b6-4890-cdef-345678901201', 'Grilled Chicken (Half)', 'Half grilled chicken with our special marinade', 2500, 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789011', 'c1d2e3f4-a5b6-4890-cdef-345678901201', 'Grilled Chicken (Full)', 'Full grilled chicken with our special marinade', 4500, 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789011', 'c1d2e3f4-a5b6-4890-cdef-345678901201', 'Crispy Chicken Wings', '6 pieces of spicy crispy wings', 1800, 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789011', 'c1d2e3f4-a5b6-4890-cdef-345678901201', 'Chicken Nuggets', '10 pieces golden crispy nuggets with dipping sauce', 1500, 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789011', 'c1d2e3f4-a5b6-4890-cdef-345678901202', 'Jollof Rice', 'Our signature jollof rice with grilled chicken', 2000, 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789011', 'c1d2e3f4-a5b6-4890-cdef-345678901202', 'Fried Rice', 'Nigerian fried rice with mixed vegetables', 1800, 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789011', 'c1d2e3f4-a5b6-4890-cdef-345678901202', 'Coconut Rice', 'Fragrant coconut rice with tender chicken', 2200, 'https://images.unsplash.com/photo-1604497181018-92e8ce1a67d8?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789011', 'c1d2e3f4-a5b6-4890-cdef-345678901203', 'Coleslaw', 'Creamy fresh coleslaw', 500, 'https://images.unsplash.com/photo-1625938145744-e380515399bf?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789011', 'c1d2e3f4-a5b6-4890-cdef-345678901203', 'Plantain', 'Sweet fried plantain', 400, 'https://images.unsplash.com/photo-1595856619767-ab639f5873b7?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789011', 'c1d2e3f4-a5b6-4890-cdef-345678901203', 'Yam Chips', 'Crispy fried yam chips', 600, 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789011', 'c1d2e3f4-a5b6-4890-cdef-345678901204', 'Chapman', 'Nigerian signature citrus drink', 800, 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789011', 'c1d2e3f4-a5b6-4890-cdef-345678901204', 'Zobo', 'Hibiscus drink with ginger', 500, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789011', 'c1d2e3f4-a5b6-4890-cdef-345678901204', 'Bottled Water', 'Pure water 75cl', 200, 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400');

-- Menu Categories for Baba Jollof
INSERT INTO public.menu_categories (id, restaurant_id, name, sort_order) VALUES
    ('c1d2e3f4-a5b6-4890-cdef-345678901211', 'b1c2d3e4-f5a6-4890-bcde-f23456789012', 'Rice Dishes', 1),
    ('c1d2e3f4-a5b6-4890-cdef-345678901212', 'b1c2d3e4-f5a6-4890-bcde-f23456789012', 'Proteins', 2),
    ('c1d2e3f4-a5b6-4890-cdef-345678901213', 'b1c2d3e4-f5a6-4890-bcde-f23456789012', 'Swallows', 3);

-- Menu Items for Baba Jollof
INSERT INTO public.menu_items (restaurant_id, category_id, name, description, price, image_url) VALUES
    ('b1c2d3e4-f5a6-4890-bcde-f23456789012', 'c1d2e3f4-a5b6-4890-cdef-345678901211', 'Party Jollof Rice', 'Our famous party jollof with smoky flavor', 2500, 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789012', 'c1d2e3f4-a5b6-4890-cdef-345678901211', 'Fried Rice', 'Classic Nigerian fried rice', 2000, 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789012', 'c1d2e3f4-a5b6-4890-cdef-345678901211', 'Waakye', 'Rice and beans with special condiments', 1800, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789012', 'c1d2e3f4-a5b6-4890-cdef-345678901212', 'Grilled Turkey', 'Smoky grilled turkey leg', 3500, 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789012', 'c1d2e3f4-a5b6-4890-cdef-345678901212', 'Peppered Goat', 'Spicy grilled goat meat', 4000, 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789012', 'c1d2e3f4-a5b6-4890-cdef-345678901212', 'Smoked Catfish', 'Grilled catfish with pepper sauce', 2800, 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789012', 'c1d2e3f4-a5b6-4890-cdef-345678901213', 'Amala', 'Smooth yam flour swallow', 1000, 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789012', 'c1d2e3f4-a5b6-4890-cdef-345678901213', 'Pounded Yam', 'Smooth pounded yam', 1200, 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789012', 'c1d2e3f4-a5b6-4890-cdef-345678901213', 'Semo', 'Semolina swallow', 800, 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400');

-- Menu Categories for Taste of China
INSERT INTO public.menu_categories (id, restaurant_id, name, sort_order) VALUES
    ('c1d2e3f4-a5b6-4890-cdef-345678901221', 'b1c2d3e4-f5a6-4890-bcde-f23456789013', 'Dim Sum', 1),
    ('c1d2e3f4-a5b6-4890-cdef-345678901222', 'b1c2d3e4-f5a6-4890-bcde-f23456789013', 'Main Course', 2),
    ('c1d2e3f4-a5b6-4890-cdef-345678901223', 'b1c2d3e4-f5a6-4890-bcde-f23456789013', 'Noodles', 3);

-- Menu Items for Taste of China
INSERT INTO public.menu_items (restaurant_id, category_id, name, description, price, image_url) VALUES
    ('b1c2d3e4-f5a6-4890-bcde-f23456789013', 'c1d2e3f4-a5b6-4890-cdef-345678901221', 'Pork Dumplings', '4 pieces steamed dumplings', 2000, 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789013', 'c1d2e3f4-a5b6-4890-cdef-345678901221', 'Siu Mai', '4 pieces shrimp and pork dumplings', 2200, 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789013', 'c1d2e3f4-a5b6-4890-cdef-345678901221', 'Spring Rolls', '3 pieces vegetable spring rolls', 1500, 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789013', 'c1d2e3f4-a5b6-4890-cdef-345678901222', 'Sweet & Sour Chicken', 'Crispy chicken in sweet and sour sauce', 3500, 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789013', 'c1d2e3f4-a5b6-4890-cdef-345678901222', 'Kung Pao Chicken', 'Spicy chicken with peanuts', 3800, 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789013', 'c1d2e3f4-a5b6-4890-cdef-345678901222', 'Beef with Broccoli', 'Tender beef with fresh broccoli', 4000, 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789013', 'c1d2e3f4-a5b6-4890-cdef-345678901223', 'Chicken Chow Mein', 'Stir-fried noodles with chicken', 3000, 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789013', 'c1d2e3f4-a5b6-4890-cdef-345678901223', 'Singapore Noodles', 'Curry-flavored rice noodles with shrimp', 3200, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400');

-- Menu Categories for The Burger Joint
INSERT INTO public.menu_categories (id, restaurant_id, name, sort_order) VALUES
    ('c1d2e3f4-a5b6-4890-cdef-345678901231', 'b1c2d3e4-f5a6-4890-bcde-f23456789014', 'Burgers', 1),
    ('c1d2e3f4-a5b6-4890-cdef-345678901232', 'b1c2d3e4-f5a6-4890-bcde-f23456789014', 'Sides', 2),
    ('c1d2e3f4-a5b6-4890-cdef-345678901233', 'b1c2d3e4-f5a6-4890-bcde-f23456789014', 'Drinks', 3);

-- Menu Items for The Burger Joint
INSERT INTO public.menu_items (restaurant_id, category_id, name, description, price, image_url) VALUES
    ('b1c2d3e4-f5a6-4890-bcde-f23456789014', 'c1d2e3f4-a5b6-4890-cdef-345678901231', 'Classic Cheeseburger', 'Beef patty with cheddar cheese, lettuce, tomato', 2800, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789014', 'c1d2e3f4-a5b6-4890-cdef-345678901231', 'Double Stack', 'Two beef patties with double cheese', 4000, 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789014', 'c1d2e3f4-a5b6-4890-cdef-345678901231', 'Spicy Jalapeño Burger', 'Beef patty with pepper jack, jalapeños, chipotle mayo', 3200, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789014', 'c1d2e3f4-a5b6-4890-cdef-345678901231', 'Chicken Burger', 'Grilled chicken breast with mayo and lettuce', 2600, 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789014', 'c1d2e3f4-a5b6-4890-cdef-345678901232', 'French Fries', 'Classic crispy fries with seasoning', 800, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789014', 'c1d2e3f4-a5b6-4890-cdef-345678901232', 'Onion Rings', 'Golden crispy onion rings', 900, 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789014', 'c1d2e3f4-a5b6-4890-cdef-345678901233', 'Coca Cola', 'Classic Coca Cola 50cl', 400, 'https://images.unsplash.com/photo-1629203852172-9f7625b8e5ae?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789014', 'c1d2e3f4-a5b6-4890-cdef-345678901233', 'Milkshake Vanilla', 'Creamy vanilla milkshake', 1200, 'https://images.unsplash.com/photo-1572490121845-2fcc2d6451c2?w=400');

-- Menu Categories for Amala Sky
INSERT INTO public.menu_categories (id, restaurant_id, name, sort_order) VALUES
    ('c1d2e3f4-a5b6-4890-cdef-345678901241', 'b1c2d3e4-f5a6-4890-bcde-f23456789015', 'Amala Dishes', 1),
    ('c1d2e3f4-a5b6-4890-cdef-345678901242', 'b1c2d3e4-f5a6-4890-bcde-f23456789015', 'Soups', 2),
    ('c1d2e3f4-a5b6-4890-cdef-345678901243', 'b1c2d3e4-f5a6-4890-bcde-f23456789015', 'Rice Dishes', 3);

-- Menu Items for Amala Sky
INSERT INTO public.menu_items (restaurant_id, category_id, name, description, price, image_url) VALUES
    ('b1c2d3e4-f5a6-4890-bcde-f23456789015', 'c1d2e3f4-a5b6-4890-cdef-345678901241', 'Amala with Gizzard Soup', 'Smooth yam flour with peppered gizzard soup', 1800, 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789015', 'c1d2e3f4-a5b6-4890-cdef-345678901241', 'Amala with Ewedu', 'Smooth yam flour with jute leaves soup', 1600, 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789015', 'c1d2e3f4-a5b6-4890-cdef-345678901241', 'Pounded Yam with Egusi', 'Smooth pounded yam with melon soup', 2000, 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789015', 'c1d2e3f4-a5b6-4890-cdef-345678901242', 'Gizzard Soup', 'Peppered gizzard soup with locust beans', 1200, 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789015', 'c1d2e3f4-a5b6-4890-cdef-345678901242', 'Egusi Soup', 'Melon seed soup with leafy greens', 1000, 'https://images.unsplash.com/photo-1579541814924-49fef17c4ebf?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789015', 'c1d2e3f4-a5b6-4890-cdef-345678901242', 'Banga Soup', 'Palm nut soup with catfish', 1500, 'https://images.unsplash.com/photo-1571700614791-6d32c4f97c6b?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789015', 'c1d2e3f4-a5b6-4890-cdef-345678901243', 'Jollof Rice', 'Nigerian party jollof rice', 2200, 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400'),
    ('b1c2d3e4-f5a6-4890-bcde-f23456789015', 'c1d2e3f4-a5b6-4890-cdef-345678901243', 'Fried Rice', 'Classic Nigerian fried rice', 2000, 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400');

-- Create a sample rider
INSERT INTO public.users (id, phone, name, role) VALUES
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567899', '+2348088888888', 'Chidi Okafor', 'rider');

INSERT INTO public.riders (user_id, name, phone, vehicle_type, is_available) VALUES
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567899', 'Chidi Okafor', '+2348088888888', 'motorcycle', true);