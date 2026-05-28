import {
  updateSystemStatus,
  getSystemStatus,
} from "./systemStatus";

describe(
  "System Status",
  () => {

    test(
      "should store channels",
      () => {

        updateSystemStatus({
          channels: [
            {
              name:
                "ticker",
            },
          ],
        });

        const channels =
          getSystemStatus();

        expect(
          channels.length
        ).toBe(1);
      }
    );
  }
);