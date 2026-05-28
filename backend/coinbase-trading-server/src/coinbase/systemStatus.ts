let systemChannels: any[] = [];

/**
 * STORE CHANNELS
 */
export const updateSystemStatus = (
  message: any
) => {

  systemChannels =
    message.channels || [];
};

/**
 * GET CHANNELS
 */
export const getSystemStatus =
  () => {

    return systemChannels;
  };