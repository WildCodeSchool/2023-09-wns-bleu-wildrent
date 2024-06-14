import React from 'react';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

export interface ButtonType {
  text: string;
  testId?: string;
  svg?: string;
  alt?: string;
  onClick?: any; //onclick type ?
  disabled?: boolean;
  style?: string;
}

function Button(props: ButtonType) {
  return (
    <button
      data-test-id={props.testId}
      className={twMerge(
        `px-6 py-2 rounded ${props?.style} ${
          props.disabled && 'cursor-not-allowed bg-light hover:bg-light'
        }`,
      )}
      onClick={!props.disabled ? props.onClick : () => {}}
      disabled={props.disabled}
    >
      {props.svg ? (
        <div className="flex items-center">
          <div className="mr-2">
            <Image
              priority
              src={props.svg}
              alt={props.alt ? props.alt : ''}
              width={24}
              height={24}
            />
          </div>
          <div>{props.text}</div>
        </div>
      ) : (
        <div>{props.text}</div>
      )}
    </button>
  );
}

export default Button;
