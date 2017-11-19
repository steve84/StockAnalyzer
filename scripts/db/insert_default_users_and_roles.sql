insert into trole (role_name) values ('Admin');
insert into trole (role_name) values ('GPU');
insert into trole (role_name) values ('Abo');

insert into tuser (email, username, password, salt, is_activated, role_id, created_at, activated_at) values ('admin@test.com', 'admin', 'S66lw6wqx8krty5MLuIHDjIY81Ba9Sq9zEIQewGQgi4=', 'xBtemUMbc2LXrShL7IU0QN93ZrL6AUuh', true, 1, CURRENT_DATE, CURRENT_DATE);
insert into tuser (email, username, password, salt, is_activated, role_id, created_at, activated_at) values ('gpu@test.com', 'gpu', 'O5SMJIP2XNgwDSVIFepSh5iA6cwPK7vP5xx8NEhgx4g', 'szRLzFIgDFniNnoXiLF6RfL3xbowMzfa', true, 2, CURRENT_DATE, CURRENT_DATE);
insert into tuser (email, username, password, salt, is_activated, role_id, created_at, activated_at) values ('abo@test.com', 'abo', 'q8fdhESQ9+9tr+Lwp/BnXahXTajcEHKGxAJUYXUDvPo=', '0OqIExrds26r7K6wTN5GEPCudGEWcWuE', true, 3, CURRENT_DATE, CURRENT_DATE);