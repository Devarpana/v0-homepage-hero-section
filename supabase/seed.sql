-- Optional: the demo catalogue the site shipped with, so an empty store isn't blank.
-- Only inserts when the products table is empty. Run after 0001_storefront.sql.

insert into public.products (name, category, price, stock, description, specs, status, featured, trending, visibility)
select v.name, v.category, v.price, 25, v.description, v.specs, 'active', v.featured, v.trending, 'public'
from (values
  ('Modular Desk Organizer', 'Daily Essentials', 1299, 'Keep your workspace organized and stylish with a precision 3D-printed modular organizer. Customizable to your needs and built to last.', false, true, E'Dimensions: 15 × 8 × 4 cm\nWeight: 220g\nPrint Time: 8 Hours'),
  ('Phone Stand Pro',        'Daily Essentials',  799, 'A sturdy, adjustable phone stand printed in durable PLA+.', false, false, null),
  ('Geometric Planter',      'Home Decor',       1599, 'A faceted planter that turns any shelf into a statement piece.', false, false, null),
  ('Articulated Dragon',     'Toys',             4999, 'A fully articulated dragon, printed in one piece with flexible joints. Each segment moves fluidly and is finished with meticulous care.', true, true, null),
  ('Headphone Holder',       'Daily Essentials',  549, 'Free up your desk with a clean, minimal headphone holder.', false, false, null),
  ('Custom Nameplate',       'Custom',           2299, 'A personalised nameplate for your desk or door. Tell us the text and colours.', false, false, null),
  ('Cable Organizer Pro',    'Daily Essentials',  899, 'Tame desk cable clutter with snap-in channels for up to six cables.', false, true, null),
  ('Decorative Lamp Base',   'Home Decor',       2899, 'A translucent lamp base that diffuses light into warm patterns.', false, false, null),
  ('Wall Shelf Bracket',     'Home Decor',       1199, 'Minimal floating shelf brackets, sold as a pair.', false, false, null),
  ('Fidget Toy Spinner',     'Toys',              499, 'A smooth, quiet spinner with a long spin time.', false, true, null),
  ('Articulated Keychain',   'Toys',              399, 'A tiny articulated keychain companion.', false, false, null),
  ('Designer Pen Holder',    'Daily Essentials', 1099, 'A sculptural pen holder for the tidy desk.', false, false, null)
) as v(name, category, price, description, featured, trending, specs)
where not exists (select 1 from public.products);
