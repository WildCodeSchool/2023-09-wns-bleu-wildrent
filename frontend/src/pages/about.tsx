import Layout from '@/components/Layout';
import React from 'react';

const teamMembers = [
  {
    name: 'Yohan',
    role: 'Full Stack Developer',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    description:
      'Yohan brought invaluable technical expertise, working on complex backend functionalities while contributing to the creation of intuitive and responsive user interfaces.',
  },
  {
    name: 'Marion',
    role: 'Full Stack Developer',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    description:
      'Marion orchestrated the entire project with brilliance, actively participating in both frontend and backend development. Her leadership and attention to detail were essential to the success of our project.',
  },
  {
    name: 'Aymeric',
    role: 'Full Stack Developer',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    description:
      'Aymeric played a key role in development, integrating robust backend solutions and creating efficient and responsive user interfaces.',
  },
  {
    name: 'Brian',
    role: 'Full Stack Developer',
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
    description:
      'Brian worked on both the backend and frontend, optimizing performance and security while ensuring an optimal user experience through well-designed interfaces.',
  },
  {
    name: 'Lucas',
    role: 'Full Stack Developer',
    image: 'https://randomuser.me/api/portraits/men/47.jpg',
    description:
      'Lucas also contributed to frontend and backend development, bringing his expertise to enhance functionalities and user experience.',
  },
];

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center my-6 text-secondary">About Us</h1>
        <p className="m-4 text-justify">
          We are a team of four technology and design enthusiasts dedicated to creating innovative
          and intuitive solutions. Together, we have worked on this project to provide the best
          possible experience.
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
