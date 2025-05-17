"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  setText: Dispatch<SetStateAction<string>>
}

const QrScanner = ({setText}:Props) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",                // elementId do container
      { fps: 10, qrbox: 250 },    // config: frames por segundo e tamanho do box
      false                       // verbose: logs no console (false = silencioso)
    );

    scanner.render(
      (decodedText) => {
        setText(decodedText);
        // ➡️ Aqui você pode tratar o texto (ex: redirect, fetch, etc)
      },
      (error) => {
        console.warn("Erro (ignorar se for 'no QR code found'):", error);
      }
    );

    // Cleanup quando sair do componente
    return () => {
      scanner.clear().catch((error) => {
        console.error("Erro ao limpar scanner:", error);
      });
    };
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Ler QR Code</h1>
      <div id="qr-reader" className="w-full" />
    </div>
  );
};

export default QrScanner;
