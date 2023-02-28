import React from "react";
import { useQRCode } from "next-qrcode";

function QRTest() {
  const { Canvas } = useQRCode();

  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <Canvas
        text={"google.com"}
        options={{
          level: "M",
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        }}
      />
    </div>
  );
}
export default QRTest;
