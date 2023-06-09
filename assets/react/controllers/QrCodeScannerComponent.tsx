import React, { useState, useEffect, useRef } from "react";
import Quagga from "@ericblade/quagga2";
import { QuaggaJSResultObject } from "@ericblade/quagga2";

export default function () {
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [results, setResults] = useState([]);

  const handleBtnClick = () => setIsScannerActive(!isScannerActive);

  return (
    <div>
      <p>scanner</p>

      <button onClick={handleBtnClick} className="btn-primary btn">
        {isScannerActive ? "Activer" : "Désactiver"} la caméra
      </button>
    </div>
  );
}

type ScannerProps = {
  isActive: boolean;
  onDetected: () => void;
};

const Scanner: React.FC<ScannerProps> = ({ isActive, onDetected }) => {
  const scannerRef = useRef<HTMLDivElement>(null);

  const handleProcessed = (result: QuaggaJSResultObject) => {
    const drawingCtx = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;
    drawingCtx.font = "24px Arial";
    drawingCtx.fillStyle = "green";
    result.boxes
      .filter((box) => box !== result.box)
      .forEach((box) => {
        Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
          color: "purple",
          lineWidth: 2,
        });
      });
  };

  useEffect(() => {
    if (!scannerRef.current) {
      throw new Error("");
    }

    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef.current,
        },
      },
      (err) => {
        Quagga.onProcessed(handleProcessed);
      }
    );
  });
  return <div ref={scannerRef}></div>;
};

const Results = () => <div></div>;
