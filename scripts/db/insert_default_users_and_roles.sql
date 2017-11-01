insert into trole (role_name) values ('Admin');
insert into trole (role_name) values ('GPU');
insert into trole (role_name) values ('Abo');

insert into tuser (username, password, is_activated, role_id, created_at, activated_at) values ('admin', 'admin', true, 1, CURRENT_DATE, CURRENT_DATE);
insert into tuser (username, password, is_activated, role_id, created_at, activated_at) values ('gpu', 'gpu', true, 2, CURRENT_DATE, CURRENT_DATE);
insert into tuser (username, password, is_activated, role_id, created_at, activated_at) values ('abo', 'abo', true, 3, CURRENT_DATE, CURRENT_DATE);