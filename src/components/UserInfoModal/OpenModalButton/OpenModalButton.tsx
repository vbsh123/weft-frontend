import React from 'react';

interface Props {
  onClick: () => void;
}

const OpenModalButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
        Open Modal
    </button>
  );
};

export default OpenModalButton;