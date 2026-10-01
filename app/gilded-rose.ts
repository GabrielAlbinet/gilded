export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  gainQuality(item: Item, amount: number = 1): void {
    if (item.quality + amount > 50) {
      item.quality = 50;
    } else {
      item.quality = item.quality + amount;
    }
  }

  loseQuality(item: Item, amount: number = 1): void {
    if (item.quality - amount < 0) {
      item.quality = 0;
    } else {
      item.quality = item.quality - amount;
    }
  }

  updateNormalItem(item: Item): void {
    item.sellIn -= 1;
    this.loseQuality(item);

    if (item.sellIn < 0) {
      this.loseQuality(item);
    }
  }

  updateAgedBrie(item: Item): void {
    this.gainQuality(item);
    item.sellIn -= 1;

    if (item.sellIn < 0) {
      this.gainQuality(item);
    }
  }

  updateBackstagePass(item: Item): void {
    this.gainQuality(item);

    if (item.sellIn < 11) {
      this.gainQuality(item);
    }

    if (item.sellIn < 6) {
      this.gainQuality(item);
    }

    item.sellIn -= 1;

    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  updateConjuredItem(item: Item): void {
    item.sellIn -= 1;
    this.loseQuality(item, 2);

    if (item.sellIn < 0) {
      this.loseQuality(item, 2);
    }
  }

  updateQuality() {
  for (const item of this.items) {
    if (item.name.includes('Conjured')) {
      this.updateConjuredItem(item);
      continue;
    }

    switch (item.name) {
      case 'Aged Brie':
        this.updateAgedBrie(item);
        break;
      case 'Sulfuras, Hand of Ragnaros':
        break;
      case 'Backstage passes to a TAFKAL80ETC concert':
        this.updateBackstagePass(item);
        break;
      default:
        this.updateNormalItem(item);
        break;
    }
  }

  return this.items;
}
}