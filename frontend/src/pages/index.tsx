import React from 'react';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="font-bold mb-4">Titre Principal (H1)</h1>
        <h2 className="font-semibold mb-3">Sous-titre (H2)</h2>
        <h3 className="font-medium mb-2">Titre Section (H3)</h3>
        <h4 className="font-normal mb-1">Titre Sous-section (H4)</h4>
        <p className="font-light">Paragraph de texte</p>

        <button className="btn">Bouton</button>
      </main>
    </Layout>
  );
}
