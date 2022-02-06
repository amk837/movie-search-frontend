/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PersonCard from '../components/PersonCard';

const person = {
  name: 'Tom Holland',
  character: 'Peter Parker',
  href: '/actor/id/Tom%20Hollan',
  img: 'https://www.image.com/tomholland.jpg',
};

describe('PersonCard', () => {
  it('should render a person card', () => {
    render((
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={(
              <PersonCard
                name={person.name}
                character={person.character}
                href={person.href}
                img={person.img}
              />
            )}
          />
        </Routes>
      </BrowserRouter>
    ));

    const personCard = screen.getByRole('link');

    expect(personCard.href).toBe(`http://localhost${person.href}`);
    expect(personCard.children[0].src).toBe(person.img);
    expect(personCard.children[1].textContent).toBe(person.name);
    expect(personCard.children[2].textContent).toBe(`as ${person.character}`);
  });

  it('should render a dummy person card', () => {
    render((
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PersonCard />} />
        </Routes>
      </BrowserRouter>
    ));

    const personCard = screen.getByRole('link');

    expect(personCard.href).toBe('http://localhost/');
    expect(personCard.children[0].src).toBe('http://localhost/');
    expect(personCard.children[1].textContent).toBe('');
    // if character is not provided its not rendered
    expect(personCard.children.length).toBe(2);
  });
});
