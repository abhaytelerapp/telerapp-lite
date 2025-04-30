import React from 'react';
import SnackbarItem from './SnackbarItem';

import './Snackbar.css';
import { useSnackbar } from '../contextProviders';

const SnackbarContainer = () => {
  const { snackbarItems, hide } = useSnackbar();

  const renderItem = item => (
    <SnackbarItem
      key={item.itemId}
      options={item}
      onClose={hide}
    />
  );

  const renderItems = () => {
    const items = {
      topLeft: [],
      topCenter: [],
      topRight: [],
      bottomLeft: [],
      bottomCenter: [],
      bottomRight: [],
    };

    // snackbarItems.forEach(item => items[item.position].push(item));
    // snackbarItems.forEach(item => console.log(item, 'item'));
    return (
      snackbarItems && (
        <div>
          {Object.keys(items).map(pos => {
            if (!items[pos].length) {
              return null;
            }

            return (
              <div
                key={pos}
                className={`fixed z-50 box-border h-auto p-6 sb-${pos}`}
              >
                {items[pos].map((item, index) => (
                  <div key={item.id + index}>{renderItem(item)}</div>
                ))}
              </div>
            );
          })}
        </div>
      )
    );
  };

  return <>{renderItems()}</>;
};

export default SnackbarContainer;
