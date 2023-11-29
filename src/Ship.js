(function exportShip() {
  class Ship {
    constructor(itinerary) {
      this.itinerary = itinerary;
      this.currentPort = itinerary.ports[0];
      this.previousPort = null;
      this.currentPort.addShip(this);
    }

    setSail() {
      const ports = this.itinerary.ports;
      const currentPortIndex = ports.indexOf(this.currentPort);

      this.currentPort.removeShip(this);

      if (currentPortIndex === ports.length - 1) {
        throw new Error("End of itinerary reached");
      }
      this.previousPort = this.currentPort;
      this.currentPort = null;
    }

    dock() {
      const ports = this.itinerary.ports;
      const previousPotIndex = ports.indexOf(this.previousPort);

      this.currentPort = ports[previousPotIndex + 1];
      this.currentPort.addShip(this);
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Ship;
  } else {
    window.Ship = Ship;
  }
})();
