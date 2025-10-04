import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function ProfileIconFilled({ size = 20, color = '#FFFFFF' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 10C12.3012 10 14.1667 8.13452 14.1667 5.83333C14.1667 3.53215 12.3012 1.66666 10 1.66666C7.69881 1.66666 5.83333 3.53215 5.83333 5.83333C5.83333 8.13452 7.69881 10 10 10ZM10 11.6667C6.77917 11.6667 2.5 13.2833 2.5 16.5V17.5C2.5 17.9583 2.875 18.3333 3.33333 18.3333H16.6667C17.125 18.3333 17.5 17.9583 17.5 17.5V16.5C17.5 13.2833 13.2208 11.6667 10 11.6667Z"
        fill={color}
      />
    </Svg>
  );
}

export function ProfileIconOutline({ size = 20, color = '#8D8E90' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 10C12.3012 10 14.1667 8.13452 14.1667 5.83333C14.1667 3.53215 12.3012 1.66666 10 1.66666C7.69881 1.66666 5.83333 3.53215 5.83333 5.83333C5.83333 8.13452 7.69881 10 10 10Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M17.1583 18.3333C17.1583 15.1083 13.95 12.5 10 12.5C6.05 12.5 2.84167 15.1083 2.84167 18.3333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
