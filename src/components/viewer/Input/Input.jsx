import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';
import classnames from 'classnames';

const baseInputClasses =
  'shadow transition duration-300 appearance-none border dark:border-primary-main border-secondary-dark focus:border-inputfield-focus focus:outline-none disabled:border-inputfield-disabled rounded w-full py-2 px-3 text-sm text-white text-black dark:placeholder-inputfield-dark placeholder-inputfield-light leading-tight';

const baseInputClasses1 =
  'shadow transition duration-300 appearance-none border dark:border-primary-main border-secondary-dark focus:border-inputfield-focus focus:outline-none disabled:border-inputfield-disabled rounded w-full py-2 pl-7 text-sm  text-white text-black dark:placeholder-inputfield-dark placeholder-inputfield-light leading-tight';

const transparentClasses = {
  true: 'bg-transparent',
  false: 'dark:bg-secondary-dark bg-primary-light',
};

const smallInputClasses = {
  true: 'input-small',
  false: '',
};

const Input = ({
  id,
  label,
  containerClassName = '',
  labelClassName = '',
  className = '',
  transparent = false,
  smallInput = false,
  type,
  value,
  onChange,
  onFocus,
  autoFocus,
  onKeyPress,
  onKeyDown,
  readOnly,
  disabled,
  labelChildren,
  placeholder,
  ...otherProps
}) => {
  return (
    <div className={classnames('flex flex-1 flex-col', containerClassName)}>
      {/* <Label
        className={labelClassName}
        text={label}
      ></Label> */}
      <input
        data-cy={`input-${id}`}
        className={classnames(
          label && 'mt-2',
          className,
          // baseInputClasses,
          id === 'general' ? baseInputClasses1 : baseInputClasses,
          transparentClasses[transparent],
          smallInputClasses[smallInput],
          { 'cursor-not-allowed': disabled }
        )}
        disabled={disabled}
        readOnly={readOnly}
        autoFocus={autoFocus}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        {...otherProps}
        placeholder={placeholder ? placeholder : label}
      />
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  containerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  className: PropTypes.string,
  transparent: PropTypes.bool,
  smallInput: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  autoFocus: PropTypes.bool,
  readOnly: PropTypes.bool,
  onKeyPress: PropTypes.func,
  onKeyDown: PropTypes.func,
  disabled: PropTypes.bool,
  labelChildren: PropTypes.node,
};

export default Input;
