import { useState } from 'react';
import { BenefitsSection } from './components/BenefitsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { LegalNoticeSection } from './components/LegalNoticeSection';
import { PlatformsSection } from './components/PlatformsSection';

export default function App() {
  const [url, setUrl] = useState('');
  const [analyzerStatus, setAnalyzerStatus] = useState('idle');
  const [analyzerResult, setAnalyzerResult] = useState(null);
  const [analyzerError, setAnalyzerError] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('Mejor disponible');
  const [downloadStatus, setDownloadStatus] = useState('idle');
  const [downloadMessage, setDownloadMessage] = useState('');

  async function handleDownload() {
    if (!url.trim() || !selectedQuality) {
      setAnalyzerStatus('error');
      setAnalyzerError('Pega un enlace publico valido antes de descargar.');
      return;
    }

    setAnalyzerStatus('loading');
    setAnalyzerError('');
    setDownloadStatus('loading');
    setDownloadMessage('');

    try {
      const analyzeResponse = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const analyzeData = await analyzeResponse.json();

      if (!analyzeResponse.ok) {
        throw new Error(analyzeData.error || 'No se pudo validar el enlace.');
      }

      setAnalyzerResult(analyzeData);
      setAnalyzerStatus('success');

      const response = await fetch('/api/download-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, quality: selectedQuality }),
      });

      const contentType = response.headers.get('content-type') || '';

      if (!response.ok) {
        const data = contentType.includes('application/json') ? await response.json() : null;
        throw new Error(data?.error || 'No se pudo descargar el archivo.');
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get('content-disposition') || '';
      const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/i);
      const fileName = fileNameMatch?.[1] || 'video-descargado';
      const objectUrl = window.URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = objectUrl;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      window.URL.revokeObjectURL(objectUrl);

      setDownloadStatus('success');
      setDownloadMessage(`Archivo listo: ${fileName}`);
    } catch (error) {
      setAnalyzerStatus('error');
      setAnalyzerError(error.message);
      setDownloadStatus('error');
      setDownloadMessage(error.message);
    }
  }

  return (
    <div className="min-h-screen text-ink">
      <Header />
      <main>
        <HeroSection
          url={url}
          onUrlChange={setUrl}
          onAnalyze={handleDownload}
          analyzerStatus={analyzerStatus}
          analyzerResult={analyzerResult}
          analyzerError={analyzerError}
          selectedQuality={selectedQuality}
          onSelectQuality={setSelectedQuality}
          downloadStatus={downloadStatus}
          downloadMessage={downloadMessage}
        />
        <PlatformsSection />
        <HowItWorksSection />
        <BenefitsSection />
        <LegalNoticeSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
