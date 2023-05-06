import { useEffect } from 'react';

interface refProps {
  current: HTMLDivElement | null;
}

const useOutsideClick = (ref: refProps, callback: () => void) => {
  const handleClick = (e: Event) => {
    if (ref && ref.current && !ref.current.contains(e.target as HTMLDivElement)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClick;
