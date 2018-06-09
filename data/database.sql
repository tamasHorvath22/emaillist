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

