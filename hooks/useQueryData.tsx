import React, { useEffect, useState } from 'react';

const useQueryData = <T,>(res: Response | undefined) => {
  const [data, setData] = useState<T>();

  useEffect(() => {
    const updateData = async () => {
      const json = await res.json();
      console.log(json);

      setData(json);
    };

    if (res && !res.bodyUsed) updateData();
  }, [res]);

  return data;
};

export default useQueryData;
