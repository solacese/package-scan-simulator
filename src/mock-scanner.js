/**
 * mock-scanner.js
 * @author Andrew Roberts
 */

import produce from "immer";
import faker from "faker";

const rootTopic = "package.delivery/scanned";

export function createMockScannerService(publish, intervalMs) {
  let intervalId;

  function start() {
    intervalId = setInterval(() => {
      let lat = faker.address.latitude();
      let lng = faker.address.longitude();
      publish(createTopic({ lat, lng }), createPayload({ lat, lng }), { qos: 1 });
    }, intervalMs);
  }

  function stop() {
    clearInterval(intervalId);
  }

  return produce({}, (draft) => {
    draft.start = start;
    draft.stop = stop;
  });
}

function createTopic({ lat, lng }) {
  return `${rootTopic}/${lat}/${lng}`;
}

function createPayload({ lat, lng }) {
  return {
    Waybill_Num: faker.finance.account(),
    ScanTime: `${new Date().toLocaleTimeString()}`,
    LocationName: faker.address.streetAddress(),
    Location_Lat: lat,
    Location_Long: lng,
  };
}
