INSERT INTO cards (filename) VALUES ('Oh_noo.jpg');
INSERT INTO cards (filename) VALUES ('ice_boy.jpg');
INSERT INTO cards (filename) VALUES ('sol_1.jpg');
INSERT INTO cards (filename) VALUES ('acceptable_loss.jpg');
INSERT INTO cards (filename) VALUES ('icy_boio.jpg');
INSERT INTO cards (filename) VALUES ('sol_2.jpg');
INSERT INTO cards (filename) VALUES ('art.jpg');
INSERT INTO cards (filename) VALUES ('med.jpg');
INSERT INTO cards (filename) VALUES ('sol_3.jpg');
INSERT INTO cards (filename) VALUES ('blood_boi.jpg');
INSERT INTO cards (filename) VALUES ('nano.jpg');
INSERT INTO cards (filename) VALUES ('sol_4.jpg');
INSERT INTO cards (filename) VALUES ('blood_kindling.jpg');
INSERT INTO cards (filename) VALUES ('negative_pboy.jpg');
INSERT INTO cards (filename) VALUES ('sol_5.jpg');
INSERT INTO cards (filename) VALUES ('boom.jpg');
INSERT INTO cards (filename) VALUES ('nov_1.jpg');
-- INSERT INTO cards (filename) VALUES ('soldier1.jpg'); --duplicate of sol_2
INSERT INTO cards (filename) VALUES ('cannon_boi.jpg');
INSERT INTO cards (filename) VALUES ('nov_2.jpg');
INSERT INTO cards (filename) VALUES ('spy_boy.jpg');
INSERT INTO cards (filename) VALUES ('cloner.jpg');
INSERT INTO cards (filename) VALUES ('p_boy.jpg');
INSERT INTO cards (filename) VALUES ('tax.jpg');
INSERT INTO cards (filename) VALUES ('combat_stims.jpg');
INSERT INTO cards (filename) VALUES ('ram_1.jpg');
INSERT INTO cards (filename) VALUES ('teleporter.jpg');
INSERT INTO cards (filename) VALUES ('drop_troops.jpg');
INSERT INTO cards (filename) VALUES ('ram_2.jpg');
INSERT INTO cards (filename) VALUES ('trench_boy.jpg');
INSERT INTO cards (filename) VALUES ('giga_mech.jpg');
INSERT INTO cards (filename) VALUES ('ram_3.jpg');
INSERT INTO cards (filename) VALUES ('turret.jpg');
INSERT INTO cards (filename) VALUES ('gold_1.jpg');
INSERT INTO cards (filename) VALUES ('red.jpg');
INSERT INTO cards (filename) VALUES ('ucf_vulcan.jpg');
INSERT INTO cards (filename) VALUES ('gold_2.jpg');
INSERT INTO cards (filename) VALUES ('rus_1.jpg');
INSERT INTO cards (filename) VALUES ('venice_2.jpg');
INSERT INTO cards (filename) VALUES ('gold_3.jpg');
INSERT INTO cards (filename) VALUES ('rus_2.jpg');
INSERT INTO cards (filename) VALUES ('vervaardiger.jpg');
INSERT INTO cards (filename) VALUES ('gold_option.jpg');
INSERT INTO cards (filename) VALUES ('sacr_2.jpg');
INSERT INTO cards (filename) VALUES ('void_2.jpg');
INSERT INTO cards (filename) VALUES ('gun_boi.jpg');
INSERT INTO cards (filename) VALUES ('sad.jpg');
INSERT INTO cards (filename) VALUES ('witch_hunter.jpg');
INSERT INTO cards (filename) VALUES ('hazard.jpg');
INSERT INTO cards (filename) VALUES ('sang_gen.jpg');

INSERT INTO deck (name) VALUES ('BloodBoys');
INSERT INTO deck (name) VALUES ('Rams');
INSERT INTO deck (name) VALUES ('VOC');
INSERT INTO deck (name) VALUES ('UCF');
INSERT INTO deck (name) VALUES ('Moskovow');
INSERT INTO deck (name) VALUES ('MSRV');
INSERT INTO deck (name) VALUES ('Novograd');
INSERT INTO deck (name) VALUES ('GoldBoys');
-- this will put 4 as the quantity for all the dup cards. this setup lets you change it for individual decks if you want.
INSERT INTO decksetup (cardid, quantity, deckid)
SELECT cards.cardid, 4 AS quantity, decks.deckid
FROM (SELECT 3 AS cardid UNION ALL
      SELECT 6 UNION ALL
      SELECT 9 UNION ALL
      SELECT 12 UNION ALL
      SELECT 15 UNION ALL
      SELECT 19 UNION ALL --cannon boys
      SELECT 22 UNION ALL --cloner
      SELECT 27 UNION ALL
      SELECT 33) AS cards
CROSS JOIN deck AS decks;

INSERT INTO decksetup (cardid, quantity, deckid) VALUES (1, 1, 7);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (2, 2, 5); --icyboys mosk
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (4, 2, 4);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (5, 2, 5);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (7, 2, 8); --gold
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (8, 2, 6); --venice
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (10, 3, 1); --blood
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (11, 2, 4);  --ucf
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (13, 2, 1);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (14, 2, 7); --nov
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (16, 1, 6);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (17, 1, 7);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (20, 1, 7);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (21, 3, 6);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (23, 3, 7);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (24, 4, 4);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (25, 2, 3); --VOC
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (26, 1, 2); --rams
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (28, 4, 3);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (29, 1, 2);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (30, 4, 2);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (31, 1, 4); --GIGAMECH
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (32, 1, 2);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (34, 1, 8);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (35, 1, 7);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (36, 1, 4);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (37, 1, 8);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (38, 1, 5);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (39, 1, 6);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (40, 1, 8);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (41, 1, 5);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (42, 1, 3);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (43, 1, 8);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (44, 2, 8);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (45, 3, 3);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (46, 2, 6);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (47, 2, 7);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (48, 1, 2);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (49, 2, 3);
INSERT INTO decksetup (cardid, quantity, deckid) VALUES (50, 2, 1);

-- for cardTypes
INSERT INTO cardType (name) VALUES ('Turret');
INSERT INTO cardType (name) VALUES ('Teleporter');
INSERT INTO cardType (name) VALUES ('Special');
INSERT INTO cardType (name) VALUES ('Value');
INSERT INTO cardType (name) VALUES ('Cloner');

INSERT INTO cardInputData (description) VALUES
('none'),
('singleCardPlayerHand'),
('singleCardPlayerPlayArea'),
('singleCardHalfValue'),
('SinglePlayerAnyNumberCardsHand');