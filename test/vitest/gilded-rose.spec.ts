import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('diminue sellIn et quality chaque jour pour un article normal', () => {
    const croissantSec = new Item('Croissant sec de la veille', 10, 20);
    const gildedRose = new GildedRose([croissantSec]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].sellIn).toBe(9);
    expect(gildedRose.items[0].quality).toBe(19);
  });

  it('dégrade la qualité 2 fois plus rapidement après la date de péremption', () => {
    const croissantSec = new Item('Croissant sec de la veille', 0, 20);
    const gildedRose = new GildedRose([croissantSec]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(18);
  });

  it('la qualité ne peut pas être négative', () => {
    const croissantSec = new Item('Croissant sec de la veille', 10, 0);
    const gildedRose = new GildedRose([croissantSec]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(0);
  });
});

describe('Gilded Rose - Aged Brie', () => {
  it('gagne en qualité avec le temps', () => {
    const agedBrie = new Item('Aged Brie', 10, 20);
    const gildedRose = new GildedRose([agedBrie]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(21);
  });

  it('a jamais plus de 50 en qualité', () => {
    const agedBrie = new Item('Aged Brie', 10, 50);
    const gildedRose = new GildedRose([agedBrie]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(50);
  });

  it('continue à gagner en qualité même périmé', () => {
    const agedBrie = new Item('Aged Brie', 0, 20);
    const gildedRose = new GildedRose([agedBrie]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(22);
  });
});

describe('Gilded Rose - Sulfuras', () => {
  it('ne change jamais de sellIn ni de quality', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 80)]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].sellIn).toBe(10);
    expect(gildedRose.items[0].quality).toBe(80);
  });

  it('reste à 80 de qualité même "périmé" (sellIn négatif)', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', -1, 80)]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].sellIn).toBe(-1);
    expect(gildedRose.items[0].quality).toBe(80);
  });
});

describe('Gilded Rose - Backstage passes', () => {
  it('gagne 1 de qualité si sellIn > 10', () => {
    const pass = new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20);
    const gildedRose = new GildedRose([pass]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(21);
  });

  it('augmente la qualité de 2 si sellIn <= 10', () => {
    const pass = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20);
    const gildedRose = new GildedRose([pass]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(22);
  });

  it('augmente la qualité de 3 si sellIn <= 5', () => {
    const pass = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20);
    const gildedRose = new GildedRose([pass]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(23);
  });

  it('tombe à 0 après le concert', () => {
    const pass = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20);
    const gildedRose = new GildedRose([pass]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(0);
  });

  it('ne dépasse jamais 50 même en cumulant les bonus', () => {
    const pass = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49);
    const gildedRose = new GildedRose([pass]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(50);
  });
});

describe('Gilded Rose - Conjured', () => {
  it('dégrade la qualité 2 fois plus vite pour tout article contenant "Conjured"', () => {
    const conjured = new Item('Conjured Mana Cake', 3, 6);
    const gildedRose = new GildedRose([conjured]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(4);
  });

  it('fonctionne aussi pour un autre nom contenant "Conjured"', () => {
    const conjured = new Item('Conjured Sword', 3, 10);
    const gildedRose = new GildedRose([conjured]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(8);
  });
});