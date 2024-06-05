import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Fence from '../../components/personal/Fence';
import Land from '../../components/personal/Land';
import Empty from '../../components/personal/Empty';

export default function PersonalBoard2({ pid }) {
  // Initialize fencePosition state with 39 elements, all set to true
  const [fencePosition, setFencePosition] = useState(Array(39).fill(true)); // Adjust the length if needed

  // Function to check if an index is within the bounds of the fencePosition array
  const isFenceActive = (index) => {
    return fencePosition && fencePosition.length > index ? fencePosition[index] : false;
  };

  return (
    <Box
      height={400}
      width={700}
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      gap={1}
      p={2}
      sx={{ border: '2px solid grey', m: 0}}
    >
      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(1)}
        pid={pid}
      />
      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(1)}
        pid={pid}
      />
      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(1)}
        pid={pid}
      />
      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(2)}
        pid={pid}
      />
      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(3)}
        pid={pid}
      />
      <Empty/>

      <Fence
        ratio="basis-1/31"
        isVertical={true}
        isActive={isFenceActive(4)}
        pid={pid}
      />
      <Land pid={pid} />
      {/* 1 */}
      <Fence
        ratio="basis-1/31"
        isVertical={true}
        isActive={isFenceActive(5)}
        pid={pid}
      />
      <Land pid={pid} />
      {/* 2 */}
      <Fence
        ratio="basis-1/31"
        isVertical={true}
        isActive={isFenceActive(6)}
        pid={pid}
      />
      <Land pid={pid} />
      {/* 3 */}
      <Fence
        ratio="basis-1/31"
        isVertical={true}
        isActive={isFenceActive(7)}
        pid={pid}
      />
      <Land pid={pid} />
      {/* 4 */}
      <Fence
        ratio="basis-1/31"
        isVertical={true}
        isActive={isFenceActive(5)}
        pid={pid}
      />
      <Land pid={pid} />
      {/* 5 */}
      <Fence
        ratio="basis-1/31"
        isVertical={true}
        isActive={isFenceActive(5)}
        pid={pid}
      />
      <Empty/>

      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(8)}
        pid={pid}
      />

      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(1)}
        pid={pid}
      />
      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(1)}
        pid={pid}
      />
      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(1)}
        pid={pid}
      />
      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(2)}
        pid={pid}
      />
      <Empty/>

      <Empty/>
      <Fence
        ratio="basis-1/31"
        isVertical={true}
        isActive={isFenceActive(4)}
        pid={pid}
      />
      <Land pid={pid} />
      {/* 1 */}
      <Fence
        ratio="basis-1/31"
        isVertical={true}
        isActive={isFenceActive(5)}
        pid={pid}
      />
      <Land pid={pid} />
      {/* 2 */}
      <Fence
        ratio="basis-1/31"
        isVertical={true}
        isActive={isFenceActive(6)}
        pid={pid}
      />
      <Land pid={pid} />
      {/* 3 */}
      <Fence
        ratio="basis-1/31"
        isVertical={true}
        isActive={isFenceActive(7)}
        pid={pid}
      />
      <Land pid={pid} />
      {/* 4 */}
      <Fence
        ratio="basis-1/31"
        isVertical={true}
        isActive={isFenceActive(5)}
        pid={pid}
      />
      <Land pid={pid} />
      {/* 5 */}
      <Fence
        ratio="basis-1/31"
        isVertical={true}
        isActive={isFenceActive(5)}
        pid={pid}
      />
      <Empty/>
      
      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(8)}
        pid={pid}
      />
      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(36)}
        pid={pid}
      />
      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(37)}
        pid={pid}
      />
      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(38)}
        pid={pid}
      />
      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(38)}
        pid={pid}
      /> 
      <Empty/>

      <Empty/>
      <Fence
        ratio="basis-1/31"
        isVertical={true}
        isActive={isFenceActive(4)}
        pid={pid}
      />
      <Land pid={pid} />
      {/* 1 */}
      <Fence
        ratio="basis-1/31"
        isVertical={true}
        isActive={isFenceActive(5)}
        pid={pid}
      />
      <Land pid={pid} />
      {/* 2 */}
      <Fence
        ratio="basis-1/31"
        isVertical={true}
        isActive={isFenceActive(6)}
        pid={pid}
      />
      <Land pid={pid} />
      {/* 3 */}
      <Fence
        ratio="basis-1/31"
        isVertical={true}
        isActive={isFenceActive(7)}
        pid={pid}
      />
      <Land pid={pid} />
      {/* 4 */}
      <Fence
        ratio="basis-1/31"
        isVertical={true}
        isActive={isFenceActive(5)}
        pid={pid}
      />
      <Land pid={pid} />
      {/* 5 */}
      <Fence
        ratio="basis-1/31"
        isVertical={true}
        isActive={isFenceActive(5)}
        pid={pid}
      />
      <Empty/>

      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(8)}
        pid={pid}
      />
      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(36)}
        pid={pid}
      />
      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(37)}
        pid={pid}
      />
      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(38)}
        pid={pid}
      />
      <Empty/>
      <Fence
        ratio="basis-9/31"
        isVertical={false}
        isActive={isFenceActive(38)}
        pid={pid}
      /> 
      <Empty/>
    </Box>
  );
}
