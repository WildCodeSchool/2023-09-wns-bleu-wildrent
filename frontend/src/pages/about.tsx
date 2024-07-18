import Layout from '@/components/Layout';
import React from 'react';

const teamMembers = [
  {
    name: 'Yohan',
    role: 'Développeur Full Stack',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    description:
      "Yohan a apporté une expertise technique précieuse, travaillant sur les fonctionnalités complexes du backend tout en contribuant à la création d'interfaces utilisateur intuitives et réactives.",
  },
  {
    name: 'Marion',
    role: 'Développeuse Full Stack',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    description:
      "Marion a orchestré l'ensemble du projet avec brio, tout en participant activement au développement frontend et backend. Son leadership et son sens du détail ont été essentiels à la réussite de notre projet.",
  },
  {
    name: 'Aymeric',
    role: 'Développeur Full Stack',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    description:
      'Aymeric a joué un rôle clé dans le développement, en intégrant des solutions backend robustes et en créant des interfaces utilisateur efficaces et réactives.',
  },
  {
    name: 'Brian',
    role: 'Développeur Full Stack',
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
    description:
      'Brian a travaillé à la fois sur le backend et le frontend, en optimisant les performances et la sécurité, tout en assurant une expérience utilisateur optimale grâce à des interfaces bien conçues.',
  },
];

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-4">À propos de nous</h1>
        <p className="text-center text-gray-700 mb-8">
          Nous sommes une équipe de quatre passionnés par la technologie et le design, dédiés à
          créer des solutions innovantes et intuitives. Ensemble, nous avons travaillé sur ce projet
          pour offrir la meilleure expérience possible.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <p className="text-gray-700 flex-grow">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default About;
