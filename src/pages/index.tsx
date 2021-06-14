import { Button, Box } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }) => {
      const response = await api.get(`/api/images`, {
        params: {
          after: pageParam,
        },
      });

      return response.data;
    },
    {
      getNextPageParam: lastPage => {
        if (!lastPage?.after) return null;

        return lastPage.after;
      },
    }
  );

  const formattedData = useMemo(() => {
    return data?.pages.map(page => page.data).flat(Infinity);
  }, [data]);

  if (isLoading) {
    <Loading />;
  }

  if (isError) {
    <Error />;
  }

  useEffect(() => {
    async function teste(): Promise<void> {
      const response = await fetch('D:/twitch/BreakLong.png');

      console.log(response);
    }

    teste();
  }, []);

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
