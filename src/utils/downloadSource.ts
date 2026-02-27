
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const downloadSourceCode = async (setLoading: (loading: boolean) => void) => {
  setLoading(true);
  try {
    const zip = new JSZip();
    
    // Create folder structure
    const src = zip.folder("src");
    const publicFolder = zip.folder("public");
    const components = src?.folder("components");
    const appComponents = components?.folder("app");

    // Add root files
    zip.file("package.json", JSON.stringify({
      name: "apex-builder-export",
      version: "1.0.0",
      scripts: {
        "dev": "vite",
        "build": "tsc && vite build",
        "preview": "vite preview"
      },
      dependencies: {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "framer-motion": "^10.16.4",
        "lucide-react": "^0.292.0",
        "tailwindcss": "^3.3.5",
        "jszip": "^3.10.1",
        "file-saver": "^2.0.5"
      }
    }, null, 2));

    zip.file("index.html", `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Apex Builder Export</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`);

    zip.file("vite.config.ts", `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})`);

    zip.file("README.md", `# Apex Builder Export
    
This is a starter template generated from Apex Builder.
To get started:

1. \`npm install\`
2. \`npm run dev\`
`);

    // Add source files
    src?.file("main.tsx", `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`);

    src?.file("index.css", `@tailwind base;
@tailwind components;
@tailwind utilities;`);

    src?.file("App.tsx", `// This would contain the full App code
import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to Apex Builder Export</h1>
    </div>
  );
}
`);

    // Generate the zip file
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "apex-builder-source.zip");
  } catch (error) {
    console.error("Failed to zip files", error);
    alert("حدث خطأ أثناء تحضير الملفات.");
  } finally {
    setLoading(false);
  }
};
