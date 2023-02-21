export async function estimateAndCall(params: {
  func: any;
  methodName: string;
  maxGas: number;
  skipGasEstimate?: boolean;
  account: string;
  paperTrading?: boolean;
}) {
  const { func, methodName, maxGas, skipGasEstimate = false, account, paperTrading= false } = params;
  let estimateSuccess = false;
  if (!skipGasEstimate) {
    try {
      const estimate = await func.estimateGas({ from: account, gas: maxGas });
      if (estimate && estimate < maxGas) {
        console.log(`${methodName} estimate gas success`, estimate);
        estimateSuccess = true;
      }
    } catch (e) {
      console.error(`${methodName} estimate gas err`, e);
    }
  } else {
    estimateSuccess = true;
  }

  if (estimateSuccess && !paperTrading) {
    const callingRes = await func.send({ from: account});
    if (callingRes && callingRes.events) {
      delete callingRes.events;
      delete callingRes.logsBloom;
    }
    console.log(`${methodName} calling res`, callingRes);
    return callingRes;
  }

  if (paperTrading) {
    return estimateSuccess;
  }
}