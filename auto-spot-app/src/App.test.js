import { fireEvent, render, screen } from '@testing-library/react';
import Home from './pages/Home'
import PlaylistCreate from './pages/MusicSearch'

test('check to see for Heading in Home page', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Welcome/i);
  expect(linkElement).toBeInTheDocument();
});


test('Renders Search button on secondary page /Search', () => {
  render(<PlaylistCreate/>);
  const buttonElement = screen.getByText(/Search For Artist/i);
  expect(buttonElement).toBeInTheDocument();
});


test('Renders Create Playlist button on secondary page /Search', () => {
  render(<PlaylistCreate/>);
  const buttonElement = screen.getByText(/Create a New Playlist/i);
  expect(buttonElement).toBeInTheDocument();
});

