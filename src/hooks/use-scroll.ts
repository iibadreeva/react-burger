import { useEffect } from 'react';

import { TabType } from '../services/types/types';

export const useScroll = (
  refs: any,
  containerRef: any,
  activeTab: (s: string) => void,
  tabs: TabType[]
) => {
  useEffect(() => {
    const scrollHandler = () => {
      if (!containerRef.current) {
        return;
      }
      const scrollTop = containerRef.current.getBoundingClientRect().top;

      const topArray = [];
      for (let { type } of tabs) {
        if (!refs.current?.[type]?.current) {
          return;
        }

        const top = Math.abs(
          refs?.current?.[type]?.current?.getBoundingClientRect().top - scrollTop
        );

        topArray.push(top);

        const min = Math.min(...topArray);

        if (min === top) {
          activeTab(type);
        }
      }
    };

    const container = containerRef.current;
    container.addEventListener('scroll', scrollHandler);
    return () => {
      container.removeEventListener('scroll', scrollHandler, true);
    };
  }, [refs, containerRef, activeTab, tabs]);
};
