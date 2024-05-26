import React, { useEffect, useState } from 'react';
import { getImageUrl } from '../../util/firebaseClient';

interface CardProps {
  card: {
    id: string;
    imgUrl?: string; // Add imgUrl property
    // Add any other properties you expect in the card object
  };
  onClick?: (id: string) => void; // Add onClick prop
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (card.imgUrl) {
        const url = await getImageUrl(card.imgUrl);
        setImageUrl(url);
      }
    };
    fetchImageUrl();
  }, [card.imgUrl]);

  const handleClick = () => {
    if (onClick) {
      onClick(card.id);
    }
  };

  return (
    <div style={styles.card} onClick={handleClick}>
      {imageUrl ? (
        <img src={imageUrl} alt={`Card ${card.id}`} style={styles.image} />
      ) : (
        <p>{card.id}</p>
      )}
    </div>
  );
};

const styles = {
  card: {
    width: '100px',
    height: '150px',
    backgroundColor: 'green',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    margin: '5px',
    cursor: 'pointer' // Add cursor style to indicate clickable
  } as React.CSSProperties,
  image: {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    objectFit: 'cover' // Ensure the image fits within the card boundaries
  } as React.CSSProperties,
};

export default Card;
