import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedImage, setSelectedImage] = useState('');

  const handleViewImage = (url: string): void => {
    setSelectedImage(url);
    onOpen();
  };

  return (
    <>
      <SimpleGrid gap={10} gridTemplateColumns="3">
        {!!cards &&
          cards.map(card => {
            console.log(card);
            return (
              <Card key={card.id} data={card} viewImage={handleViewImage} />
            );
          })}
      </SimpleGrid>

      <ModalViewImage
        isOpen={isOpen}
        onClose={onClose}
        imgUrl={selectedImage}
      />
    </>
  );
}
