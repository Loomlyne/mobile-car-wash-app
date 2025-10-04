import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function DocumentIconFilled({ size = 20, color = '#FFFFFF' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M13.3333 1.66666H6.66667C4.825 1.66666 3.33333 3.15833 3.33333 5V15C3.33333 16.8417 4.825 18.3333 6.66667 18.3333H13.3333C15.175 18.3333 16.6667 16.8417 16.6667 15V5C16.6667 3.15833 15.175 1.66666 13.3333 1.66666ZM6.66667 7.91666H9.16667C9.625 7.91666 10 8.29166 10 8.75C10 9.20833 9.625 9.58333 9.16667 9.58333H6.66667C6.20833 9.58333 5.83333 9.20833 5.83333 8.75C5.83333 8.29166 6.20833 7.91666 6.66667 7.91666ZM13.3333 13.75H6.66667C6.20833 13.75 5.83333 13.375 5.83333 12.9167C5.83333 12.4583 6.20833 12.0833 6.66667 12.0833H13.3333C13.7917 12.0833 14.1667 12.4583 14.1667 12.9167C14.1667 13.375 13.7917 13.75 13.3333 13.75Z"
        fill={color}
      />
    </Svg>
  );
}

export function DocumentIconOutline({ size = 20, color = '#8D8E90' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M13.3333 1.66666H6.66667C4.825 1.66666 3.33333 3.15833 3.33333 5V15C3.33333 16.8417 4.825 18.3333 6.66667 18.3333H13.3333C15.175 18.3333 16.6667 16.8417 16.6667 15V5C16.6667 3.15833 15.175 1.66666 13.3333 1.66666Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M6.66667 8.75H9.16667M6.66667 12.9167H13.3333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
