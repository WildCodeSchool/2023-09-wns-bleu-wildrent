import React from 'react';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="font-bold mb-4">Titre Principal (H1)</h1>
      <h2 className="font-semibold mb-3">Sous-titre (H2)</h2>
      <h3 className="font-medium mb-2">Titre Section (H3)</h3>
      <h4 className="font-normal mb-1">Titre Sous-section (H4)</h4>
      <p className="font-light">Paragraphe de texte</p>

      {/* Bouton avec hover */}
      <button className="btn mt-6 hover:bg-red-700 transition-colors">Bouton avec Hover</button>
    </main>
  );
}
