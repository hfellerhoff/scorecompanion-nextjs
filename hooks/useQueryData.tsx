import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

const useQueryData = <T,>(res: Response | undefined) => {
  const [data, setData] = useState<T>();
  const toast = useToast();

  useEffect(() => {
    const updateData = async () => {
      const json = await res.json().catch((err) =>
        toast({
          title: 'Oops! An error occurred.',
          description:
            'This is an error on our end (AKA poor error handling) due to a lack of hackathon time. Sorry!',
          status: 'error',
          duration: 7000,
          isClosable: true,
        })
      );

      setData(json);
    };

    if (res && !res.bodyUsed) updateData();
  }, [res]);

  return data;
};

export default useQueryData;
