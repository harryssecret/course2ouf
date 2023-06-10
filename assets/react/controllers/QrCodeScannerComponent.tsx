import React, {useState, useEffect, useRef, useLayoutEffect} from "react";
import Quagga from "@ericblade/quagga2";
import { QuaggaJSResultObject } from "@ericblade/quagga2";

export default function () {
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [results, setResults] = useState<QuaggaJSResultObject[]>([]);

  const handleBtnClick = () => setIsScannerActive(!isScannerActive);

  const handleOnDetected = (result: QuaggaJSResultObject) => {setResults([...results, result])}

  return (
    <div>
      <p>scanner</p>

      <button onClick={handleBtnClick} className="btn-primary btn">
        {isScannerActive ? "Désactiver" : "Activer"} la caméra
      </button>
      {
        isScannerActive && <Scanner isActive={isScannerActive} onDetected={handleOnDetected}/>
      }


      <h1>Résultats</h1>
      <Results results={results}/>
    </div>
  );
}

type ScannerProps = {
  isActive: boolean;
  onDetected: (result: QuaggaJSResultObject) => void;
};

const Scanner: React.FC<ScannerProps> = ({ isActive, onDetected }) => {
  const scannerRef = useRef<HTMLDivElement>(null);

  const handleProcessed = (result?: QuaggaJSResultObject) => {
    const drawingCtx = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;
    drawingCtx.font = "24px Arial";
    drawingCtx.fillStyle = "green";
    if (result) {
      console.info("[q] quagga processed : ", result)
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
        // const validated = barcodeValidator(result.codeResult.code);
        // const validated = validateBarcode(result.codeResult.code);
        // Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: validated ? 'green' : 'red', lineWidth: 3 });
        drawingCtx.font = "24px Arial";
        // drawingCtx.fillStyle = validated ? 'green' : 'red';
        // drawingCtx.fillText(`${result.codeResult.code} valid: ${validated}`, 10, 50);
        drawingCtx.fillText(result.codeResult.code, 10, 20);
        // if (validated) {
        //     onDetected(result);
        // }
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
        },
        decoder: {
          readers: ["code_128_reader"]
        }
      },
      (err) => {
        Quagga.onProcessed(handleProcessed);

        if (err) {
          throw new Error(`Error starting QuaggaJS : ${err}`)
        }
        Quagga.start()


      }
    );
  });
  return <div className={"relative"} ref={scannerRef}>
    <canvas className={"absolute top-0 border-2 border-green-400 w-[640px] h-[480px] drawingBuffer"} />
  </div>;
};

const Results = ({results}: {results: QuaggaJSResultObject[]}) => <ul className={"menu bg-base-200 w-56 rounded-box"}>
  {results.map(result => {
    return (
      <li>{result.codeResult.code}</li>
    )
  })}
</ul>;
