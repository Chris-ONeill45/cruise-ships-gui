const Ship = require("../src/Ship");

describe("Ship", () => {
  describe("with ports and an itinerary", () => {
    let ship;
    let dover;
    let calais;
    let itinerary;

    beforeEach(() => {
      dover = {
        addShip: jest.fn(),
        removeShip: jest.fn(),
        name: "Dover",
        ships: [],
      };

      calais = {
        addShip: jest.fn(),
        removeShip: jest.fn(),
        name: "Calais",
        ships: [],
      };

      itinerary = {
        ports: [dover, calais],
      };

      ship = new Ship(itinerary);
    });

    it("can be instantiated", () => {
      expect(ship).toBeInstanceOf(Object);
    });

    it("gets added to port on instantiation", () => {
      expect(dover.addShip).toHaveBeenCalledWith(ship);
    });

    it("has a previous port set to null on instantiation", () => {
      expect(ship.previousPort).toBeNull();
    });

    it("has a starting port", () => {
      expect(ship.currentPort).toBe(dover);
    });

    it("can set sail", () => {
      const previousPort = ship.currentPort;
      ship.setSail();

      expect(ship.currentPort).toBeFalsy();
      expect(dover.removeShip).toHaveBeenCalledWith(ship);
      expect(ship.previousPort).toBe(previousPort);
    });

    it("can dock at a different port", () => {
      ship.setSail();
      ship.dock();

      expect(ship.currentPort).toBe(calais);
      expect(calais.addShip).toHaveBeenCalledWith(ship);
    });

    it("can't sail further than its itinerary", () => {
      ship.setSail();
      ship.dock();

      expect(() => ship.setSail()).toThrowError("End of itinerary reached");
    });
  });
});
