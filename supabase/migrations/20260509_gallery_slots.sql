insert into public.site_images (slot, label, image_url, alt_text, sort_order, is_active)
values
('gallery_01','Gallery 01','/images/Gallery/1.jpg','Sealcoating',201,true),
('gallery_02','Gallery 02','/images/Gallery/2.jpg','Crack Filling',202,true),
('gallery_03','Gallery 03','/images/Gallery/3.jpg','Masonry',203,true),
('gallery_04','Gallery 04','/images/Gallery/4.jpg','Concrete',204,true),
('gallery_05','Gallery 05','/images/Gallery/5.jpg','Residential',205,true),
('gallery_06','Gallery 06','/images/Gallery/6.jpg','Before & After',206,true),
('gallery_07','Gallery 07','/images/Gallery/7.jpg','Stonework',207,true),
('gallery_08','Gallery 08','/images/Gallery/8.jpg','Driveways',208,true),
('gallery_09','Gallery 09','/images/Gallery/9.jpg','Sealcoating',209,true),
('gallery_10','Gallery 10','/images/Gallery/10.jpg','Masonry',210,true)
on conflict (slot) do nothing;
