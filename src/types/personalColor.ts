// 퍼스널컬러 타입 정의

export type PersonalColorType =
  | 'spring_warm_light'
  | 'spring_warm_true'
  | 'spring_warm_bright'
  | 'summer_cool_mute'
  | 'summer_cool_light'
  | 'summer_cool_true'
  | 'autumn_warm_deep'
  | 'autumn_warm_mute'
  | 'autumn_warm_true'
  | 'winter_cool_deep'
  | 'winter_cool_bright'
  | 'winter_cool_true';

export type Tone = 'warm' | 'cool';
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
export type DetailType = 'light' | 'true' | 'bright' | 'mute' | 'deep';

export interface PersonalColorInfo {
  type: PersonalColorType;
  tone: Tone;
  season: Season;
  detailType: DetailType;
  displayName: string;
}

export const PERSONAL_COLOR_MAP: Record<PersonalColorType, PersonalColorInfo> = {
  spring_warm_light: {
    type: 'spring_warm_light',
    tone: 'warm',
    season: 'spring',
    detailType: 'light',
    displayName: '봄웜라이트',
  },
  spring_warm_true: {
    type: 'spring_warm_true',
    tone: 'warm',
    season: 'spring',
    detailType: 'true',
    displayName: '봄웜트루',
  },
  spring_warm_bright: {
    type: 'spring_warm_bright',
    tone: 'warm',
    season: 'spring',
    detailType: 'bright',
    displayName: '봄웜브라이트',
  },
  summer_cool_mute: {
    type: 'summer_cool_mute',
    tone: 'cool',
    season: 'summer',
    detailType: 'mute',
    displayName: '여름쿨뮤트',
  },
  summer_cool_light: {
    type: 'summer_cool_light',
    tone: 'cool',
    season: 'summer',
    detailType: 'light',
    displayName: '여름쿨라이트',
  },
  summer_cool_true: {
    type: 'summer_cool_true',
    tone: 'cool',
    season: 'summer',
    detailType: 'true',
    displayName: '여름쿨트루',
  },
  autumn_warm_deep: {
    type: 'autumn_warm_deep',
    tone: 'warm',
    season: 'autumn',
    detailType: 'deep',
    displayName: '가을웜딥',
  },
  autumn_warm_mute: {
    type: 'autumn_warm_mute',
    tone: 'warm',
    season: 'autumn',
    detailType: 'mute',
    displayName: '가을웜뮤트',
  },
  autumn_warm_true: {
    type: 'autumn_warm_true',
    tone: 'warm',
    season: 'autumn',
    detailType: 'true',
    displayName: '가을웜트루',
  },
  winter_cool_deep: {
    type: 'winter_cool_deep',
    tone: 'cool',
    season: 'winter',
    detailType: 'deep',
    displayName: '겨울쿨딥',
  },
  winter_cool_bright: {
    type: 'winter_cool_bright',
    tone: 'cool',
    season: 'winter',
    detailType: 'bright',
    displayName: '겨울쿨브라이트',
  },
  winter_cool_true: {
    type: 'winter_cool_true',
    tone: 'cool',
    season: 'winter',
    detailType: 'true',
    displayName: '겨울쿨트루',
  },
};

// 선택 단계 타입
export type SelectionStep = 1 | 2 | 3;
export type SelectionRound = 1 | 2 | 3;

export interface ColorChip {
  id: string;
  colorCode: string;
  tone?: Tone;
  season?: Season;
  detailType?: DetailType;
}

export interface SelectionResult {
  step1: {
    round1?: Tone;
    round2?: Tone;
    round3?: Tone;
    finalTone?: Tone;
  };
  step2: {
    round1?: Season;
    round2?: Season;
    round3?: Season;
    finalSeason?: Season;
  };
  step3: {
    selectedType?: PersonalColorType;
  };
}

