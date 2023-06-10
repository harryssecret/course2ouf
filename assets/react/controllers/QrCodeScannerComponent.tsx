import React, {useCallback, useEffect, useRef, useState} from "react";
import Quagga, {QuaggaJSResultObject} from "@ericblade/quagga2";

export default function () {
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleBtnClick = () => setIsScannerActive(!isScannerActive);

  const handleOnDetected = (result: string) => {setResults([...results, result])}

  return (
    <div>
      <h1>Scanner</h1>

      <section>
        <h2>Actions</h2>
        <div>
          <button onClick={handleBtnClick} className="btn-primary btn">
            {isScannerActive ? "Désactiver" : "Activer"} la caméra
          </button>
        </div>
      </section>

      {
        isScannerActive && <Scanner isActive={isScannerActive} onDetected={handleOnDetected} constraints={defaultConstraints}/>
      }

      <h1>Résultats</h1>
      <Results results={results}/>
    </div>
  );
}

const defaultConstraints = {
  width: 640,
  height: 480,
};

type ScannerProps = {
  isActive: boolean;
  onDetected: (result: string) => void;
  constraints: {
    width: number;
    height: number;
  }
};

const Scanner: React.FC<ScannerProps> = ({ isActive, onDetected, constraints = defaultConstraints }) => {
  const scannerRef = useRef<HTMLDivElement>(null);

  const getMedian = (arr: any[]) => {
    console.log(arr)
    arr.sort((a, b) => a - b);
    const half = Math.floor(arr.length / 2);
    if (arr.length % 2 === 1) {
      return arr[half];
    }
    return (arr[half - 1] + arr[half]) / 2;
  }

  const  getMedianOfCodeErrors = (decodedCodes: any[]) =>  {
    console.log(decodedCodes)
    const errors = decodedCodes.filter(x => x.error !== undefined).map(x => x.error);
    return getMedian(errors);
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
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
              color: "purple",
              lineWidth: 2,
            });
          });
      }
      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: 'blue', lineWidth: 2 });
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

  return <div className={"relative"} ref={scannerRef}>
    <canvas className={"absolute top-0 border-2 border-green-400 drawingBuffer"} width={constraints.width} height={constraints.height}  />
  </div>;
};

const Results = ({results}: {results: string[]}) => <ul className={"menu bg-base-200 w-56 rounded-box"}>
  {results.map((result, i) => {
    return (
      <li key={i}>{result}</li>
    )
  })}
</ul>;
