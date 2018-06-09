CREATE TABLE public.users
(
);
ALTER TABLE public.users ADD id SERIAL NOT NULL;
CREATE UNIQUE INDEX users_id_uindex ON public.users (id);
ALTER TABLE public.users ADD CONSTRAINT users_id_pk PRIMARY KEY (id);

ALTER TABLE public.users ADD username VARCHAR NOT NULL;
CREATE UNIQUE INDEX users_username_uindex ON public.users (username);

ALTER TABLE public.users ADD password VARCHAR NOT NULL;

CREATE TABLE public.token
(
);

ALTER TABLE public.token ADD id SERIAL NOT NULL;
CREATE UNIQUE INDEX token_id_uindex ON public.token (id);
ALTER TABLE public.token ADD CONSTRAINT token_id_pk PRIMARY KEY (id);

ALTER TABLE public.token ADD token VARCHAR NOT NULL;
CREATE UNIQUE INDEX token_token_uindex ON public.token (token);

CREATE TABLE public.email_list
(
);
ALTER TABLE public.email_list ADD id SERIAL NOT NULL;
CREATE UNIQUE INDEX email_list_id_uindex ON public.email_list (id);
ALTER TABLE public.email_list ADD CONSTRAINT email_list_id_pk PRIMARY KEY (id);
ALTER TABLE public.email_list ADD first_name VARCHAR NOT NULL;
ALTER TABLE public.email_list ADD last_name VARCHAR NOT NULL;
ALTER TABLE public.email_list ADD email VARCHAR NOT NULL;
CREATE UNIQUE INDEX email_list_email_uindex ON public.email_list (email);
ALTER TABLE public.email_list ADD phone VARCHAR NULL;