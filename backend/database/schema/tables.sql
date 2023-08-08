CREATE TABLE IF NOT EXISTS transaction_item (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL CHECK (type IN ('increase', 'decrease')),
    name TEXT NOT NULL,
    price INTEGER
);

CREATE TABLE IF NOT EXISTS transaction_item_tier (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_item_id INTEGER NOT NULL,
    tier TEXT NOT NULL,
    price INTEGER NOT NULL,

    FOREIGN KEY (transaction_item_id) REFERENCES transaction_item(id)
);

CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    transaction_item_tier_id INTEGER,

    FOREIGN KEY (transaction_item_tier_id) REFERENCES transaction_item_tier(id)
);

INSERT INTO transaction_item (id, type, name, price) VALUES (1, 'increase', 'Cake', 100);
INSERT INTO transaction_item_tier (id, transaction_item_id, tier, price) VALUES (1, 1, 'Slice', 80);
INSERT INTO transaction_item_tier (id, transaction_item_id, tier, price) VALUES (10, 1, 'Half', 150);
INSERT INTO transaction_item_tier (id, transaction_item_id, tier, price) VALUES (11, 1, 'Half', 150);


INSERT INTO transaction_item (id, type, name, price) VALUES (2, 'decrease', 'Pizza', 50);
INSERT INTO transaction_item_tier (id, transaction_item_id, tier, price) VALUES (2, 2, 'Slice', 80);

INSERT INTO transaction_item (id, type, name, price) VALUES (3, 'increase', 'Sex', 75);
INSERT INTO transaction_item_tier (id, transaction_item_id, tier, price) VALUES (3, 3, 'Hour', 100);

INSERT INTO transaction_item (id, type, name, price) VALUES (4, 'decrease', 'Pie', 30);
INSERT INTO transaction_item_tier (id, transaction_item_id, tier, price) VALUES (4, 4, 'Slice', 80);

INSERT INTO transaction_item (id, type, name, price) VALUES (5, 'increase', 'Pineapple', 120);
INSERT INTO transaction_item_tier (id, transaction_item_id, tier, price) VALUES (5, 5, 'Slice', 80);


INSERT INTO transaction_item (id, type, name, price) VALUES (6, 'decrease', 'Boat', 40);
INSERT INTO transaction_item_tier (id, transaction_item_id, tier, price) VALUES (6, 6, 'Hour', 100);

INSERT INTO transaction_item (id, type, name, price) VALUES (7, 'increase', 'Gnome', 90);
INSERT INTO transaction_item_tier (id, transaction_item_id, tier, price) VALUES (7, 7, 'Hour', 100);
INSERT INTO transaction_item (id, type, name, price) VALUES (8, 'decrease', 'BoatGnome', 60);
INSERT INTO transaction_item_tier (id, transaction_item_id, tier, price) VALUES (8, 8, 'Hour', 100);

insert into transactions (id, transaction_item_tier_id) VALUES (1, 1);
insert into transactions (id, transaction_item_tier_id) VALUES (2, 2);
insert into transactions (id, transaction_item_tier_id) VALUES (3, 3);
insert into transactions (id, transaction_item_tier_id) VALUES (4, 4);
insert into transactions (id, transaction_item_tier_id) VALUES (5, 5);
insert into transactions (id, transaction_item_tier_id) VALUES (6, 6);
insert into transactions (id, transaction_item_tier_id) VALUES (7, 7);
insert into transactions (id, transaction_item_tier_id) VALUES (8, 8);
