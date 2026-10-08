import { WatchedList } from "./watched-list.js";

export class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b;
  }
}

describe("WatchedList", () => {
  it("shoould be able to create a watched list with initial items", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    expect(list.currentItems).toEqual([1, 2, 3]);
  });

  it("shoould be able to add items to the watched list", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.add(4);

    expect(list.currentItems).toHaveLength(4);
    expect(list.getNewItems()).toEqual([4]);
  });

  it("shoould be able to remove items from the watched list", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.remove(2);

    expect(list.currentItems).toHaveLength(2);
    expect(list.getRemovedItems()).toEqual([2]);
  });

  it("shoould be able to add items to the watched list even if they were previously removed", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.remove(2);
    list.add(2);

    expect(list.currentItems).toHaveLength(3);
    expect(list.getRemovedItems()).toEqual([]);
  });

  it("shoould be able to remove an item from the watched list even if it has been added before", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.add(4);
    list.remove(4);

    expect(list.currentItems).toHaveLength(3);
    expect(list.getRemovedItems()).toEqual([]);
  });

  it("shoould be able to update watched list items", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.update([1, 3, 5]);

    expect(list.getRemovedItems()).toEqual([2]);
    expect(list.getNewItems()).toEqual([5]);
  });
});
