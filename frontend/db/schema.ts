import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  name: text('name'),
  username: text('username')
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  imageUrl: text('imageUrl').notNull(),
  price: text('price').notNull(),
  stock: text('stock').notNull(),
  availableAt: text('availableAt').notNull(),
  status: text('status').notNull()
});
