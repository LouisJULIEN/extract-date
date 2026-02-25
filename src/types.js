// @flow

export type DateMatchType = {|
  +date: string,
|};

export type DirectionType = 'DM' | 'DMY' | 'DYM' | 'MD' | 'YDM' | 'YMD' | 'MDY';

export type UserConfigurationType = {|
  +translateAccentless?: boolean,
  +direction?: DirectionType,
  +locale?: string,
  +maximumAge?: number,
  +minimumAge?: number,
  +timezone?: string,
|};

export type ConfigurationType = {|
  +translateAccentless?: boolean,
  +direction?: DirectionType,
  +locale?: string,
  +maximumAge: number,
  +minimumAge: number,
  +timezone?: string,
|};
