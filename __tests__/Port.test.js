const Port = require("../src/Port");

describe("Port", () => {
  describe("ports and ships", () => {
    let port;
    let ship;
    let titanic;
    let queenMary;

    beforeEach(() => {
      port = new Port("name");
      ship = jest.fn();
      titanic = jest.fn();
      queenMary = jest.fn();
    });

    it("can be instantiated", () => {
      expect(port).toBeInstanceOf(Object);
    });

    it("port has a name", () => {
      expect(port.name).toBe("name");
    });

    it("can add a ship", () => {
      port.addShip(titanic);

      expect(port.ships).toContain(titanic);
    });

    it("can remove a ship", () => {
      port.addShip(titanic);
      port.addShip(queenMary);
      port.removeShip(queenMary);

      expect(port.ships).toEqual([titanic]);
    });
  });
});
