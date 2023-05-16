export function getLastChildAsWcLib(outputData: any): any {
  if (!outputData.data) {
    return outputData;
  }

  outputData = getLastChildAsWcLib(outputData.data);
  return outputData;
}
