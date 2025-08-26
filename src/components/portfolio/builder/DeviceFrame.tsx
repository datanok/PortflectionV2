import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

interface DeviceFrameProps {
  deviceSize: "mobile" | "tablet" | "desktop";
  children: React.ReactNode;
}

const sizeMap = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
};

export default function DeviceFrame({ deviceSize, children }: DeviceFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const rootRef = useRef<ReturnType<typeof createRoot> | null>(null);
  const [iframeReady, setIframeReady] = useState(false);

  // Initialize iframe and set up React mounting
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const setupIframe = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;

      // Write HTML structure
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              html, body { 
                margin: 0; 
                padding: 0; 
                box-sizing: border-box; 
                font-family: inherit;
                width: 100%;
                height: 100%;
              }
              *, *::before, *::after {
                box-sizing: border-box;
              }
            </style>
          </head>
          <body>
            <div id="react-root" style="width: 100%; height: 100%;"></div>
          </body>
        </html>
      `);
      doc.close();

      // Clone styles from parent document
      document.head.querySelectorAll("style").forEach((style) => {
        const clonedStyle = style.cloneNode(true);
        doc.head.appendChild(clonedStyle);
      });

      document.head.querySelectorAll('link[rel="stylesheet"], link[as="style"]').forEach((link) => {
        const clonedLink = link.cloneNode(true);
        doc.head.appendChild(clonedLink);
      });

      // Set up React root
      const mountNode = doc.getElementById("react-root");
      if (mountNode) {
        rootRef.current = createRoot(mountNode);
        setIframeReady(true);
      }
    };

    // Use a small delay to ensure iframe is ready
    const timer = setTimeout(() => {
      setupIframe();
    }, 0);

    return () => {
      clearTimeout(timer);
      if (rootRef.current) {
        rootRef.current.unmount();
        rootRef.current = null;
      }
      setIframeReady(false);
    };
  }, []);

  // Render children when iframe is ready
  useEffect(() => {
    if (iframeReady && rootRef.current) {
      rootRef.current.render(<>{children}</>);
    }
  }, [children, iframeReady]);

  const { width, height } = sizeMap[deviceSize];

  return (
    <iframe
      ref={iframeRef}
      style={{
        width,
        height,
        border: "1px solid #ccc",
        backgroundColor: "#fff",
      }}
      title={`${deviceSize} preview`}
    />
  );
}