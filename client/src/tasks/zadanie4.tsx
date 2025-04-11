import React, { useState } from 'react'
import './zadanie4.css'

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className='card'>
      <h3>{title}</h3>
      <p>{description}</p>
      <img src={imageUrl} alt={title} />
    </div>
  );
};

const CardList: React.FC = () => {
  return (
    <div className='card-list'>
      <Card title="Card 1" description="Description 1" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOSIZ6hZseAPKb42yOVWSqt00bWSi8yusbMQ&s" />
      <Card title="Card 2" description="Description 2" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOSIZ6hZseAPKb42yOVWSqt00bWSi8yusbMQ&s" />
      <Card title="Card 3" description="Description 3" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOSIZ6hZseAPKb42yOVWSqt00bWSi8yusbMQ&s" />
    </div>
  );
};

export default CardList;