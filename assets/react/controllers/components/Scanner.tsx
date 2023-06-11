import React, {useCallback, useEffect, useRef} from "react";
import Quagga, {QuaggaJSResultObject, QuaggaJSResultObject_CodeResult} from "@ericblade/quagga2";

const defaultConstraints = {
  width: 640,
  height: 480,
};

type ScannerProps = {
  isActive: boolean;
  onDetected: (result: string) => void;
  constraints?: {
    width: number;
    height: number;
  }
};

export const Scanner: React.FC<ScannerProps> = ({isActive, onDetected, constraints = defaultConstraints}) => {
  const scannerRef = useRef<HTMLDivElement>(null);

  const getMedian = (arr: number[]) => {
    arr.sort((a, b) => a - b);
    const half = Math.floor(arr.length / 2);
    if (arr.length % 2 === 1) {
      return arr[half];
    }
    return (arr[half - 1] + arr[half]) / 2;
  }

  const getMedianOfCodeErrors = (decodedCodes: QuaggaJSResultObject_CodeResult["decodedCodes"]) => {
    const codes = decodedCodes.filter(x => typeof x.error === 'number')
    const errorsMargin = codes.map(x => x.error as number)
    return getMedian(errorsMargin);
  }

  const checkErrors = useCallback((result: QuaggaJSResultObject) => {
      const err = getMedianOfCodeErrors(result.codeResult.decodedCodes)
      console.log(err)

      if (err < 0.25 && result.codeResult.code) {
        onDetected(result.codeResult.code)
      }
    }, [onDetected]
  )

  const handleProcessed = (result?: QuaggaJSResultObject) => {
    const drawingCtx = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;
    drawingCtx.font = "12px Arial";
    drawingCtx.fillStyle = "green";
    if (result) {
      console.info("[quagga] processed : ", result)
      if (result.boxes) {
        result.boxes
          .filter((box) => box !== result.box)
          .forEach((box) => {
            Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {
              color: "purple",
              lineWidth: 2,
            });
          });
      }
      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: 'blue', lineWidth: 2});
      }
      if (result.codeResult && result.codeResult.code) {
        drawingCtx.font = "24px Arial";
        drawingCtx.fillText(result.codeResult.code, 10, 20);
      }
    }
  };

  useEffect(() => {
    if (!scannerRef.current) {
      throw new Error("Error trying to access scanner ref.");
    }

    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            ...constraints
          }
        },
        locate: true,
        locator: {
          patchSize: 'medium',
          halfSample: true
        },
        decoder: {
          readers: ["code_128_reader"]
        },
        numOfWorkers: navigator.hardwareConcurrency || 0
      },
      (err) => {
        Quagga.onProcessed(handleProcessed)

        if (err) {
          throw new Error(`Error starting QuaggaJS : ${err}`)
        }

        Quagga.start()
      }
    );
    Quagga.onDetected(checkErrors)
    return () => {
      Quagga.offDetected(checkErrors)
      Quagga.offProcessed(handleProcessed)
      Quagga.stop();
    }
  }, [scannerRef, checkErrors, constraints]);

  return <div className={"relative w-[640px] h-[480px]"} ref={scannerRef}>
    <canvas className={"absolute top-0 border-2 border-green-400 drawingBuffer w-[640px] h-[480px]"} width={constraints.width}
            height={constraints.height}/>
  </div>;
};
