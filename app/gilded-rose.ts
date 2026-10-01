export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  gainQuality(gainedQuality: number = 1) {
    if (this.quality + gainedQuality > 50) {
      this.quality = 50;
    } else {
      this.quality = this.quality + gainedQuality;
    }
  }

  loseQuality(lostQuality: number = 1) {
    if (this.quality - lostQuality < 0) {
      this.quality = 0;
    } else {
      this.quality = this.quality - lostQuality;
    }
  }

  updateNormalItem(): void {
    this.sellIn -= 1;
    this.loseQuality();

    if (this.sellIn < 0) {
      this.loseQuality();
    }
  }

  updateAgedBrie(): void {
    this.gainQuality();
    this.sellIn -= 1;

    if (this.sellIn < 0) {
      this.gainQuality();
    }
  }

  updateBackstagePass(): void {
    this.gainQuality();

    if (this.sellIn < 11) {
      this.gainQuality();
    }

    if (this.sellIn < 6) {
      this.gainQuality();
    }

    this.sellIn -= 1;

    if (this.sellIn < 0) {
      this.quality = 0;
    }
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case 'Aged Brie':
          item.updateAgedBrie();
          break;
        case 'Sulfuras, Hand of Ragnaros':
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          item.updateBackstagePass();
          break;
        default:
          item.updateNormalItem();
          break;
      }
    }

    return this.items;
  }
}